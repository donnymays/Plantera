import React, { useState, useEffect, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Alert, Button, Platform, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors'
import { format } from 'date-fns';
import * as plantsActions from '../store/actions/plants';
import Wizard from 'react-native-wizard';
import { Picker } from '@react-native-picker/picker';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';


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
  const [dateReceived, setDateReceived] = useState(editedPlant ? new Date(editedPlant.dateReceived) : new Date());
  const [waterDate, setWaterDate] = useState(editedPlant ? new Date (editedPlant.waterDate) : new Date());
  
  const [show, setShow] = useState(Platform.OS === 'ios' ? true : false);

  const nameChangeHandler = (text) => {
    setName(text);
  };
  const typeChangeHandler = (inputValue) => {
    setType(inputValue);
  };
  
  const notesChangeHandler = (text) => {
    setNotes(text);
  };

  const imageChangeHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }
    
    const uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = firebase.storage().ref().child("images/");
      return ref.put(blob);
    }
    
    const imageTaken = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    if (!imageTaken.cancelled) {
      uploadImage(imageTaken.uri)
        // .then(() => {
        //   Alert.alert("Success");
        // })
        .catch((error) => {
          Alert.alert(error.message);
        });
      setImage(imageTaken.uri);
    }
  }

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
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
  }, [submitHandler]);
  
  const stepList = [
    {
      content: (
        <View>
          <Text style={styles.label}>What's your plant's name?</Text>
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
          <Text style={styles.label}>Type of plant?</Text>
          <Picker 
            onValueChange={typeChangeHandler}
            selectedValue={type}
          >
            <Picker.Item label="Alocasia" value="Alocasia" />
            <Picker.Item label="Ficus" value="Ficus" />
            <Picker.Item label="Monstera" value="Monstera" />
            <Picker.Item label="Calathea" value="Calathea" />
            <Picker.Item label="Succulent" value="Succulent" />
            <Picker.Item label="Cactus" value="Cactus" />
          </Picker>
        </View>
      ),
    },
    {
      content: (
        <View>
          <Text style={styles.label}>Take a Photo of Your Plant</Text>
          {/* <View style={styles.imagePreview}>
            {!image ? <Text>No Photo to Display</Text>
            : <Image 
              style={styles.image}
              source={{uri: image}}
            />}
          </View> */}
          <Button
            title="Take Image"
            color={Colors.green}
            onPress={imageChangeHandler}
          />
        </View>
      ),
    },
    {
      content: (
        <View>
        <Text style={styles.label}>When did you bring home your plant?</Text>
        {Platform.OS === 'android' ? 
            <Button 
            color={Colors.green}
            title="Show Calender"
            onPress={() => setShow(true)}
            /> : <Text></Text>}
        {show && (
          <DateTimePicker
            display='spinner'
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || dateReceived;
              Platform.OS === 'android' ? setShow(false) : ''
              setDateReceived(currentDate);
            }}
            value={dateReceived}
          />
        )}
        </View>
      ),
    },
    {
      content: (
        <View>
        <Text style={styles.label}>When did you last water your plant?</Text>
          {Platform.OS === 'android' ? 
            <Button 
            color={Colors.green}
            title="Show Calender"
            onPress={() => setShow(true)}
            /> : <Text></Text>}
          {show && (
            <DateTimePicker
            display='spinner'
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || waterDate;
              Platform.OS === 'android' ? setShow(false) : ''
              setWaterDate(currentDate);
            }}
            value={waterDate}
            />
          )}
        </View>
      ),
    },
    {
      content: (
        <View>
          <Text style={styles.label}>Would you like to add a note to your plant?</Text>
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
            paddingTop: 10,
            justifyContent: "space-around",
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
    marginTop: 150,
    alignItems: "center", 
    justifyContent: "center",
    marginHorizontal: 20
  },
  label: {
    marginBottom: 15,
    color: Colors.grey,
    fontSize: 48,
    fontFamily: 'open-sans',
    textAlign: 'center',
  },
  textInput: {
    borderBottomColor: Colors.green,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'open-sans-italic',
    fontSize: 36,
    color: Colors.gold
  },
  dotsContainer: {
    flexDirection: "row", 
    margin: 18,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 120
  }
});