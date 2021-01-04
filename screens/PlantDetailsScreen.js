import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native'
import Colors  from '../constants/Colors'
import { BoldText, DefaultText } from '../components/Text'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { toggleFavorite, waterPlant, deletePlant } from '../store/actions/plants';
import { useSelector, useDispatch } from 'react-redux';
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'

const PlantDetailsScreen = props => {
  const plantId = props.navigation.getParam('plantId');
  const plantName = props.navigation.getParam('plantName');
  const plantType = props.navigation.getParam('plantType');
  const plantImage = props.navigation.getParam('plantImage');
  const plantDateReceived = props.navigation.getParam('plantDateReceived');
  const plantNotes = props.navigation.getParam('plantNotes');
  
  const plants = useSelector(state => state.plants.plants);
  const selectedPlant = plants.find(plant => plant.id === plantId);
  const currentPlantIsFavorite = useSelector(state => 
    state.plants.favoritePlants.some(plant => plant.id === plantId)
  );
  
  const dispatch = useDispatch();

  const waterPlantHandler = useCallback(() => {
    dispatch(waterPlant(plantId, plantName, plantType, plantImage, plantDateReceived, plantNotes));
  }, [dispatch]);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(plantId));
  }, [dispatch, plantId]);

  const deletePlantHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deletePlant(id));
          props.navigation.navigate('PlantsList')
        }
      }
    ]);
  };

  const nextWaterDate = dateString => {
   const formattedWaterDate = new Date(dateString)
   const nextWaterDate = addDays(formattedWaterDate, 7)
   const formattedNextWaterDate = format(nextWaterDate, ('MM/dd/yyyy'))
   return (formattedNextWaterDate);
  };

  const editPlantHandler = id => {
    props.navigation.navigate({
      routeName: 'EditPlant', 
      params: { 
        plantId: id 
      }
    });
  }

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentPlantIsFavorite });
  }, [currentPlantIsFavorite]);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer} >
        <Image style={styles.image} source={{ uri: selectedPlant.image }} />
      </View>
      
      <View style={styles.dataContainer}>
      <BoldText style={styles.typeText}>{selectedPlant.type}</BoldText>
        <View style={styles.datesContainer}>
          <DefaultText>Growing Together Since: {selectedPlant.dateReceived}</DefaultText>
          <DefaultText>Last Watered on: {selectedPlant.waterDate}</DefaultText>
          <DefaultText>Next Water on: {nextWaterDate(selectedPlant.waterDate)}</DefaultText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          color={Colors.green}
          title='Water'
          onPress={waterPlantHandler} 
        />
        <Button 
          color={Colors.green}
          title='Edit Plant'
          onPress={() => {
            editPlantHandler(selectedPlant.id)
          }}
        />
          <Button 
          color={Colors.red}
          title='Delete Plant'
          onPress={() => {
            deletePlantHandler(selectedPlant.id)
          }}
        />
      </View>
    </View>
  )
}

PlantDetailsScreen.navigationOptions = navigationData => {
  const plantName = navigationData.navigation.getParam('plantName');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  
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
  },
  dataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  typeText: {
    fontSize: 100
  }
})
