import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import Daybox from './Daybox';
import moment from 'moment';
var {height, width} = Dimensions.get('window');

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedDay: moment().date(),
    }
  }

  _pressDaybox(day) {
      console.log('pressDaybox' + day + this);
      const now = Date.now();
      this.setState({
          selectedDay: day,
      });
  }

  _renderDays() {
    let firstDay = moment('2018-'+ this.props.month + '-01').day();
    let daysInMonth = moment().daysInMonth();
    
    // cound weeks
    let firstSat = 6 - firstDay;
    let startDay = 1 - firstDay;
    let c = 1;
    for(; firstSat < daysInMonth; firstSat += 7, c++) {}
    
    let weeks = [];
    for(var d = startDay; d < daysInMonth; d += 7) {
        weeks.push(this._renderWeek(d, daysInMonth));
    }
    return weeks;

  }

  _renderWeek(idx, maxDate) {
    console.log('renderWeek=' + idx);
    console.log(moment().date());
    let week = [];
    for (var d = idx, w = 0; w<7; d++, w++) {
        if (d <= 0 || d > maxDate) {
            week.push(<Daybox key={d} block={true} day={''}
                select={(this.state.selectedDay == d)} onPress={this._pressDaybox.bind(this)}/>);
        } else {
            week.push(<Daybox key={d} block={false} day={d}
                select={(this.state.selectedDay == d)} onPress={this._pressDaybox.bind(this)}/>);
        }
    }

    return (<View key={idx} style={styles.weekContainer}>{week}</View>)
      
  }
  
  render() {
      const days = new Date().get
    return (
      <View>
        <Text style={styles.monthText}>{this.props.month}</Text>
        <View style={styles.calContainer}>    
            {this._renderDays()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    calContainer: {
     flexDirection: 'column',
    //  justifyContent: 'flex-start'
    },
    weekContainer: {
      flexDirection: 'row',
      
    },
    monthText: {
        fontSize: 30,
        textAlign: 'center',
        
    },
  })