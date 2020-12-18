import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import Colors  from '../constants/Colors'
import { BoldText } from '../components/Text'
import PLANTS from '../data/seed-data';

const PlantDetailsScreen = props => {
  const plantId = props.navigation.getParam('plantId');
  const selectedPlant = PLANTS.find(plant => plant.id === plantId)
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer} >
        <Image style={styles.image} source={{ uri: selectedPlant.imageUrl }} />
      </View>
      <View>
        <BoldText>{selectedPlant.type}</BoldText>
        <Text>Growing Together Since: {selectedPlant.dateReceived}</Text>
        <Text>Last Watered on: {selectedPlant.waterDate}</Text>
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
    </View>
 
  )
}

PlantDetailsScreen.navigationOptions = (navigationData) => {
  const plantId = navigationData.navigation.getParam('plantId');
  const selectedPlant = PLANTS.find(plant => plant.id === plantId);
  return {
    headerTitle: selectedPlant.name
  }
}
export default PlantDetailsScreen

const styles = StyleSheet.create({
  screen:{
    flex: 1
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  }
})
