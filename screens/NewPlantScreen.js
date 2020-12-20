import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native'
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as plantsActions from '../store/actions/plants';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors';
import Plant from '../components/Plant';

const NewPlantScreen = () => {
  
  const [plantNameValue, setPlantNameValue] = useState('');
  const [plantTypeValue, setPlantTypeValue] = useState('');
  const [plantImageValue, setPlantImageValue] = useState('');
  const [plantNotesValue, setPlantNotesValue] = useState('');
  const [dateReceivedValue, setDateReceivedValue] = useState(new Date(1598051730000));
  const [waterDateValue, setWaterDateValue] = useState(new Date(1598051730000));

  const plantNameChangeHandler = (text) => {
    setPlantNameValue(text);
  };
  const plantTypeChangeHandler = (text) => {
    setPlantTypeValue(text);
  };
  const plantImageChangeHandler = (text) => {
    setPlantImageValue(text);
  };
  const plantNotesChangeHandler = (text) => {
    setPlantNotesValue(text);
  };
  const onDateReceivedChangeHandler = (selectedDate) => {
    const currentDate = selectedDate || dateReceivedValue;
    setDateReceivedValue(currentDate);
  };
  const onWaterDateChangeHandler = (selectedDate) => {
    const currentDate = selectedDate || waterDateValue;
    setWaterDateValue(currentDate);
  };

  const dispatch = useDispatch();

  
  const savePlantHandler = () => {
    const newPlant = { name: plantNameValue, type: plantTypeValue, imageUrl: plantImageValue, dateReceived: dateReceivedValue, waterDate: waterDateValue, notes: plantNotesValue } 
      // id, plantNameValue, plantTypeValue, plantImageValue, dateReceivedValue, waterDateValue, plantNotesValue
    dispatch(plantsActions.addPlant(newPlant))
    // console.log(newPlant);
  };

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>This is where you can add a new plant!</Text>
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
      />
    </ScrollView>
  )
}

NewPlantScreen.navigationOptions = navData => {
  return {  
    headerTitle: 'Add a Plant',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
}

export default NewPlantScreen

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
})
