import * as React from 'react';
// import { observable } from 'mobx';
// import { todoStore } from './TodoStore';
import { observer, inject } from 'mobx-react/native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { 
  StyleSheet,
  View, 
  Text, 
  StatusBar, 
  TextInput, 
  Dimensions, 
  Platform, 
  ScrollView,
  AsyncStorage
} from 'react-native';
import { AppLoading } from "expo";
import Todo from './Todo';
import uuidv1 from 'uuid/v1';

const { width, height} = Dimensions.get('window');

interface IToDo {
  id: number;
  todoValue: string;
  isCompleted: boolean;
  createdAt: number;
}

interface IToDos {
  [id: string]: IToDo;
}

interface ToDoAppState {
  newTodo: string;
  loadedTodos: boolean;
  toDos: IToDos;
}

const GET_ALL_TODOLIST = gql`
  query getAll {
    todoLists {
      isCompleted,
      todoValue
    }
  }
`

export default class TodoApp extends React.Component {
  // componentDidMount = () => {
  //   AsyncStorage.setItem("toDos", "");
  //   this._loadTodos();
  // }
  
  render() {
    // const { loadedTodos } = this.state;
    // const { newTodo, toDos } = this.props.todoStore;
    var _this = this;

    return (
      <Query query={GET_ALL_TODOLIST}>
      {({loading, error, data}) => {
        if (loading) {
          return <AppLoading />
        }

        if (error) {
          return <View><Text>Error</Text></View>
        }
        
        const toDos = data.todoLists;
        const newTodo = '';

        return (
          <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.title}> kawai todo </Text>
            <View style={styles.card}>
              <TextInput style={styles.input}
                placeholder={'New Todo'}
                value={newTodo}
                onChangeText={this._controlNewTodo}
                placeholderTextColor={'#999'}
                returnKeyType={"done"}
                onSubmitEditing={this._addTodo}>
                </TextInput>
                <ScrollView contentContainerStyle={styles.toDos}>
                  {Object.values(toDos).reverse().map(function (value: IToDo) {
                    return (<Todo key={value.id}
                          deleteTodo={_this._deleteTodo}
                          completedTodo={_this._completedTodo}
                          unCompletedTodo={_this._unCompletedTodo}
                          updateTodo={_this._updatedTodo}
                          isCompleted={value.isCompleted}
                          text={value.todoValue}
                          id={value.id}
                          ></Todo>)
                  })}
                </ScrollView>
            </View>
      </View>
        )
      }}
      
      </Query>
    );
  }

  _controlNewTodo = (text: string) => {
    // update New Todo....
  }

  // _controlNewTodo = (text: string) => {
  //   // this.setState({
  //   //   newTodo: text,
  //   // })
  //   console.log('controlnewtodo')
  //   this.props.todoStore.updateNewTodo(text);
  // }

  // _loadTodos = async () => { 
  //     const toDos = await AsyncStorage.getItem("toDos");
  //     console.log("loadTodos " + toDos);
  //     this.props.todoStore._loadedTodos(toDos);
  //   //   if (toDos) {
  //   //     this.setState({
  //   //       loadedTodos: true,
  //   //       toDos: JSON.parse(toDos),
  //   //     })
  //   //   } else {
  //   //     this.setState({
  //   //       loadedTodos: true,
  //   //     })
  //   //   }
  // }

  _addTodo = () => {
    this.props.todoStore._addTodo();
    // const {newTodo} = this.state;
    // if (newTodo !== "") {
    //   this.setState((prevState: ToDoAppState) => {
    //     const ID = uuidv1();
    //     const newObject = {
    //       [ID]: {
    //         id: ID,
    //         isCompleted: false, 
    //         text: newTodo,
    //         createAt: Date.now()
    //       }
    //     }

    //     const newState = {
    //       ...prevState,
    //       toDos: {
    //         ...prevState.toDos,
    //         ...newObject,
    //       },
    //       newTodo: '',
    //     }
    //     this._saveTodos(newState.toDos);
    //     return {...newState};
    //   })
    // }
  }

  _deleteTodo = (id: number) => {
    console.log("deleteTodo id=" + id);
    this.setState((prevState) => {
      const { toDos } = this.props.todoStore;
      delete toDos[id];

      const newState = {
        ...prevState,
        ...toDos,
      }
      this._saveTodos(newState.toDos);
      return {...newState};
    });
  }

  _completedTodo = (id: number) => {
    // this.setState(prevState => {
    //   const newState = {
    //     ...prevState,
    //     toDos : {
    //       ...prevState.toDos,
    //       [id]: {
    //         ...prevState.toDos[id],
    //         isCompleted: true,
    //       }
    //     }
    //   }
    //   this._saveTodos(newState.toDos);
    //   return {...newState}
    // })
  }

  _unCompletedTodo = (id: number) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false,
          }
        }
      }
      this._saveTodos(newState.toDos);
      return {...newState}
    })
  }

  _updatedTodo = (id: number, value: string) => {
    // this.setState(prevState => {
    //   const newState = {
    //     ...prevState, 
    //     toDos: {
    //       ...prevState.toDos, 
    //       [id]: {
    //         ...prevState.toDos[id], 
    //         text: value,
    //       }
    //     }
    //   }
    //   this._saveTodos(newState.toDos);
    //   return {...newState}
    // })
  }

  _saveTodos = (newTodos: Object) => {
    console.log(newTodos);
    const saveTodos = AsyncStorage.setItem("toDos", JSON.stringify(newTodos));
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 30,
   backgroundColor: '#F23657',
   alignItems: 'center'
  //  flexDirection: 'column',
  },
  title: {
    color: 'white',
    fontSize: 50,
    marginTop: 50,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    width: width - 25,
    height: height,
    borderTopLeftRadius: 10,
    ...Platform.select({
      ios : {
        shadowColor: "rgb(50, 50, 50)",
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowOffset: {
          height: -1,
          width: 0,
        }
      },
      android: {
        elevation: 3,
      }
    })
  },
  input: {
    padding: 30,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,

  },
  toDos: {
    alignItems: 'center',
  }
})

