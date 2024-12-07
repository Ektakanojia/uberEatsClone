import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screen/Home";
import RestaurantsDetails from "./screen/RestaurantsDetails";
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from "./redux/store";
import OrderCompleted from "./screen/OrderCompleted";

const store = configureStore();

const Navigation = () => {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantsDetails" component={RestaurantsDetails} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default Navigation;
