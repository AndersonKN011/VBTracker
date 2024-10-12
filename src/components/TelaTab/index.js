import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../../firebase';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-reanimated"
import TelaMap from '../TelaMap/index';
import TelaRegisterVulnerable from '../TelaRegisterVulnerable/index'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';

global.__reanimatedWorkletInit = () => {}
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao sair:', error.message);
    }
  };

  const CustomTabBarButton = ({ onPress, label, isLogout }) => (
    <TouchableOpacity
      style={[styles.tabBarButton, isLogout && styles.logoutButton]}
      onPress={onPress}
    >
      <Text style={{ color: isLogout ? 'white' : '#181848', marginRight: 10 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#181848',
          tabBarItemStyle: {
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let tabIconColor = focused ? '#FF5733' : 'gray';

            if (route.name === 'Mapa') {
              iconName = focused ? 'map' : 'map';
            } else if (route.name === 'RegisterVulnerable') {
              iconName = focused ? 'plus' : 'plus';
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={route.name === 'Mapa' ? tabIconColor : '#181848'}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Mapa"
          component={TelaMap}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} label="Mapa" />
            ),
          }}
        />
        <Tab.Screen
          name="RegisterVulnerable"
          component={TelaRegisterVulnerable}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} label="Cadastrar Vulnerável" />
            ),
          }}
        />
      </Tab.Navigator>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 120,  // Posição ajustada para não sobrepor a Tab Bar
    marginLeft: 150,
    right: 15,
    left: '35%',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});