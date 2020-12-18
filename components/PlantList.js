
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Plant from '../components/Plant';


const PlantList = props => {
  const plants = useSelector(state => state.plants.plants);
  const favoritePlants = useSelector(state => state.plants.favoritePlants);

  const renderPlantItem = itemData => {
    const isFavorite = favoritePlants.some(plant => plant.id === itemData.id);
    return (
      <Plant
        name={itemData.item.name}
        type={itemData.item.type}
        imageUrl={itemData.item.imageUrl}
        dateReceived={itemData.item.dateReceived}
        waterDate={itemData.item.waterDate}
        notes={itemData.item.notes}
        onSelectPlant={() => {
          props.navigation.navigate({
            routeName: 'PlantDetails',
            params: {
              plantId: itemData.item.id,
              plantName: itemData.item.name,
              isFav: isFavorite
            }
          });
        }}
      />
    );   
  };

  return (
    <View>
      <FlatList
        data={plants}
        renderItem={renderPlantItem}
        style={{width: '100%'}}
      />
    </View>
  );
};

export default PlantList;