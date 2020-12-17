import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, Platform, Button } from 'react-native';
import Colors from '../constants/Colors';

const Plant = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  } 
  return (
    <View style={styles.plant}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={() =>{props.onSelectPlant}} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.plantData}>
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.waterDate}>Last Watered On: {props.waterDate}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.green}
                title="View Details"
                onPress={() =>{
                  props.navigation.navigate({
                    routeName: 'PlantDetails'
                  })
                }}
              />
              <Button
                color={Colors.green}
                title="Water"
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
}

export default Plant

const styles = StyleSheet.create({
  plant: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    borderRadius: 10
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  plantData: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  name: {
    fontSize: 18,
    marginVertical: 4,
  },
  waterDate: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  },
});

