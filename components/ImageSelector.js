import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Button } from 'react-native';
import Colors from '../constants/Colors';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const ImageSelector = props => {
  const [pickedPhoto, setPickedPhoto] = useState()
  
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

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }
   const photo = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [16, 9],
     quality: 0.5
   });
   setPickedPhoto(photo.uri);
   console.log(photo.uri);
  };

  

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
       {!pickedPhoto ? <Text>No Photo to Display</Text>
       : <Image 
        style={styles.image}
        source={{uri: pickedPhoto}}
      />}
      </View>
      <Button
        title="Take Image"
        color={Colors.green}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImageSelector

const styles = StyleSheet.create({})
