import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const StyledToastContainer = styled(ToastContainer)(({ theme }) => ({
  '&& .Toastify__toast': {
    background: theme.color.background,
    color: theme.color.white,
  },
  '&& .Toastify__toast-icon svg': {
    fill: theme.color.white,
  },
  '&& .Toastify__close-button': {
    color: theme.color.white,
    opacity: 1,
  },
  '&& .Toastify__close-button:hover': {
    color: theme.color.secWhite,
  },
}));

export const ToastProvider = () => (
  <StyledToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);
