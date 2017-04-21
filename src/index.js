import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";

import rootReducer from './reducers';
import rootSagas from './sagas';

import Application from './components/Application';
import './css/index.scss';


const sagaMiddleware = createSagaMiddleware();
const persistedState = localStorage.getItem('stateTree') ? JSON.parse(localStorage.getItem('stateTree')) : {}

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSagas);

store.subscribe(() => {
  localStorage.setItem('stateTree', JSON.stringify(store.getState()))
})

console.info('Initial state:\n', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
