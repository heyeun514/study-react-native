import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
// import { StackNavigator } from "react-navigation";
import { Provider } from "mobx-react";
import TodoApp from "./TodoApp";
// import { todoStore } from './TodoStore';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://api-apeast.graphcms.com/v1/cjsmw28m413ei01fj19gjkyev/master"
});
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
     
      <ApolloProvider client={client}>
        <TodoApp />
        {/* <SafeAreaView style={styles.safeArea}>
          <Navigator style={styles.navigator} />
        </SafeAreaView> */}
      </ApolloProvider>
    );
  }
}