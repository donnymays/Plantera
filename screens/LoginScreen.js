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
        <ScrollView>
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
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Switch to Sign Up"
              color={Colors.red}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
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
  }
})
