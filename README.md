# React Native Bottom Sheet Modal

A smooth, gesture-enabled bottom sheet modal for React Native with TypeScript support.

![npm version](https://img.shields.io/npm/v/@opesco12/react-native-bottom-sheet)
![license](https://img.shields.io/npm/l/@opesco12/react-native-bottom-sheet)
![downloads](https://img.shields.io/npm/dm/@opesco12/react-native-bottom-sheet)

![Demo](https://raw.githubusercontent.com/Opesco12/react-native-bottom-sheet/refs/heads/main/assets/demo.gif)

## Installation

```bash
npm install react-native-bottom-sheet-modal
```

### Peer Dependencies

```bash
npm install react-native-reanimated react-native-gesture-handler
```

## Usage

```tsx
import BottomSheet from "react-native-bottom-sheet-modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomSheet
      isModalOpen={isOpen}
      setIsModalOpen={setIsOpen}
      modalHeight={400}
    >
      <Text>Your content here</Text>
    </BottomSheet>
  );
}
```

## Props

| Prop                 | Type     | Default  | Description                             |
| -------------------- | -------- | -------- | --------------------------------------- |
| isModalOpen          | boolean  | required | Controls visibility                     |
| setIsModalOpen       | function | required | Update visibility state                 |
| modalHeight          | number   | required | Sheet height in pixels                  |
| closeThreshold       | number   | 100      | Drag distance to close                  |
| backdropOpacity      | number   | 0.7      | Backdrop opacity (0-1)                  |
| closeOnBackdropPress | boolean  | true     | Close on backdrop tap                   |
| sheetStyles          | object   |          | Custom styles for the sheet             |
| backdropStyles       | object   |          | Custom styles for the backdrop          |
| showHandle           | boolean  | true     | Controls handle component               |
| handleComponent      | object   |          | Custom handle component                 |
| animationDuration    | number   | 300      | Controls animation timing               |
| onOpen               | function |          | Callback function when the sheet opens  |
| onClose              | function |          | Callback function when the sheet closes |

## License

MIT

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/opesco12/react-native-bottom-sheet?style=social)
![GitHub forks](https://img.shields.io/github/forks/opesco12/react-native-bottom-sheet?style=social)

---

Made with ❤️ by [Emmanuel](https://github.com/Opesco12)
