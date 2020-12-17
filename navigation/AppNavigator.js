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
      backgroundColor: Colors.green,
      height: 125
    },
    headerTintColor: Colors.taupe,
    headerTitleStyle: {
      fontFamily: 'sacramento',
      fontSize: 36
    }
  }
});

export default createAppContainer(PlantsNavigator);