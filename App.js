import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Greeting } from './Greeting';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isShowingText: true };
    // setInterval(() => {
    //   this.setState(previousState => (
    //     { isShowingText: !previousState.isShowingText }
    //   ))
    // }, 1000);
  }


  render() {
    if (!this.state.isShowingText) {
      return null;
    }

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 100, backgroundColor: 'steelblue'}} />
      </View>
      
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // height: 300,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    // justifyContent: 'space-evenly',
  },
});
