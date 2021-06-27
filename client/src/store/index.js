/** 
 * import reducers, create store, export provider component
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { reducer } from './reducers';

const store = createStore(reducer);

export default function StoreProvider(props) {
  return <Provider store={store} {...props} />;
}