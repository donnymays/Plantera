import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import Colors  from '../constants/Colors'
import { BoldText } from '../components/Text'
import PLANTS from '../data/seed-data';
import { Ionicons } from '@expo/vector-icons'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

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

PlantDetailsScreen.navigationOptions = navigationData => {
  const plantId = navigationData.navigation.getParam('plantId');
  const selectedPlant = PLANTS.find(plant => plant.id === plantId)
  // return console.log(selectedPlant);
  return {
    headerTitle: selectedPlant.name,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName='ios-leaf'
          // iconName={isFavorite ? "ios-star" : "ios-star-outline"} 
          // onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
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
