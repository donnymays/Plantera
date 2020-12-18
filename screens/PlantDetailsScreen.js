import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import Colors  from '../constants/Colors'
import { BoldText } from '../components/Text'
import PLANTS from '../data/seed-data';
import { Ionicons } from '@expo/vector-icons'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { toggleFavorite } from '../store/actions/plants';
import { useSelector, useDispatch } from 'react-redux';

const PlantDetailsScreen = props => {
  const plantId = props.navigation.getParam('plantId');
  const availablePlants = useSelector(state => state.plants.plants)
  
  const selectedPlant = availablePlants.find(plant => plant.id === plantId);
  const currentPlantIsFavorite = useSelector(state => 
    state.plants.favoritePlants.some(plant => plant.id === plantId)
  );
  console.log(selectedPlant);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(plantId));
  }, [dispatch, plantId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentPlantIsFavorite });
  }, [currentPlantIsFavorite]);

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
  const plantName = navigationData.navigation.getParam('plantName');
  const selectedPlant = PLANTS.find(plant => plant.id === plantId)
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  // return console.log(selectedPlant);
  return {
    headerTitle: plantName,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'leaf' : 'leaf-outline'}
          onPress={toggleFavorite}
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
