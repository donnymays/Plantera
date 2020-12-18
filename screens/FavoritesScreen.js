import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FavoritesScreen = props => {
  return (
    <View>
      <Text>Favorites</Text>
    </View>
  )
}

FavoritesScreen.navigationOptions = {
  
    headerTitle: 'Your Favorites',
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Favorite"
    //       iconName='ios-leaf'
    //       // iconName={isFavorite ? "ios-star" : "ios-star-outline"} 
    //       // onPress={toggleFavorite}
    //     />
    //   </HeaderButtons>
    // )
  }

export default FavoritesScreen

const styles = StyleSheet.create({})
