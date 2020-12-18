import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import Colors  from '../constants/Colors'
import BoldText from '../components/Text'

const PlantDetailsScreen = () => {
  return (
    <ScrollView>
      <Image />
      <View>
        <Text>Plant Type</Text>
        <Text>Owned Since Date</Text>
        <Text>Last Water Date</Text>
      </View>
      <View>
        <Button 
          color={Colors.green}
          title='Care Tips'
          onPress={() => {}} 
        />
        <Button 
          color={Colors.green}
          title='Notes'
          onPress={() => {}}
        />
      </View>
    </ScrollView>
 
  )
}

PlantDetailsScreen.navigationOptions = {
  headerTitle: 'Details'
}

export default PlantDetailsScreen

const styles = StyleSheet.create({})
