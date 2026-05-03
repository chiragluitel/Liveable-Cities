import { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import { SelectedItem } from '@/src/types/TypesForWalkPlanner';
import { SPRING_CONFIG } from '@/src/constants/WalkPlannerConstants';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PEEK_HEIGHT = SCREEN_HEIGHT * 0.36;
const FULL_HEIGHT = SCREEN_HEIGHT * 0.92;
const HIDDEN_TY = SCREEN_HEIGHT;
const PEEK_TY = SCREEN_HEIGHT - PEEK_HEIGHT;
const FULL_TY = SCREEN_HEIGHT - FULL_HEIGHT;
const DISMISS_THRESHOLD = PEEK_TY + PEEK_HEIGHT * 0.45;

function findDetailSnap(ty: number, vy: number): 'peek' | 'full' | 'dismiss' {
  'worklet';
  const biased = ty + vy * 0.1;
  if (biased > DISMISS_THRESHOLD) return 'dismiss';
  return Math.abs(biased - FULL_TY) < Math.abs(biased - PEEK_TY) ? 'full' : 'peek';
}

export function usePlaceDetailSheetFns(onDismiss?: () => void) {
  const translateY = useSharedValue(HIDDEN_TY);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const jsDismiss = useCallback(() => {
    translateY.value = withSpring(HIDDEN_TY, SPRING_CONFIG);
    setTimeout(() => {
      setSelectedItem(null);
      setIsExpanded(false);
      setIsVisible(false);
      onDismiss?.();
    }, 320);
  }, [translateY, onDismiss]);

  const present = useCallback((item: SelectedItem) => {
    setSelectedItem(item);
    setIsExpanded(false);
    setIsVisible(true);
    translateY.value = withSpring(PEEK_TY, SPRING_CONFIG);
  }, [translateY]);

  const pan = Gesture.Pan()
    .onChange((e) => {
      const next = translateY.value + e.changeY;
      translateY.value = next < FULL_TY ? FULL_TY - (FULL_TY - next) * 0.15 : next;
    })
    .onFinalize((e) => {
      const snap = findDetailSnap(translateY.value, e.velocityY);
      if (snap === 'dismiss') {
        scheduleOnRN(jsDismiss);
      } else {
        const isFull = snap === 'full';
        translateY.value = withSpring(isFull ? FULL_TY : PEEK_TY, SPRING_CONFIG);
        scheduleOnRN(setIsExpanded, isFull);
      }
    })
    .activeOffsetY([-6, 6])
    .failOffsetX([-20, 20]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return { selectedItem, isExpanded, isVisible, animatedStyle, pan, present, jsDismiss };
}