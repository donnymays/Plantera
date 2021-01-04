import React, {useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import * as plantsActions from '../store/actions/plants';
import { Agenda } from 'react-native-calendars';
import format from 'date-fns/format';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import addDays from 'date-fns/addDays'

const CalendarScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();
  const [items, setItems] = useState({});
  const dispatch = useDispatch();
  
  const plants = useSelector(state => state.plants.plants);
  
  const calendarFormattedNextWaterDate = dateString => {
    const stringToDate = addDays(new Date(dateString), 7)
    return(format(stringToDate, 'yyyy-MM-dd'))
  };

  useEffect(() => {
    const reducedPlants = plants.reduce((calendarObject, currentPlant) => {
      const {waterDate, ...plant} = currentPlant;
      const formattedWaterDate = calendarFormattedNextWaterDate(waterDate)
      calendarObject[formattedWaterDate] = [plant];
      console.log(calendarObject);
    return calendarObject;
    }, {});
    console.log('render');
    setItems(reducedPlants);
  }, []);

  useEffect(() => {
    dispatch(plantsActions.fetchPlants());
  }, [dispatch]);

  const loadPlants = useCallback(async () => {
    setError(null);
    try {
      await dispatch(plantsActions.fetchPlants());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadPlants,
      setItems
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadPlants]);

  useEffect(() => {
    setIsLoading(true);
    loadPlants().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPlants]);
  
  if (isLoading) {
    return(
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.green} />
      </View>
    )
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => {
          props.navigation.navigate({
            routeName: 'PlantDetails',
            params: {
              plantId: item.id,
              plantName: item.name,
              plantType: item.type,
              plantImage: item.image,
              plantWaterDate: item.waterDate,
              plantDateReceived: item.dateReceived,
              notes: item.dateReceived,
            }
          });
        }}
      >
        <Text style={styles.dayText}>Water {item.name} Today!</Text>
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
          selectedDotColor: Colors.gold,
          selectedDayBackgroundColor: Colors.green,
          textMonthFontFamily: 'sacramento',
          textDayFontFamily: 'open-sans',
          textDayHeaderFontFamily: 'open-sans-bold',
          textMonthFontSize: 24,
          textDayFontSize: 18,
          agendaDayNumColor: Colors.gold,
          agendaDayTextColor: Colors.red,
          agendaKnobColor: Colors.grey,
          agendaTodayColor: Colors.taupe
        }}
        renderEmptyData={() => {return (
          <View style={styles.emptyDate}>
            <Text style={{fontSize: 32, fontFamily: 'open-sans', color: Colors.grey}}>No events to display</Text>
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
  },
  emptyDate: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  dayText: {
    color: Colors.taupe,
    fontFamily: 'open-sans-bold',
    fontSize: 24
  }
})
