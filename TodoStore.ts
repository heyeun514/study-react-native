import { observable, action, extendObservable } from 'mobx';
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
   @observable newTodo: string = "";
   @observable loadedTodos: boolean = false;

   _loadedTodos = (toDos: Object) => {
       this.loadedTodos = true;
       if (toDos)
        this.toDos = toDos;
   }

   @action
   updateNewTodo = (newTodo: string) => {
       this.newTodo = newTodo;
   }

   _saveTodos = (newTodos: Object) => {
    console.log('store save Todos');
    console.log(newTodos);
    // const saveTodos = AsyncStorage.setItem("toDos", JSON.stringify(newTodos));
  }

  @action
  _addTodo = () => {
      console.log('todoStore _addTodo' + this.newTodo);
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
        

    
        // const newTodos = { ...prevTodos, ...newObject }
        
        // console.log(newObject);
        // console.log(newTodos);
        this.newTodo = '';
        extendObservable(this.toDos, newObject);
        // console.log(this.toDos);
        // this._saveTodos(this.toDos);
      }
    }
}

export let todoStore: TodoStore = new TodoStore();