import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import PlantsListScreen from '../screens/PlantsListScreen';
import PlantDetailsScreen from '../screens/PlantDetailsScreen';

import Colors from '../constants/Colors';

const PlantsNavigator = createStackNavigator({
  PlantsList: PlantsListScreen,
  PlantDetails: PlantDetailsScreen
}, {
  defaultNavigationOptions: {
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
});

export default createAppContainer(PlantsNavigator);