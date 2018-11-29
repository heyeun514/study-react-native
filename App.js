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
      <View style={styles.container}>
        <View style={{flex:1, width: 50, height:50, backgroundColor: 'powderblue'}} />
        <View style={{flex:5, width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <Text style={{flex:3}}>Hyeeun</Text>
        <Greeting name='hyeeun' />
      </View>
      
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 300,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
