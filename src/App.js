import React from 'react';
import { Provider } from 'react-redux';
import store from "./_store";

import App from './components/MapView';

const Keewee = () =>
  (<Provider store={store}>
    <App />
  </Provider>);

export default Keewee