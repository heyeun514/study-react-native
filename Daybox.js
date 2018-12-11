import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableWithoutFeedback } from 'react-native';
var {height, width} = Dimensions.get('window');

export default class Daybox extends Component {
  constructor(props) {
    super(props);
  }

  _onPress() {
      this.props.onPress(this.props.day);
  }

  render() {
    let containerStyle = [styles.container];
    if (this.props.block) containerStyle.push(styles.block)
    if (this.props.select) containerStyle.push(styles.select)

    return (
      <View>
        <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
            <View  style={containerStyle}>
                <Text>{this.props.day}</Text>
            </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: width/7,
        height: 60,
        backgroundColor: '#d9b38c',
        borderWidth: 1,
        borderColor: 'white',
    },
    touchableArea: {
        width: width/7,
        height: 60,
    },
    select: {
        borderColor: '#804000',
        backgroundColor: '#ffaa00',
    },
    block: {
        backgroundColor: '#f2e6d9',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })