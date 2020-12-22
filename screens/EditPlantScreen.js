import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors'
import { format } from 'date-fns';
import parse from 'date-fns/parse'
import * as plantsActions from '../store/actions/plants';

const EditPlantScreen = props => {

  const plantId = props.navigation.getParam('plantId');
  const editedPlant = useSelector(
    state => state.plants.plants.find(plant => plant.id === plantId)
  );
 
  const [name, setName] = useState(editedPlant ? editedPlant.name : '');
  const [type, setType] = useState(editedPlant ? editedPlant.type : '');
  const [image, setImage] = useState(editedPlant ? editedPlant.image : '');
  const [notes, setNotes] = useState(editedPlant ? editedPlant.notes : '');
  const [dateReceived, setDateReceived] = useState(new Date(1598051730000));
  const [waterDate, setWaterDate] = useState(new Date(1598051730000));
  
  const nameChangeHandler = (text) => {
    setName(text);
  };
  const typeChangeHandler = (text) => {
    setType(text);
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

  const dispatch = useDispatch();

  const submitHandler = useCallback( () => {
    
    if (editedPlant) {
     dispatch(plantsActions.updatePlant(
        plantId,
        name,
        type,
        image,
        format(dateReceived, 'MM/dd/yyyy'),
        format(waterDate, 'MM/dd/yyyy'),
        notes
      ))
    } else {
       dispatch(plantsActions.addPlant(
        name,
        type,
        image,
        format(dateReceived, 'MM/dd/yyyy'),
        format(waterDate, 'MM/dd/yyyy'), 
        notes
      ))
    }
    props.navigation.goBack();
  }, [dispatch, plantId, name, type, image, dateReceived, waterDate, notes]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
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