import React from 'react'; //It allows us to use React components by importing the React library.
import {View, Text} from 'react-native'; //We take the View and Text components from the react-native library and use them to create the UI elements.
import {NavigationContainer} from '@react-navigation/native'; //NavigationContainer provides the navigation container required for application level navigation.
import {createNativeStackNavigator} from '@react-navigation/native-stack'; //createNativeStackNavigator creates a stack for managing screens using the Stack Navigator of the React Navigation library.
import Home from './components/screens/Home'; //Imports components for application screens that include Home, MyCart, and ProductInfo components in certain ways.
import MyCart from './components/screens/MyCart';
import ProductInfo from './components/screens/ProductInfo';

const App = () => {  
  //Next, we create our main component and name it App.
  const Stack = createNativeStackNavigator();
  //We create a Stack object with createNativeStackNavigator. This object will be used to manage screens within the application.
  return (
    //The NavigationContainer component ensures that the entire application has a common navigation container.
    <NavigationContainer> 
      <Stack.Navigator
        screenOptions={{
          headerShown: false, 
          //In <Stack.Navigator>, certain options can be set for the navigation stack using the screenOptions property. In this example, the option to hide the title bar is enabled.
        //Stack.Screen elements represent each screen. Their names and components are indicated.In this example, there are three different screens with Home, MyCart, and ProductInfo screens.
        }}>
          
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} /> 

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; //Finally, we export the App component.

//This code creates a React Native app that uses React Navigation to provide the navigation. 
//The application includes three screens, Home, MyCart, and ProductInfo. 
//These screens are managed using the createNativeStackNavigator and are contained in the NavigationContainer.