import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors'


const EditPlantScreen = props => {
  const plantId = props.navigation.getParam('plantId');
  console.log(plantId);
  const editedPlant = useSelector(
    state => state.plants.plants.find(plant => plant.id === plantId)
  );

  const [name, setName] = useState(editedPlant ? editedPlant.name : '');
  const [type, setType] = useState(editedPlant ? editedPlant.type : '');
  const [image, setImage] = useState(editedPlant ? editedPlant.image : '');
  const [notes, setNotes] = useState(editedPlant ? editedPlant.notes : '');
  // const [dateReceived, setDateReceived] = useState(editedPlant ? editedPlant.dateReceived : new Date());
  // const [waterDate, setWaterDate] = useState(editedPlant ? editedPlant.waterDate : new Date());
  const [dateReceived, setDateReceived] = useState(new Date());
  const [waterDate, setWaterDate] = useState(new Date());



  const nameChangeHandler = (text) => {
    setName(text);
  };
  const typeChangeHandler = (text) => {
    setType(text);ß
  };
  const imageChangeHandler = (text) => {
    setImage(text);
  };
  const notesChangeHandler = (text) => {
    setNotes(text);
  };
  const onDateReceivedChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || dateReceived;
    setDateReceived(currentDate);
  };
  const onWaterDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || waterDate;
    setWaterDate(currentDate);
  };

  const submitHandler = useCallback(() => {
    console.log('submitted');
  }, []);

  useEffect(() => {
    props.navigation.setParams({'submit': submitHandler})
  }, [submitHandler])

  return (
    <ScrollView>
      <View>
        <Text style={styles.label}>This is where you can add a new plant!</Text>
        <TextInput 
          style={styles.textInput} 
          onChangeText={nameChangeHandler}
          value={name}
        />
        <Text style={styles.label}>This is where you can choose your plant type</Text>
          <TextInput 
          style={styles.textInput} 
          onChangeText={typeChangeHandler}
          value={type}
        />
        <Text style={styles.label}>This is where you can enter your plant image plachodler</Text>
          <TextInput 
          style={styles.textInput} 
          onChangeText={imageChangeHandler}
          value={image}
        />
        <Text style={styles.label}>When did you bring home your plant?</Text>
        <DateTimePicker
          display={'spinner'}
          onChange={onDateReceivedChangeHandler}
          value={dateReceived}
        />
        <Text style={styles.label}>When did you last water your plant?</Text>
        <DateTimePicker
          display={'spinner'}
          onChange={onWaterDateChangeHandler}
          value={waterDate}
        />
        <Text style={styles.label}>Would you like to add any note to your plant?</Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={notesChangeHandler}
          value={notes}

        />
        {/* <Button 
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
