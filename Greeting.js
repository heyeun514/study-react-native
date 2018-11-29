import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    bigblue: {
        alignItems: 'center',
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    }
})

export class Greeting extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.bigblue}>Hello {this.props.name}!</Text>
      </View>
    );
  }
}