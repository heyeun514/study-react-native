import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';


const { width, height } = Dimensions.get('window');

export default class Todo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ' ',
    }


    render() {
        const {isCompleted, isEditing, toDoValue} = this.state;
        const {text} = this.props;
        return (
            <View style={styles.container}>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={this._toggleComplete}>
                            <View style={[styles.circle, isCompleted? 
                                styles.completedCircle : styles.unCompletedCircle]}>
                            </View>
                        </TouchableOpacity>
                        {isEditing? 
                        (<TextInput style={[styles.font, isCompleted ?
                            styles.completedText : styles.unCompletedText, styles.input]}
                                        value={toDoValue} multiline={true}
                                        onChangeText={this._controlInput}
                                        returnKeyType="done"></TextInput>) : 
                        (<Text style={[styles.font, isCompleted ?
                            styles.completedText : styles.unCompletedText]}>{text}
                        </Text>)}
                        
                    </View>
                    {isEditing ?
                        (<TouchableOpacity onPress={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>
                                ✅
                                </Text>
                            </View>
                        </TouchableOpacity>) : 
                        (<View style={styles.actions}>
                            <TouchableOpacity onPress={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>
                                ✏️
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>
                                ❌
                                </Text>
                            </View>
                        </TouchableOpacity>
                        </View>)
                    }
                
                
            </View>
        )
    }

    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted,
            }
        })
    }

    _startEditing = () => {
        const {text} = this.props;
        this.setState(prevState => {
            return {
                isEditing: true,
                toDoValue: text,
            }
        })
    }

    _finishEditing = () => {
        this.setState(prevState => {
            return {
                isEditing: false,
            }
        })
    }

    _controlInput = (text) => {
        this.setState({
            toDoValue: text,
        })
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    font: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 20,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20,
    },
    completedCircle: {
        borderColor: "#bbb",
    },
    unCompletedCircle: {
        borderColor: "#F23657",
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through",
    },
    unCompletedText: {
        color: "#F23657",
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // width: width /2, 
    },
    actions: {
        flexDirection: "row",
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    input: {
        marginVertical: 15,
        paddingBottom: 5,
        // width: width /2,
    }

});