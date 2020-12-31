import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { CalendarList, Agenda } from 'react-native-calendars';
import format from 'date-fns/format';



const CalendarScreen = props => {
  const [items, setItems] = useState({});
  const plants = useSelector(state => state.plants.plants);

  
  const calendarFormattedDates = dateString => {
    const stringToDate = new Date(dateString)
    return(format(stringToDate, 'yyyy-MM-dd'))
  };

  useEffect(() => {
    
    const reducedPlants = plants.reduce((acc, currentPlant) => {
      const {waterDate, ...plant} = currentPlant;
      const formattedWaterDate = calendarFormattedDates(waterDate)
      acc[formattedWaterDate] = [plant];
      return acc;
    }, {});
    setItems(reducedPlants);
  }, [])


  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Agenda
        items={items}
        renderItem={renderItem}
      />
    </SafeAreaView>
    
  )
}
export default CalendarScreen

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  }
})
