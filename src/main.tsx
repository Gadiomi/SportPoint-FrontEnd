import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'modern-normalize';
import App from './components/App';
import { ManageThemeProvider } from '@/theme';
import './i18n/i18n';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GlobalStyle } from './baseStyles';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ManageThemeProvider>
        <GlobalStyle />
        <Provider store={store}>
          <App />
        </Provider>
      </ManageThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
