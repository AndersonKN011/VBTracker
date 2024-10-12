import React, {useState, useRef} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, } from 'react-native';
import { auth, db } from '../../../firebase';
import {Ionicons} from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const schema = yup.object({
  username: yup.string().required("Informe seu nome"),
  date: yup.date().required("Informe sua data de nascimento").nullable().transform((value, originalValue) => {
    const [day, month, year] = originalValue.split('/');
    return new Date(`${year}-${month}-${day}`); // Convertendo para o formato ISO
  }),
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve conter no mínimo 6 dígitos").required("Informe sua senha")
})

export default function App({ navigation }) {

  const [date, setDate] = useState('');
  const cpfRef = useRef(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const registerFirebase = async (schema) => {
    try {
      await createUserWithEmailAndPassword(auth, schema.email, schema.password); // Usando a função corretamente
      alert("Cadastrado com Sucesso!");
      goToScreenLogin();
      await setDoc(doc(db, "Users", schema.email), {
        name: schema.username,
        date: schema.date,
      });

      goToScreenLogin();
    } catch (error) {
      alert(error.message);
    }
  };
  const [hidepass, setHidepass] = useState(true);
  
const goToScreenLogin = () => {
navigation.push('Login'); // Código que "Puxa" a Tela Secundária
};
const goToScreenDrawer = () => {
navigation.push('Drawer'); // Código que "Puxa" a Tela Secundária
};

function reverseString(str) {
    // Passo 1. Use o método split() para retornar um novo array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Passo 2. Use o método reverse() para inverter o array recém-criado
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Passo 3. Use o método join() para unir todos os elementos do array em uma string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    // Passo 4. Retorne a string invertida
    return joinArray; // "olleh"
}

reverseString(date);
date.replace('/','');

return (
  <View style={styles.container}>
    <Image style={styles.logo} source={require('../../../assets/icon1.png')}/>
    <Controller 
      control = {control}
      name="username"
      render={({field:{onChange, onBlur, value}}) => (
        <TextInput
          style={[
            styles.input, {
              borderWidth: errors.username && 1,
              borderColor: errors.username && '#ff375b' 
            }]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite seu nome completo"
            placeholderTextColor="black"
        />
      )}
    />
    {errors.username && <Text style = {styles.labelError}>{errors.username?.message}</Text>} 
    <Controller 
      control = {control}
      name="date"
      type="date"
      render={({field:{onChange, onBlur, value}}) => (
        <TextInputMask
          style={[
            styles.input, {
              borderWidth: errors.date && 1,
              borderColor: errors.date && '#ff375b' 
            }]}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Data de nascimento (dd/mm/aa)"
            placeholderTextColor="black"
        />
      )}
    />
    {errors.date && <Text style = {styles.labelError}>{errors.date?.message}</Text>} 
    <Controller 
      control = {control}
      name="email"
      render={({field:{onChange, onBlur, value}}) => (
        <TextInput
          style={[
            styles.input, {
              borderWidth: errors.email && 1,
              borderColor: errors.email && '#ff375b' 
            }]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite seu email"
            placeholderTextColor="black"
        />
      )}
    />
    {errors.email && <Text style = {styles.labelError}>{errors.email?.message}</Text>} 
    <View style={styles.password}>
    <Controller 
      control = {control}
      name="password"
      render={({field:{onChange, onBlur, value}}) => (
        <TextInput
          style={[
            styles.inputpass, {
              borderWidth: errors.password && 1,
              borderColor: errors.password && '#ff375b' 
            }]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite sua senha"
            secureTextEntry={hidepass}
            placeholderTextColor="black"
          />
        )}
      />
      <TouchableOpacity style={styles.icon} onPress={() => setHidepass(!hidepass)}>
      {hidepass ? 
      <Ionicons name="eye" size={16}/>
      :
      <Ionicons name="eye-off" size={16}/>
      }      
      </TouchableOpacity>         
    </View>
    {errors.password && <Text style = {styles.labelError}>{errors.password?.message}</Text>}
    
    {/* Botão de Registrar*/}
    <TouchableOpacity style={styles.button} onPress={handleSubmit(registerFirebase)}>
       <Text style={styles.buttonText}>Registrar</Text> 
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
    width: 150,
    height: 190,
    top: -50,
  },
  input: {
    width: '90%',
    padding: 12,
    marginTop: 12,
    backgroundColor: '#0003',
    fontSize: 14,
    borderRadius: 6,
  },
  password: {
    width: "90%",
    marginTop: 12,
    backgroundColor: '#0003',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputpass: {
    width: '85%',
    padding: 12,
    fontSize: 14,
    borderRadius: 6,
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
  icon: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelError:{
    alignSelf: 'flex-start',
    color:'red',
    marginLeft: "5%"
  }
});
