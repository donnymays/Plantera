import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PlantList from '../components/PlantList';
import { useSelector } from 'react-redux';

const FavoritesScreen = props => {
  const favPlants = useSelector(state => state.plants.favoritePlants);

  if (favPlants.length === 0 || !favPlants) {
    return(
      <View style={styles.content}>
        <Text>No Favorites Selected</Text>
      </View>
    )
  }
  
  return (
    <PlantList listData={favPlants} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Favorites',
  }
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


