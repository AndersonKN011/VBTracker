import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App({ navigation }) {

    const goToScreenLogin = () => {
      navigation.push('Login'); // Código que "Puxa" a Tela
    };
    const goToScreenRegister = () => {
      navigation.push('Registrar'); // Código que "Puxa" a Tela
    };
    const goToScreenWelcome = () => {
      navigation.push('Welcome'); // Código que "Puxa" a Tela
    };
    const goToScreenTab = () => {
      navigation.push('Tab'); // Código que "Puxa" a Tela
    };
    const goToScreenAlert = () => {
      navigation.push('Alert'); // Código que "Puxa" a Tela
    };

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/logo.png')}/>

        {/* Botão de Login*/}
        <TouchableOpacity style={styles.button} onPress={() => (goToScreenLogin())}>
        <Text style={styles.buttonText}>Fazer Login</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToScreenRegister}>
          <Text style={styles.buttonText}>Cadastre-se</Text> 
        </TouchableOpacity>

      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
  },
  logo: {
    width: 350,
    height: 350,
    top: 30,
    marginTop: -130,
  },
  button: {
    backgroundColor: '#181848',
    width: "90%",
    height: 45,
    marginTop: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    //Letra do 'Login'
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  
});