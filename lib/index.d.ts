import React, { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';
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
export default function BottomSheet({ children, isModalOpen, setIsModalOpen, modalHeight, sheetStyles, backdropStyles, backdropOpacity, closeThreshold, closeOnBackdropPress, showHandle, handleComponent, animationDuration, onOpen, onClose, }: BottomSheetProps): React.JSX.Element;
//# sourceMappingURL=index.d.ts.map