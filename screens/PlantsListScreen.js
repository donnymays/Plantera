import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlantList from '../components/PlantList'
import * as plantsActions from '../store/actions/plants';
import Colors from '../constants/Colors';
import { DefaultText } from '../components/Text';
import PLANTS from '../data/seed-data';

const PlantsListScreen = props => {  
  const plants = PLANTS
  // const plants = useSelector(state => state.plants.plants);
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(plantsActions.fetchPlants());
  // }, [dispatch]);

  // const loadPlants = useCallback(async () => {
  //   setError(null);
  //   setIsRefreshing(true);
  //   try {
  //     await dispatch(plantsActions.fetchPlants());
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsRefreshing(false);
  // }, [dispatch, setIsLoading, setError]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener(
  //     'willFocus',
  //     loadPlants
  //   );
  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [loadPlants]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadPlants().then(() => {
  //     setIsLoading(false);
  //   });
  // }, [dispatch, loadPlants]);
  
  
  // if (isLoading) {
  //   return(
  //     <View style={styles.centered}>
  //       <ActivityIndicator size='large' color={Colors.green} />
  //     </View>
  //   )
  // }

  // if (!isLoading && plants.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //     <DefaultText>No Plants found.  Try adding some.</DefaultText>
  //   </View>
  //   )
  // }

  return (
      <PlantList navigation={props.navigation} listData={plants}/> 
  );
};

PlantsListScreen.navigationOptions = navData => {
  return {  
    headerTitle: 'Your Plants',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditPlant');
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
}

export default PlantsListScreen

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})