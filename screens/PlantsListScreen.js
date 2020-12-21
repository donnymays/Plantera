import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlantList from '../components/PlantList'
import * as plantsActions from '../store/actions/plants';
import Colors from '../constants/Colors';
import { DefaultText } from '../components/Text';

const PlantsListScreen = props => {  
  const [isLoading, setIsLoading] = useState(false)
  const plants = useSelector(state => state.plants.plants);
  const dispatch = useDispatch();

useEffect(() => {
  const loadPlants = async () => {
    setIsLoading(true);
    await dispatch(plantsActions.fetchPlants());
    setIsLoading(false);
  };
  loadPlants();
}, [dispatch]);

  useEffect(() => {
    dispatch(plantsActions.fetchPlants());
  }, [dispatch]);

  if (isLoading) {
    return(
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.green} />
      </View>
    )
  }

  if (!isLoading && plants.length === 0) {
    return (
      <View style={styles.centered}>
      <DefaultText>No Plants found.  Try adding some.</DefaultText>
    </View>
    )
  }

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
          iconName="ios-create"
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})