import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlantList from '../components/PlantList'
import * as plantsActions from '../store/actions/plants';

const PlantsListScreen = props => {  
  const plants = useSelector(state => state.plants.plants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(plantsActions.fetchPlants());
  }, [dispatch]);
   
  return (
      <PlantList navigation={props.navigation} listData={plants}/> 
  );
};

PlantsListScreen.navigationOptions = navData => {
  return {  
    headerTitle: 'Your Plants',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
}

export default PlantsListScreen

const styles = StyleSheet.create({})