## Modal Component Documentation

### Overview

The Modal component is a reusable modal dialog that can be used for displaying messages or other content. It can be customized with props to control its behavior, appearance, and content. The modal can also be closed by clicking the backdrop.

### Importing the Component

```tsx
import { Modal } from './Modal';
import { ModalType } from './constants';
```

### Props

Prop Name | Type | Default | Description
isOpen | boolean | false | Controls whether the modal is visible or not.
type | ModalType | ModalType.INFO | Specifies the type of the modal.
onClose |() => void | undefined |Callback function to close the modal.
title |string | undefined |The title of the modal. If not provided, defaults based on the type.
children |ReactNode | undefined | The content to be displayed inside the modal.
customStyles | React.CSSProperties| {} |Optional custom styles to override the modal's default styles.
backdropClick| boolean | true |Determines whether clicking the backdrop will close the modal.

### Usage Examples

Basic Usage

```tsx
<Modal isOpen={isModalOpen} onClose={handleClose}>
  <p>This is the modal content.</p>
</Modal>
```

Custom Title and Content

```tsx
<Modal
  isOpen={isModalOpen}
  type={ModalType.CONFIRMATION}
  title="Confirm Action"
  onClose={handleClose}
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

Modal with Custom Styles

```tsx
<Modal
  isOpen={isModalOpen}
  customStyles={{ backgroundColor: 'lightblue', padding: '20px' }}
  onClose={handleClose}
>
  <p>This modal has custom styles!</p>
</Modal>
```

Using Modal with ModalType Enum

```tsx
<Modal
  isOpen={isModalOpen}
  type={ModalType.ERROR}
  title="An Error Occurred"
  onClose={handleClose}
>
  <p>Something went wrong. Please try again later.</p>
</Modal>
```

Modal with Backdrop Click Disabled

```tsx
<Modal isOpen={isModalOpen} backdropClick={false} onClose={handleClose}>
  <p>Clicking the backdrop won't close this modal.</p>
</Modal>
```

### ModalType Enum

The ModalType enum defines different modal types that can be used to set the modal's appearance and behavior. It is passed as the type prop.

```tsx
export enum ModalType {
  CONFIRMATION = 'confirmation',
  INFO = 'info',
  ERROR = 'error',
}
```

### Notes

- The isOpen prop controls the visibility of the modal.
- The onClose callback is triggered when the modal is closed, either by clicking the close button or the backdrop (depending on the backdropClick prop).
- The title prop is optional, and if not provided, a default title based on type will be used.
- The customStyles prop allows you to apply custom styles to the modal, overriding default styles.

### Troubleshooting

- Modal not appearing? Ensure the isOpen prop is set to true and that the modal is properly rendered in the component tree.
- Backdrop not closing the modal? Check the backdropClick prop and set it to true if you want the backdrop to close the modal.
- Styles not applying? Verify that the customStyles prop is being passed correctly and that it contains valid CSS properties.

This documentation provides an overview of how to use the Modal component effectively. If you have any questions, feel free to reach out! 🚀
