import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Plant from '../components/Plant';

const PlantsListScreen = props => {
  const plants = useSelector(state => state.plants.plants);

  return (
    <FlatList 
      data={plants}
      renderItem={itemData => <Text>{itemData.item.name}</Text>}
    />
  )
}

export default PlantsListScreen

const styles = StyleSheet.create({})
