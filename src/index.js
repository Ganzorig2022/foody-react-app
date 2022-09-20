import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { OrderProvider } from './provider/Order';
import { MenuProvider } from './provider/Menu';
import { CustomTheme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomTheme>
      <OrderProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </OrderProvider>
    </CustomTheme>
  </React.StrictMode>
);

reportWebVitals();
