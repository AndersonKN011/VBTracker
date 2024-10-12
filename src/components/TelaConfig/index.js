import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function App() {
  const minhaFuncao = () => {
    // Lógica da sua função principal
    console.log('A função principal foi chamada!');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem-vindo à Minha Tela!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});