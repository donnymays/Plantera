import React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button, KeyboardAvoidingView } from 'react-native'
import Input from '../components/Input';
import Colors from '../constants/Colors';


const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={50}
    style={styles.screen}
  >
    {/* <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}> */}
      {/* <Card style={styles.authContainer}> */}
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
          onInputChange={() => {}}
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
          onInputChange={() => {}}
          initialValue=""
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" color={Colors.gold} onPress={() => {}} />
          <Button
            title="Sign Up"
            color={Colors.red}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
       
      {/* </Card>
    </LinearGradient> */}
  </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.green
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
    backgroundColor: Colors.whitish,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
