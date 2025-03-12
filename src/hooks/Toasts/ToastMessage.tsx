import { ToastContentProps } from 'react-toastify';

type ToastMessageProps = Partial<ToastContentProps> & {
  message: string;
};

function ToastMessage({ message }: ToastMessageProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default ToastMessage;
