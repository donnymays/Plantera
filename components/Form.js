import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaView, Button, View, Text, TextInput, StyleSheet } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import Wizard from "react-native-wizard"
import  Colors  from "../constants/Colors";
import { format } from 'date-fns';
import * as plantsActions from '../store/actions/plants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const Form = props => {
  const wizard = useRef()
  const [isFirstStep, setIsFirstStep] = useState()
  const [isLastStep, setIsLastStep] = useState()
  const [currentStep, setCurrentStep] = useState(0)

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

  const submitHandler = useCallback(async () => {
    if (typeof editedPlant != 'undefined') {
      console.log('somethings amiss')
    }
    if (editedPlant) {
      await dispatch(plantsActions.updatePlant(
        plantId,
        name,
        type,
        image,
        format(dateReceived, 'MM/dd/yyyy'),
        format(waterDate, 'MM/dd/yyyy'), 
        notes
      ))
    } else {
      await dispatch(plantsActions.addPlant(
        name,
        type,
        image,
        format(dateReceived, 'MM/dd/yyyy'),
        format(waterDate, 'MM/dd/yyyy'), 
        notes
      ))
    }
  }, [dispatch, plantId]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])
  const stepList = [
    {
      content: (
        <View>
          <Text style={styles.label}>This is where you can add a new plant!</Text>
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
          <Text style={styles.label}>This is where you can choose your plant type</Text>
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
        <Text style={styles.label}>This is where you can enter your plant image plachodler</Text>
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
        <Text style={styles.label}>When did you bring home your plant?</Text>
        <DateTimePicker
            display={'spinner'}
            onChange={onDateReceivedChangeHandler}
            value={dateReceived}
        />
        </View>
      ),
    },
    {
      content: (
        <View>
        <Text style={styles.label}>When did you last water your plant?</Text>
          <DateTimePicker
            display={'spinner'}
            onChange={onWaterDateChangeHandler}
            value={waterDate}
          />
        </View>
      ),
    },
    {
      content: (
        <View>
          <Text style={styles.label}>Would you like to add any note to your plant?</Text>
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
      <SafeAreaView style={{ backgroundColor: "#FFF" }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
          }}>
          <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>{currentStep + 1}. Step</Text>
          <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
        </View>
      </SafeAreaView>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Wizard
          nextStepAnimation="slideRight"
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            console.log("Next Step Called")
          }}
          onPrev={() => {
            console.log("Previous Step Called")
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
        <View style={{ flexDirection: "row", margin: 18 }}>
          {stepList.map((val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentStep ? "#fc0" : "#000",
              }}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

Form.navigationOptions = navData => {
  
    headerTitle: {
      navData.navigation.getParam('plantId')
      ? 'Edit Plant'
      : 'Add Plant'
  };
};


export default Form;

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