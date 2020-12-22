import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Plant from '../components/Plant';
import { waterPlant } from '../store/actions/plants';
import { format } from 'date-fns/formatRelative'
import addDays from 'date-fns/addDays'


const PlantList = props => {
    const favoritePlants = useSelector(state => state.plants.favoritePlants);
    
    const renderPlantItem = itemData => {
      const isFavorite = favoritePlants.some(plant => plant.id === itemData.id);
    return (
      <Plant
        name={itemData.item.name}
        type={itemData.item.type}
        image={'https://image.shutterstock.com/image-photo/succulent-white-pot-on-background-600w-1158103186.jpg'}
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
        // onWaterPlant={waterPlant}
      />
    );   
  };
  return (
    <View>
      
      <FlatList
        data={props.listData}
        keyExtractor={item => item.id}
        renderItem={renderPlantItem}
        style={{width: '100%'}}
      />
    </View>
  );
};

export default PlantList;