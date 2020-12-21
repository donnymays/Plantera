import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors'

const EditPlantScreen = () => {
  return (
    <ScrollView>
      <View>
        {/* <Text style={styles.label}>This is where you can add a new plant!</Text>
        <TextInput 
          style={styles.textInput} 
          onChangeText={plantNameChangeHandler}
          value={plantNameValue}
        />
        <Text style={styles.label}>This is where you can choose your plant type</Text>
          <TextInput 
          style={styles.textInput} 
          onChangeText={plantTypeChangeHandler}
          value={plantTypeValue}
        />
        <Text style={styles.label}>This is where you can enter your plant image plachodler</Text>
          <TextInput 
          style={styles.textInput} 
          onChangeText={plantImageChangeHandler}
          value={plantImageValue}
        />
        <Text style={styles.label}>When did you bring home your plant?</Text>
        <DateTimePicker
          display={'spinner'}
          onChange={onDateReceivedChangeHandler}
          value={dateReceivedValue}
        />
        <Text style={styles.label}>When did you last water your plant?</Text>
        <DateTimePicker
          display={'spinner'}
          onChange={onWaterDateChangeHandler}
          value={waterDateValue}
        />
        <Text style={styles.label}>Would you like to add any note to your plant?</Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={plantNotesChangeHandler}
          value={plantNotesValue}

        />
        <Button 
          onPress={savePlantHandler}
          title='Save Plant' 
        /> */}
      </View>
    </ScrollView>
  );
};

EditPlantScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('plantId')
      ? 'Edit Plant'
      : 'Add Plant',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};


export default EditPlantScreen

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: Colors.green,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 10
  }
});
