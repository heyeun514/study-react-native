import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
// import { StackNavigator } from "react-navigation";
import { Provider } from "mobx-react";
import TodoApp from "./TodoApp";
import { todoStore } from './TodoStore';

// const Navigator = StackNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Profile: { screen: ProfileScreen }
//   },
//   {
//     mode: "modal",
//     headerMode: "none"
//   }
// );

export default class App extends React.Component {
  render() {
    return (
      <Provider todoStore={todoStore}>
        <TodoApp>

        </TodoApp>
        {/* <SafeAreaView style={styles.safeArea}>
          <Navigator style={styles.navigator} />
        </SafeAreaView> */}
      </Provider>
    );
  }
}