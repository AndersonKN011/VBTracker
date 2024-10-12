import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth, db } from '../../../firebase';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';

const schema = yup.object().shape({
  nome: yup.string().required('Digite o nome completo'),
  idade: yup.number().required('Campo obrigatório').positive('Idade deve ser um número positivo').typeError("Idade inválida"),
  cpf: yup.string().required('Digite um CPF válido'),
  problemaSaude: yup.string(),
});

export default function App ({navigation}) {

  function registerFirebase (schema) {
  
  db.collection("Vulnerable").doc(schema.cpf).set({
    name: schema.nome,
    age: schema.idade,
    health: schema.problemaSaude
  })
  .catch((error) => {
    alert(error.message)
  });
    alert("Cadastrado com Sucesso!");  
    goToScreenTab();
  }

  const goToScreenTab = () => {
    navigation.navigate('Tab');
  }

  const [imageSource, setImageSource] = React.useState(null);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImageSource(result.uri);
      setValue('photo', result.uri); // Atualiza o valor do campo 'photo' no React Hook Form
    }
  };
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro da pessoa vulnerável</Text>
      <Controller
        control={control}
        name="photo"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View style={styles.imageView}>
            <TouchableOpacity style={styles.btnimage} onPress={selectImage} >
              <Text style={styles.text}>Selecionar Imagem</Text>
            </TouchableOpacity>
            {imageSource && <Image source={{ uri: imageSource }} style={styles.image} />}
          </View>
        )}
      />
      <Text style={styles.txtnote}>*É importante que coloque uma foto atualizada</Text>
      {errors.photo && <Text style={styles.error}>{errors.photo.message}</Text>}
      <Controller
        control={control}
        name="nome"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, {
              borderWidth: errors.idade && 1,
              borderColor: errors.idade && '#ff375b' 
            }]}
            placeholder="Nome Completo"
            placeholderTextColor="black"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}
      <Controller
        control={control}
        name="idade"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, {
              borderWidth: errors.idade && 1,
              borderColor: errors.idade && '#ff375b' 
            }]}
            placeholder="Idade"
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.idade && <Text style={styles.error}>{errors.idade.message}</Text>}
      <Controller
        control={control}
        name="cpf"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMask
            style={[styles.input, {
              borderWidth: errors.idade && 1,
              borderColor: errors.idade && '#ff375b' 
            }]}
            type='cpf'
            placeholder="CPF"
            placeholderTextColor="black"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCompleteType="off"
            textContentType="none"
          />
        )}
      />
      {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}
      <Controller
        control={control}
        name="problemaSaude"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, {
              borderWidth: errors.idade && 1,
              borderColor: errors.idade && '#ff375b' 
            }]}
            placeholder="Problema de Saúde (opcional)"
            placeholderTextColor="black"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit(registerFirebase)} >
        <Text style={styles.text}>Cadastrar</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
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
  btnimage: {
    backgroundColor: '#181848',
    width: "120%",
    height: 45,
    marginBottom: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    padding: 12,
    marginTop: 12,
    borderColor: '#121212',
    backgroundColor: '#0003',
    fontSize: 14,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    alignSelf: 'flex-start',
    color:'red',
    marginLeft: "5%",
    marginBottom: -4,
  },
  image: {
    width: 200, 
    height: 200, 
    marginBottom: 20,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtnote: {
    color: 'blue'
  }
});