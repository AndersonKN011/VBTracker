import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './src/components/TelaLogin/index';
import TelaRegister from './src/components/TelaRegister/index';
import TelaWelcome from './src/components/TelaWelcome/index';
import TelaTab from './src/components/TelaTab/index';
import TelaMap from './src/components/TelaMap/index';
import TelaHome from './src/components/TelaHome/index';
import TelaAlert from './src/components/TelaAlert/index';
import TelaRegisterVulnerable from './src/components/TelaRegisterVulnerable/index';

setTimeout(function(){ 
    
}, 3000);

const Stack = createStackNavigator(); // <-- resume o código

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={TelaHome} />
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Registrar" component={TelaRegister} />
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={TelaWelcome} />
        <Stack.Screen options={{headerShown: false}} name="Tab" component={TelaTab} />
        <Stack.Screen name="Mapa" component={TelaMap} />
        <Stack.Screen name="Alert" component={TelaAlert} />
        <Stack.Screen name="RegisterVulnerable" component={TelaRegisterVulnerable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}