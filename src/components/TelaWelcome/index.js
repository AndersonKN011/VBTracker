import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Pressable } from 'react-native';
import { auth, db } from '../../../firebase';

export default function App({navigation}) {

  const [modalVisible, setModalVisible] = useState(true);

const goToScreenHome = () => {
  navigation.replace('Home'); 
};

function signOutFirebase () {
  
  auth.signOut().then(() => {
    goToScreenHome();
  })
  .catch((error) => {
    alert(error.message)
  });
  }

return (
  <View style={styles.container}>
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      OnRequestClose={() => {
        alert("Modal Fechado");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Antes de continuar por favor cadastre a pessoa que será rastreada!</Text>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Entendido</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    <Pressable onPress={() => setModalVisible(true)}>
      <Text>Pop-up</Text>
    </Pressable>
    <Text style={styles.text}>Bem-Vindo</Text>
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
  /*button: {
    backgroundColor: '#181848',
    width: "90%",
    height: 43,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    //Letra do 'Login'
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },*/
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  modalView: {
    margin: 20,
    marginTop: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '2196f3'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
