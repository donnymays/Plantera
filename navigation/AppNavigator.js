import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import PlantsListScreen from '../screens/PlantsListScreen';
import PlantDetailsScreen from '../screens/PlantDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CalendarScreen from '../screens/CalendarScreen';

import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.green : "#F3F5F6",
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
  PlantDetails: PlantDetailsScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({  
  Favorites: FavoritesScreen,
  PlantDetails: PlantDetailsScreen
  }, {
    defaultNavigationOptions: defaultStackNavOptions
  });

// const CalendarNavigator = createStackNavigator({

// })

const PlantsFavTabNavigator = createBottomTabNavigator({
  Plants: PlantsNavigator,
  Favorites: FavNavigator
})

// const MainNavigator = createDrawerNavigator({
//   PlantFavs: PlantsFavTabNavigator
// })

export default createAppContainer(PlantsFavTabNavigator);