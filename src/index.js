import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './redux/createStore';

import 'rxjs';

const ProvidedApp = () => (
  <Provider store={ store }>
    <App />
  </Provider>
);


ReactDOM.render(<ProvidedApp />, document.getElementById('root'));
registerServiceWorker();
