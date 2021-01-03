import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigator from './navigation/AppNavigator';
import ReduxThunk from 'redux-thunk';
import plantsReducer from './store/reducers/plants';
import authReducer from './store/reducers/auth';
import { LogBox } from 'react-native';

import * as firebase from 'firebase';


LogBox.ignoreLogs(['Deprecation', 'Your project', 'source']);

const rootReducer = combineReducers({
  plants: plantsReducer,
  auth: authReducer
});

const firebaseConfig = {
  apiKey: "AIzaSyDVN1U5_hpUM30N3nRWW6iCxIjODLfMO9I",
  authDomain: "plantera-46325.firebaseapp.com",
  databaseURL: "https://plantera-46325-default-rtdb.firebaseio.com",
  projectId: "plantera-46325",
  storageBucket: "plantera-46325.appspot.com",
  messagingSenderId: "1038440277606",
  appId: "1:1038440277606:web:c1193b7939bfee992aefa7"
}

firebase.initializeApp(firebaseConfig);

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

