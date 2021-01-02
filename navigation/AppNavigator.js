import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PlantsListScreen from "../screens/PlantsListScreen";
import PlantDetailsScreen from "../screens/PlantDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import CalendarScreen from "../screens/CalendarScreen";
import { BoldText } from "../components/Text";
import Colors from "../constants/Colors";
import FormScreen from "../screens/FormScreen";
import LoginScreen from "../screens/LoginScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.green : Colors.whitish,
    height: 125,
  },
  headerTintColor: Platform.OS === "android" ? Colors.grey : Colors.green,
  headerTitleStyle: {
    fontFamily: "sacramento",
    fontSize: 36,
  },
};

const PlantsNavigator = createStackNavigator(
  {
    PlantsList: PlantsListScreen,
    PlantDetails: PlantDetailsScreen,
    EditPlant: FormScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    PlantDetails: PlantDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const LogInNavigator = createStackNavigator(
  {
    LogIn: LoginScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const CalendarNavigator = createStackNavigator(
  {
    Calendar: CalendarScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Plants: {
    screen: PlantsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.green,
      tabBarLabel:
        Platform.OS === "android" ? <BoldText>Plants</BoldText> : "Plants",
    },
  },
  Calendar: {
    screen: CalendarNavigator,
    navigationOptions: {
      tabBarLabel: "Calendar",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-calendar" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.green,
      tabBarLabel:
        Platform.OS === "android" ? <BoldText>Calendar</BoldText> : "Calendar",
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-leaf" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.green,
      tabBarLabel:
        Platform.OS === "android" ? (
          <BoldText>Favorites</BoldText>
        ) : (
          "Favorites"
        ),
    },
  },
};

const PlantsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: Colors.gold,
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.green,
        },
      });

const SideBarNavigator = createDrawerNavigator(
  {
    PlantsFavs: {
      screen: PlantsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Plants",
      },
    },
    Calendar: CalendarScreen,
  },
  {
    contentOptions: {
      activeTintColor: Colors.gold,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);

const MainNavigator = createSwitchNavigator({
  LogIn: LogInNavigator,
  Plants: SideBarNavigator,
});

export default createAppContainer(MainNavigator);
