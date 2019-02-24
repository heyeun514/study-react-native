import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';
import uuidv1 from 'uuid/v1';

interface IToDo {
    id: number;
    text: string;
    isCompleted: boolean;
    createAt: number;
  }

class TodoStore {
   @observable toDos: any = {};
   @observable newTodo: string = '';

   _saveTodos = (newTodos: Object) => {
    console.log(newTodos);
    const saveTodos = AsyncStorage.setItem("toDos", JSON.stringify(newTodos));
  }

  @action
  _addTodo = () => {
      console.log('todoStore _addTodo');
    // const {newTodo} = this.state;
    if (this.newTodo !== "") {
      
        const ID = uuidv1();
        const newObject = {
          [ID]: {
            id: ID,
            isCompleted: false, 
            text: this.newTodo,
            createAt: Date.now()
          }
        }

        // const newState = {
        //   ...prevState,
        //   toDos: {
        //     ...prevState.toDos,
        //     ...newObject,
        //   },
        //   newTodo: '',
        // }
        this.toDos = {
            ...this.toDos,
            newObject,
        }
        this.newTodo = '';
        this._saveTodos(this.toDos);
      }
    }
}

export let todoStore: TodoStore = new TodoStore();