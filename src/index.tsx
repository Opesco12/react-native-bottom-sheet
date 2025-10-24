import React, { type ReactNode, useCallback } from 'react';
import { View, TouchableOpacity, type ViewStyle, StyleSheet } from 'react-native';
import Animated, {
  SlideInDown,
  SlideOutDown,
  FadeOut,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

export interface BottomSheetProps {
  /** The content to display inside the bottom sheet */
  children?: ReactNode;
  /** Controls the visibility of the modal */
  isModalOpen: boolean;
  /** Function to update the modal visibility state */
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** Height of the bottom sheet in pixels */
  modalHeight: number;
  /** Custom styles for the sheet container */
  sheetStyles?: ViewStyle;
  /** Custom styles for the backdrop */
  backdropStyles?: ViewStyle;
  /** Backdrop opacity (0-1), defaults to 0.7 */
  backdropOpacity?: number;
  /** Distance in pixels to trigger close on drag, defaults to 100 */
  closeThreshold?: number;
  /** Enable/disable close on backdrop press, defaults to true */
  closeOnBackdropPress?: boolean;
  /** Show/hide the drag handle, defaults to true */
  showHandle?: boolean;
  /** Custom handle component */
  handleComponent?: ReactNode;
  /** Animation duration for spring back, defaults to 300 */
  animationDuration?: number;
  /** Callback when modal opens */
  onOpen?: () => void;
  /** Callback when modal closes */
  onClose?: () => void;
}

export default function BottomSheet({
  children,
  isModalOpen,
  setIsModalOpen,
  modalHeight,
  sheetStyles,
  backdropStyles,
  backdropOpacity = 0.7,
  closeThreshold = 100,
  closeOnBackdropPress = true,
  showHandle = true,
  handleComponent,
  animationDuration = 300,
  onOpen,
  onClose,
}: BottomSheetProps) {
  const offset = useSharedValue(0);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    onClose?.();
    offset.value = 0;
  }, [setIsModalOpen, onClose, offset]);

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      // Only allow downward drag
      offset.value = Math.max(0, e.translationY);
    })
    .onFinalize(() => {
      if (offset.value > closeThreshold) {
        runOnJS(closeModal)();
      } else {
        offset.value = withTiming(0, { duration: animationDuration });
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdropPress) {
      closeModal();
    }
  }, [closeOnBackdropPress, closeModal]);

  // Call onOpen when modal becomes visible
  React.useEffect(() => {
    if (isModalOpen) {
      onOpen?.();
    }
  }, [isModalOpen, onOpen]);

  if (!isModalOpen) return null;

  return (
    <Animated.View
      style={[
        styles.backdrop,
        { backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` },
        backdropStyles,
      ]}
      entering={FadeIn}
      exiting={FadeOut}>
      <AnimatedPressable
        onPress={handleBackdropPress}
        activeOpacity={1}
        style={styles.backdropPress}
      />
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={[
          styles.sheet,
          { height: modalHeight },
          sheetStyles,
          animatedStyles,
        ]}>
        <GestureDetector gesture={panGesture}>
          <View style={styles.handleContainer}>
            {showHandle &&
              (handleComponent || <View style={styles.handle} />)}
          </View>
        </GestureDetector>
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backdropPress: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    height: 5,
    width: 80,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
    position: 'absolute',
    top: 5,
  },
});