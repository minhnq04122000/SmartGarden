import React, { useState, Component } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, Image } from 'react-native';
import {
  Header,
  Container,
  Content,
  Body,
  Button,
  Text,
  H1, H2, H3,
  Col, Row,

  Item,
  Label
} from 'native-base';
import { firebaseApp } from '../components/FirebaseConfig';

// const [value, onChangeText] = useState('Useless Placeholder');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('Res')
  }

  const onLoginPress = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebaseApp.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.")
              return;
            }
            const user = firestoreDocument.data()
            navigation.navigate('Home', { user })
          })
          .catch(error => {
            alert(error)
          });
      })
      .catch(error => {
        alert(error)
      })
  }
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/background/home_header.png')}>
        </Image>
      </View>
      <View>
        <Text>Tài Khoản : </Text>
        <TextInput
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text>Mật Khẩu : </Text>
        <TextInput
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button rounded success onPress={() => onLoginPress()}>
          <Text>Login</Text>
        </Button>
        <Button rounded success onPress={() => onFooterLinkPress()}>
          <Text>Registor</Text>
        </Button>
      </View>
      <View>
        <View>
          <Image source={require('../assets/background/background.png')}>
          </Image>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});