import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

const NewPlantScreen = () => {
  const [dateReceived, setDateReceived] = useState(new Date(1598051730000));

  const onDateReceivedChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateReceived;
    setDateReceived(currentDate);
  }
  return (
    <View>
      <Text>This is where you can add a new plant!</Text>
      <TextInput />
      <Text>This is where you can choose your plant type</Text>
      
      <Text>When did you bring home your plant?</Text>
      <DateTimePicker
        value={dateReceived}
        display={'spinner'}
        onChange={onDateReceivedChange}
      />


      <Button title='Save Plant' />
    </View>
  )
}

export default NewPlantScreen

const styles = StyleSheet.create({})
