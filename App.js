import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, Text } from 'react-native';
import Calendar from './Calendar';

export default class FlatListBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  _onPressAdd() {
    console.log('onPressAdd ' + location.href);
  }
  
  render() {
    return (
      <View style={styles.textContainer}>
      
        {/* <Calendar month={new Date().getMonth()+1}></Calendar> */}
        {/* <View>
          <TouchableWithoutFeedback onPress={this._onPressAdd.bind(this)}>
            <Image style={{width: 50, height: 50}} source={require('./assets/plusIcon.png')}/>
          </TouchableWithoutFeedback>
        </View> */}
        
        <Text style={styles.textChildren}>
          abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef
        </Text>
        <Text style={styles.textChildren}>
          aaaabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdeeeeeeee
        </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 30,
  //  flexDirection: 'column',
  },
  textContainer: {
    paddingTop: 30,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'center',

  },
  textChildren: {
    flex: 0.4,
    backgroundColor: 'red',
    padding: 20,
    
  }
})

