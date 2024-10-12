import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth, db } from '../../../firebase';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Stack = createStackNavigator();

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve conter no mínimo 6 dígitos").required("Informe sua senha")
});

export default function TelaLogin({ navigation }) {
  const [emailValue, setEmailValue] = useState('');
  const [loginError, setLoginError] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [hidepass, setHidepass] = useState(true);
  const emailRef = useRef(null);

  const loginFirebase = async (formData) => {
    const { email, password } = formData;
  
    try {
      // Chame a função diretamente
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        alert("Logado com Sucesso!");
        navigation.push('Tab', { email });
      }
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const goToScreenWelcome = () => {
    navigation.push('Welcome');
  };

  const goToScreenTab = () => {
    navigation.push('Tab', { email: emailValue });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/icon1.png')} />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={emailRef}
            style={[
              styles.input, {
                borderWidth: errors.email && 1,
                borderColor: errors.email && '#ff375b'
              }
            ]}
            onChangeText={(text) => {
              setEmailValue(text);
              onChange(text);
            }}
            onBlur={onBlur}
            value={value}
            placeholder="Digite seu email"
            placeholderTextColor="black"
          />
        )}
      />
      {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

      <View style={styles.password}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
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

        <TouchableOpacity style={styles.icon} onPress={() => setHidepass(!hidepass)} activeOpacity={0.8}>
          {hidepass ?
            <Ionicons name="eye" size={16} />
            :
            <Ionicons name="eye-off" size={16} />
          }
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(loginFirebase)}
      >
        <Text style={styles.buttonText}>Login</Text>
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
    top: -80,
  },
  input: {
    width: "90%",
    padding: 12,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelError: {
    alignSelf: 'flex-start',
    color: 'red',
    marginLeft: "5%"
  }
});
