import React, { useState, useMemo } from 'react';
import { FlatList, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface HorizontalCarouselProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  snapToInterval: number;
  rows?: number;
}

export function HorizontalCarousel<T>({
  data,
  renderItem,
  keyExtractor,
  snapToInterval,
  rows = 1,
}: HorizontalCarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const chunkedColumns = useMemo(() => {
    const chunks: T[][] = [];
    for (let i = 0; i < data.length; i += rows) {
      chunks.push(data.slice(i, i + rows));
    }
    return chunks;
  }, [data, rows]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(xOffset / snapToInterval);
    if (currentIndex !== activeIndex && currentIndex >= 0 && currentIndex < chunkedColumns.length) {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <View>
      <FlatList
        data={chunkedColumns}
        keyExtractor={(columnItems, columnIndex) => `col-${keyExtractor(columnItems[0], columnIndex)}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
        contentContainerClassName="px-4 pb-4"
        renderItem={({ item: columnItems, index: columnIndex }) => (
          <View className="flex-col gap-3">
            {columnItems.map((item, rowOffset) => {
              const trueIndex = columnIndex * rows + rowOffset;
              return (
                <View key={keyExtractor(item, trueIndex)}>
                  {renderItem({ item, index: trueIndex })}
                </View>
              );
            })}
          </View>
        )}
        snapToInterval={snapToInterval}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16} 
      />

      {/* Pagination Indicators */}
      <View className="flex-row justify-center items-center gap-1.5 mt-1">
        {chunkedColumns.map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-4 bg-gray-800 dark:bg-white' 
                : 'w-2 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </View>
    </View>
  );
}