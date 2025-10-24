"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BottomSheet;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const AnimatedPressable = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.TouchableOpacity);
function BottomSheet({ children, isModalOpen, setIsModalOpen, modalHeight, sheetStyles, backdropStyles, backdropOpacity = 0.7, closeThreshold = 100, closeOnBackdropPress = true, showHandle = true, handleComponent, animationDuration = 300, onOpen, onClose, }) {
    const offset = (0, react_native_reanimated_1.useSharedValue)(0);
    const closeModal = (0, react_1.useCallback)(() => {
        setIsModalOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
        offset.value = 0;
    }, [setIsModalOpen, onClose, offset]);
    const panGesture = react_native_gesture_handler_1.Gesture.Pan()
        .onChange((e) => {
        // Only allow downward drag
        offset.value = Math.max(0, e.translationY);
    })
        .onFinalize(() => {
        if (offset.value > closeThreshold) {
            (0, react_native_reanimated_1.runOnJS)(closeModal)();
        }
        else {
            offset.value = (0, react_native_reanimated_1.withTiming)(0, { duration: animationDuration });
        }
    });
    const animatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateY: offset.value }],
    }));
    const handleBackdropPress = (0, react_1.useCallback)(() => {
        if (closeOnBackdropPress) {
            closeModal();
        }
    }, [closeOnBackdropPress, closeModal]);
    // Call onOpen when modal becomes visible
    react_1.default.useEffect(() => {
        if (isModalOpen) {
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
    }, [isModalOpen, onOpen]);
    if (!isModalOpen)
        return null;
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [
            styles.backdrop,
            { backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` },
            backdropStyles,
        ], entering: react_native_reanimated_1.FadeIn, exiting: react_native_reanimated_1.FadeOut },
        react_1.default.createElement(AnimatedPressable, { onPress: handleBackdropPress, activeOpacity: 1, style: styles.backdropPress }),
        react_1.default.createElement(react_native_reanimated_1.default.View, { entering: react_native_reanimated_1.SlideInDown, exiting: react_native_reanimated_1.SlideOutDown, style: [
                styles.sheet,
                { height: modalHeight },
                sheetStyles,
                animatedStyles,
            ] },
            react_1.default.createElement(react_native_gesture_handler_1.GestureDetector, { gesture: panGesture },
                react_1.default.createElement(react_native_1.View, { style: styles.handleContainer }, showHandle &&
                    (handleComponent || react_1.default.createElement(react_native_1.View, { style: styles.handle })))),
            children)));
}
const styles = react_native_1.StyleSheet.create({
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
//# sourceMappingURL=index.js.map