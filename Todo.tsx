import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';


const { width, height } = Dimensions.get('window');
export interface TodoProps {
    text: string;
    deleteTodo: Function;
    id: number;
    isCompleted: boolean;
    unCompletedTodo: Function;
    completedTodo: Function;
    updateTodo: Function;
}

interface TodoState {
    isEditing: boolean;
    isCompleted: boolean;
    toDoValue: string;
}

export default class Todo extends React.Component<TodoProps, TodoState> {

    constructor(props: TodoProps) {
        super(props);
        
        this.state = {
            isEditing: false,
            isCompleted: false,
            toDoValue: props.text,
        }
    }

    render() {
        const {isEditing, toDoValue} = this.state;
        const {text, deleteTodo, id, isCompleted} = this.props;
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
                                <Text>}>
                                ✅
                                </Text>
                            </View>
                        </TouchableOpacity>) : 
                        (<View style={styles.actions}>
                            <TouchableOpacity onPress={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text>
                                ✏️
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {deleteTodo(id)}}>
                            <View style={styles.actionContainer}>
                                <Text>
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
        const {isCompleted, unCompletedTodo, completedTodo, id} = this.props;
        if (isCompleted){
            unCompletedTodo(id);
        } else {
            completedTodo(id);
        }
    }
    
    _startEditing = () => {
        // const {text} = this.props;
        this.setState(prevState => {
            return {
                isEditing: true,
            }
        })
    }

    _finishEditing = () => {
        const { updateTodo, id } = this.props;
        this.setState(prevState => {
            updateTodo(id, this.state.toDoValue)
            return {
                isEditing: false,
            }
        })
    }

    _controlInput = (text: string) => {
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