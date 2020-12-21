import React from 'react'
import { StyleSheet, Text } from 'react-native'

const DefaultText = props => {
  return (
      <Text style={styles1.text}>{props.children}</Text>
  );
};

export {DefaultText as DefaultText}

const styles1 = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  }
});


const BoldText = props => {
  return (
      <Text style={styles2.text}>{props.children}</Text>
  );
};

export {BoldText as BoldText}  

const styles2 = StyleSheet.create({
  text: {
    fontFamily: 'open-sans-bold'
  }
});

const ItalicText = props => {
  return (
      <Text style={styles3.text}>{props.children}</Text>
  );
};

export  {ItalicText as ItalicText}

const styles3 = StyleSheet.create({
  text: {
    fontFamily: 'open-sans-italic'
  }
});