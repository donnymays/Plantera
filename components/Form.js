import React, { useState, useEffect, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Platform, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors'
import { format } from 'date-fns';
import parse from 'date-fns/parse'
import * as plantsActions from '../store/actions/plants';
import { DefaultText, ItalicText, BoldText } from '../components/Text';
import Wizard from 'react-native-wizard';
import { Picker } from '@react-native-picker/picker';

const Form = props => {

  const plantId = props.navigation.getParam('plantId');
  const editedPlant = useSelector(
    state => state.plants.plants.find(plant => plant.id === plantId)
  );
  const wizard = useRef()
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
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
  const stepList = [
    {
      content: (
        <View>
          <DefaultText style={styles.label}>This is where you can add a new plant!</DefaultText>
          <TextInput 
            style={styles.textInput} 
            onChangeText={nameChangeHandler}
            value={name}
          />
        </View>
      ),
    },
    {
      content: (
        <View>
          <DefaultText style={styles.label}>This is where you can choose your plant type</DefaultText>
          <TextInput 
          style={styles.textInput} 
          onChangeText={typeChangeHandler}
          value={type}
        />
        </View>
      ),
    },
    {
      content: (
        <View>
        <DefaultText style={styles.label}>This is where you can enter your plant image plachodler</DefaultText>
          <TextInput 
          style={styles.textInput} 
          onChangeText={imageChangeHandler}
          value={image}
        />
        </View>
      ),
    },
    {
      content: (
        <View>
        <DefaultText style={styles.label}>When did you bring home your plant?</DefaultText>
        <DateTimePicker
            display={Platform.OS === 'android' ? 'default' : 'spinner'}
            onChange={onDateReceivedChangeHandler}
            value={dateReceived}
        />
        </View>
      ),
    },
    {
      content: (
        <View>
        <DefaultText style={styles.label}>When did you last water your plant?</DefaultText>
          <DateTimePicker
            display={Platform.OS === 'android' ? 'default' : 'spinner'}
            onChange={onWaterDateChangeHandler}
            value={waterDate}
          />
        </View>
      ),
    },
    {
      content: (
        <View>
          <DefaultText style={styles.label}>Would you like to add any note to your plant?</DefaultText>
          <TextInput 
            style={styles.textInput}
            onChangeText={notesChangeHandler}
            value={notes}
          />
        </View>
      ),
    },
  ]
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: Colors.gold }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: Colors.whitish,
          
          }}>
          <Button color={Colors.gold} disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Button color={Colors.gold} disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
        </View>
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <Wizard
          nextStepAnimation="slideRight"
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            
          }}
          onPrev={() => {
            
          }}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep)
          }}
        />
        {isLastStep && (
          <View>
            <Button
                color={Colors.green}
                title="Save"
                onPress={submitHandler}
              />
          </View>
        )}
        <View style={styles.dotsContainer}>
          {stepList.map((val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                
                height: 10,
                borderRadius: 5, 
                backgroundColor: index === currentStep ? Colors.green : Colors.gold
              }}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

Form.navigationOptions = navData => {
  return {
    headerTitle: 
      navData.navigation.getParam('plantId')
      ? 'Edit Plant'
      : 'Add Plant'
    
  }
};


export default Form;

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  inputContainer: {
    marginTop: 200,
    alignItems: "center", 
    justifyContent: "center" 
  },
  label: {
    fontSize: 56,
    marginBottom: 15,
    color: Colors.green
  },
  textInput: {
    borderBottomColor: Colors.green,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 10
  },
  dotsContainer: {
    flexDirection: "row", 
    margin: 18,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 360
  }
});