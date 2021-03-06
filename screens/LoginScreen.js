import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const LoginScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Plants');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  
  return (
  <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={50}
    style={styles.screen}
  >
    <View style={styles.formContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Plantera</Text>
      </View>
      
      <View style={styles.form}>
        <Input
          id="email"
          label="E-Mail"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorMessage="Please enter a valid email address."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <Input
          id="password"
          label="Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Please enter a valid password."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.green} />
          ) : (
            <Button
              title={isSignup ? 'Sign Up' : 'Login'}
              color='#4E6A5D'
              onPress={authHandler}
            />
          )}
      </View>
      <View style={styles.buttonContainer}></View>
        <Button
          title={`${isSignup ? 'Login' : 'Create Account'}`}
          color={Colors.gold}
          onPress={() => {
            setIsSignup(prevState => !prevState);
          }}
        />
      </View>
    </View>
  </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#4E6A5D'
  },
  titleContainer: {
    marginVertical: 15
  },
  title: {
    fontFamily: 'sacramento',
    fontSize: 72,
    color: Colors.taupe
  },
  form: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.green,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    
  },
  formContainer: {
    marginTop: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center',
  }
})
