// import React, { forwardRef, useImperativeHandle, useRef, useCallback, useEffect } from 'react';
// import { Dimensions, View, ScrollViewProps } from 'react-native';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { scheduleOnRN } from 'react-native-worklets';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import { SPRING_CONFIG } from '@/src/constants/WalkPlannerConstants';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const NATIVE_STYLES = {
//   sheet: {
//     height: SCREEN_HEIGHT,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,
//     elevation: 24,
//   },
// };

// export interface BottomSheetRef {
//   snapToIndex: (index: number) => void;
//   getCurrentIndex: () => number;
// }

// interface BottomSheetProps {
//   snapFractions?: [number, number, number];
//   initialIndex?: number;
//   onIndexChange?: (index: number) => void;
//   children: React.ReactNode;
//   topInset?: number;
// }

// export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(({ snapFractions = [0.10, 0.42, 0.92], initialIndex = 1, onIndexChange, children},ref) => {
//     //constants and functions
//     const snapHeights = snapFractions.map((f) => f * SCREEN_HEIGHT);
//     const getTranslateY = (snapIndex: number) => SCREEN_HEIGHT - snapHeights[snapIndex];
//     const translateY = useSharedValue(getTranslateY(initialIndex));
//     const currentIndex = useRef(initialIndex);
//     const scrollOffset = useSharedValue(0);
//     const startY = useSharedValue(0);

//     const setIndex = (idx: number) => {
//       currentIndex.current = idx;
//       onIndexChange?.(idx);
//     };

//     const snapTo = useCallback(
//       (index: number, notify = true) => {
//         'worklet';
//         const clampedIdx = Math.max(0, Math.min(2, index));
//         translateY.value = withSpring(getTranslateY(clampedIdx), SPRING_CONFIG);
//         if (notify) {
//           scheduleOnRN(setIndex, clampedIdx);
//         }
//       },
//       [snapFractions]
//     );

//     useImperativeHandle(ref, () => ({
//       snapToIndex: (index: number) => {
//         snapTo(index);
//       },
//       getCurrentIndex: () => currentIndex.current,
//     }));

//     useEffect(() => {
//       translateY.value = getTranslateY(initialIndex);
//     }, []);

//     const findSnapIndex = (ty: number, velocityY: number): number => {
//       'worklet';
//       const VELOCITY_BIAS = velocityY * 0.12;
//       const biasedTY = ty + VELOCITY_BIAS;
//       const snapTYs = snapFractions.map((f) => SCREEN_HEIGHT - f * SCREEN_HEIGHT);
//       let closestIdx = 0;
//       let closestDist = Math.abs(biasedTY - snapTYs[0]);
//       for (let i = 1; i < snapTYs.length; i++) {
//         const dist = Math.abs(biasedTY - snapTYs[i]);
//         if (dist < closestDist) {
//           closestDist = dist;
//           closestIdx = i;
//         }
//       }
//       return closestIdx;
//     };

//     const pan = Gesture.Pan()
//       .onBegin(() => {
//         startY.value = translateY.value;
//       })
//       .onChange((e) => {
//         if (scrollOffset.value > 2 && e.changeY < 0) return;

//         const next = translateY.value + e.changeY;
//         const minTY = SCREEN_HEIGHT - snapHeights[2];
//         const maxTY = SCREEN_HEIGHT - snapHeights[0];
//         if (next < minTY) {
//           const overscroll = minTY - next;
//           translateY.value = minTY - overscroll * 0.2;
//         } else if (next > maxTY) {
//           const overscroll = next - maxTY;
//           translateY.value = maxTY + overscroll * 0.2;
//         } else {
//           translateY.value = next;
//         }
//       })
//       .onFinalize((e) => {
//         const snapIdx = findSnapIndex(translateY.value, e.velocityY);
//         snapTo(snapIdx);
//       })
//       .activeOffsetY([-4, 4])
//       .failOffsetX([-15, 15]);

//     const animatedStyle = useAnimatedStyle(() => ({
//       transform: [{ translateY: translateY.value }],
//     }));
//     //view component
//     return (
//       <Animated.View 
//         className="absolute left-0 right-0 z-[100] bg-white rounded-t-[12px]" 
//         style={[NATIVE_STYLES.sheet, animatedStyle]}
//       >
//         <GestureDetector gesture={pan}>
//           <View className="items-center px-[60px] pt-2 pb-[6px]">
//             <View className="w-9 h-[5px] bg-[#D1D1D6] rounded-full" />
//           </View>
//         </GestureDetector>

//         <View className="flex-1 overflow-hidden">
//           {children}
//         </View>
//       </Animated.View>
//     );
//   }
// );

// export const SheetFlatList = Animated.FlatList;