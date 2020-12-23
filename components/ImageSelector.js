import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../constants/Colors';

const ImageSelector = props => {
  return (
    <View>
      <View>

      </View>
      <Button 
        title='Take Photo'
        color={Colors.green}
        onPress={takeImageHandler}
      />
    </View>
  )
}

export default ImageSelector

const styles = StyleSheet.create({})
