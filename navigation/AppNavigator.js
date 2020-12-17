import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import PlantsListScreen from '../screens/PlantsListScreen';

import Colors from '../constants/Colors';

const PlantsNavigator = createStackNavigator({
  PlantsList: PlantsListScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.green
    },
    headerTintColor: Colors.taupe
  }
});

export default createAppContainer(PlantsNavigator);