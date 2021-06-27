/** 
 * import reducers, create store, export provider component
 */

import React from 'react';
import { Provider, createStore } from 'react-redux';

import { reducer } from './reducers';

const store = createStore(reducer);

export default function StoreProvider(props) {
  return <Provider store={store} {...props} />;
}