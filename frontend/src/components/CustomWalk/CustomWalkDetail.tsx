import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import SelectedWalkActionRow from '../SelectedWalk/SelectedWalkActionRow';

export default function CustomWalkDetail({ walk }: { walk: any }) {
  return (
    <BottomSheetScrollView
      contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.titleBlock}>
        <Text style={styles.walkName}>{walk.cuswalkname || 'Custom Walk'}</Text>
        <Text style={styles.walkMeta}>
          <Text style={styles.blueText}>{walk.distance} km</Text>
        </Text>
      </View>

      <SelectedWalkActionRow />
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  titleBlock: {
    marginBottom: 6,
  },
  walkName: {
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  walkMeta: {
    fontSize: 17,
    marginBottom: 22,
  },
  blueText: {
    color: '#2677e8',
  },
});
