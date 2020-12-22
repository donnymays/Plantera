import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlantsListScreen from '../screens/PlantsListScreen';
import PlantDetailsScreen from '../screens/PlantDetailsScreen';
import NewPlantScreen from '../screens/NewPlantScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import EditPlantScreen from '../screens/EditPlantScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { BoldText } from '../components/Text';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.green : Colors.whitish,
    height: 125
  },
  headerTintColor: Platform.OS === "android" ? Colors.grey : Colors.green,
  headerTitleStyle: {
    fontFamily: 'sacramento',
    fontSize: 36
  }
}

const PlantsNavigator = createStackNavigator({
  PlantsList: PlantsListScreen,
  PlantDetails: PlantDetailsScreen,
  EditPlant: EditPlantScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({  
  Favorites: FavoritesScreen,
  PlantDetails: PlantDetailsScreen
  }, {
    defaultNavigationOptions: defaultStackNavOptions
  });

  const tabScreenConfig = 
  {
    Plants: {
      screen: PlantsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-home"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
        tabBarColor: Colors.green,
        tabBarLabel: Platform.OS === 'android' ? <BoldText>Plants</BoldText> : 'Plants'
      },
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-leaf" size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.green,
        tabBarLabel: Platform.OS === 'android' ? <BoldText>Favorites</BoldText> : 'Favorites'
      },
    },
  }

  const PlantsFavTabNavigator = 
  Platform.OS === 'android' 
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: Colors.gold,
      shifting: true
  }) 
  : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: {
        labelStyle: {
          fontFamily: 'open-sans-bold'
        },
        activeTintColor: Colors.green,
      }
    }
  );

  const NewPlantNavigator = createStackNavigator(
    {
      NewPlant: NewPlantScreen
    },
    {
      defaultNavigationOptions: defaultStackNavOptions
    }
  );

  const MainNavigator = createDrawerNavigator(
    {
      PlantsFavs: {
        screen: PlantsFavTabNavigator,
        navigationOptions: {
          drawerLabel: 'Plants'
        }
      },
      NewPlant: NewPlantNavigator
    },
    {
      contentOptions: {
        activeTintColor: Colors.gold,
        labelStyle: {
          fontFamily: 'open-sans-bold'
        }
      }
    }
  );

export default createAppContainer(MainNavigator);