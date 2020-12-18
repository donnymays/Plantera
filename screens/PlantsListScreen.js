import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import PlantList from '../components/PlantList'

const PlantsListScreen = props => {
  
    return (
      <PlantList navigation={props.navigation}/>
  );
};


PlantsListScreen.navigationOptions = {
  headerTitle: 'Your Plants'
}

export default PlantsListScreen

const styles = StyleSheet.create({})