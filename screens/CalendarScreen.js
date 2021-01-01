import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import { CalendarList, Agenda } from 'react-native-calendars';
import format from 'date-fns/format';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { DefaultText } from '../components/Text';

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
        theme={{
          calendarBackground: Colors.whitish,
          backgroundColor: Colors.whitish,
          dotColor: Colors.red,
          selectedDotColor: Colors.green,
          selectedDayBackgroundColor: Colors.green,
          textMonthFontFamily: 'sacramento',
          textDayFontFamily: 'open-sans',
          textDayHeaderFontFamily: 'open-sans-bold',
          textMonthFontSize: 24,
          textDayFontSize: 18,
          agendaDayNumColor: Colors.gold,
          agendaDayTextColor: Colors.red
        }}
        renderEmptyDate={() => {return (
          <View>
            <DefaultText>No events to disply</DefaultText>
          </View>
        );}}
      />
    </SafeAreaView>
    
  )
}

CalendarScreen.navigationOptions = navData => {
  return {  
    headerTitle: 'Calendar',
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
export default CalendarScreen

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.green,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  }
})
