import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Plant from '../components/Plant';

const PlantsListScreen = props => {
  const plants = useSelector(state => state.plants.plants);

  return (
    <FlatList 
      data={plants}
      renderItem={itemData => 
        <Plant
          image={itemData.item.imageUrl}
          name={itemData.item.name}
          waterDate={itemData.item.waterDate}
          onSelectPlant={() => {
            props.navigation.navigate({
              routeName: 'PlantDetails',
              params: {
                plantId: itemData.item.id,
              }
            })
          }}
        />
      }
    />
  )
}

PlantsListScreen.navigationOptions = {
  headerTitle: 'Your Plants'
}

export default PlantsListScreen

const styles = StyleSheet.create({})