import React from 'react';
import ReactDOM from 'react-dom';
import './src/index.css';
import App from './src/components/App/App';
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import {store} from "./src/services/store";

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
        </React.StrictMode>,

  document.getElementById('root')
);


