import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App ({ navigation }) {

  const goToScreenRegisterVulnerable = () => {
      navigation.push('RegisterVulnerable'); // Código que "Puxa" a Tela
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ATENÇÃO</Text>
      <Text style={styles.content}>
        Antes de iniciarmos, é necessário que cadastre a pessoa vulnerável que será monitorada, lembre-se de colocar os dados da melhor forma possível. Estes dados poderão ser utilizados para situações futuras.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={goToScreenRegisterVulnerable}
      >
        <Text style={styles.buttonText}>
          Entendido
        </Text>
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
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  content: {
    width: '90%',
    textAlign: 'justify',
    fontSize: 16,
    marginBottom: 20,
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
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});