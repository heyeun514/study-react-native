import * as React from 'react';
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
// import Calendar from './Calendar';
import { AppLoading } from "expo";
import Todo from './Todo';
import uuidv1 from 'uuid/v1';

const { width, height} = Dimensions.get('window');

interface IToDo {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface ToDoAppProps {}

interface ToDoAppState {
  newTodo: string;
  loadedTodos: boolean;
  toDos: Object;
}

export default class FlatListBasics extends React.Component<ToDoAppProps, ToDoAppState> {
  state = {
    newTodo: "",
    loadedTodos: false,
    toDos: {},
  };

  componentDidMount = () => {
    this._loadTodos();
  }
  
  render() {
    const { newTodo, loadedTodos, toDos} = this.state;
    var _this = this;
    console.log(toDos);
    // console.log(Object.values(toDos).length);
    if (!loadedTodos) {
      return <AppLoading />
    }

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
            {/* {Object.values(toDos).reverse().map((value: IToDo, index: number) => {
              return (<Todo key={index}
                    deleteTodo={this._deleteTodo}
                    completedTodo={this._completedTodo}
                    unCompletedTodo={this._unCompletedTodo}
                    updateTodo={this._updatedTodo}
                    isCompleted={value.isCompleted}
                    text={value.text}
                    id={value.id}
                    ></Todo>)
            })} */}
            {Object.values(toDos).reverse().map(function (value: IToDo) {
              return (<Todo key={value.id}
                    deleteTodo={_this._deleteTodo}
                    completedTodo={_this._completedTodo}
                    unCompletedTodo={_this._unCompletedTodo}
                    updateTodo={_this._updatedTodo}
                    isCompleted={value.isCompleted}
                    text={value.text}
                    id={value.id}
                    ></Todo>)
            })}
            
          </ScrollView>
       </View>
      </View>
    );
  }

  _controlNewTodo = (text: string) => {
    this.setState({
      newTodo: text,
    })
  }

  _loadTodos = async () => {
    
      const toDos = await AsyncStorage.getItem("toDos");
      console.log("loadTodos " + toDos);
      if (toDos) {
        this.setState({
          loadedTodos: true,
          toDos: JSON.parse(toDos),
        })
      }
  }

  _addTodo = () => {
    const {newTodo} = this.state;
    if (newTodo !== "") {this.setState((prevState) => {
        const ID = uuidv1();
        const newObject = {
          [ID]: {
            id: ID,
            isCompleted: false, 
            text: newTodo,
            createAt: Date.now()
          }
        }

        const newState = {
          ...prevState,
          toDos: {
            ...prevState.toDos,
            ...newObject,
          },
          newTodo: '',
        }
        this._saveTodos(newState.toDos);
        return {...newState};
      })
    }
  }

  _deleteTodo = (id: number) => {
    console.log("deleteTodo id=" + id);
    this.setState((prevState) => {
      const { toDos } = this.state;
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
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          }
        }
      }
      this._saveTodos(newState.toDos);
      return {...newState}
    })
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
    this.setState(prevState => {
      const newState = {
        ...prevState, 
        toDos: {
          ...prevState.toDos, 
          [id]: {
            ...prevState.toDos[id], 
            text: value,
          }
        }
      }
      this._saveTodos(newState.toDos);
      return {...newState}
    })
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

