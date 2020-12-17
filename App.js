import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import plantsReducer from './store/reducers/plants';

const rootReducer = combineReducers({
  plants: plantsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

