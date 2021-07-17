/** 
 * import reducers, create store, export provider component
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';

// enable Chrome extension Redux DevTools 
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// build store 
const store = createStore(reducers, devTools);

export default function StoreProvider(props) {
  return <Provider store={store} {...props} />;
}