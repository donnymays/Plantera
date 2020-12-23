import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigator from './navigation/AppNavigator';
import ReduxThunk from 'redux-thunk';
import plantsReducer from './store/reducers/plants';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Deprecation', 'Your project']);

const rootReducer = combineReducers({
  plants: plantsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// store.subscribe(() =>
//   console.log(store.getState())
// );

const fetchFonts = () => {
  return Font.loadAsync({
    'sacramento': require('./assets/fonts/Sacramento.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSansCondensed-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSansCondensed.ttf'),
    'open-sans-italic': require('./assets/fonts/OpenSansCondensed-Italic.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading 
    startAsync={fetchFonts}
    onFinish={() => setFontLoaded(true)}
    onError={console.warn}
    />
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

