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

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      uid: '',
      usersRef: '',
    }
  }
  onFooterLinkPress = () => {
    this.props.navigation.navigate('Res')
  }

  onLoginPress() {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        this.state.uid = response.user.uid
        this.state.usersRef = firebaseApp.firestore().collection('users')
          .doc(this.state.uid)
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
  render() {
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
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <Text>Mật Khẩu : </Text>
          <TextInput
            style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button rounded success onPress={() => this.onLoginPress()}>
            <Text>Login</Text>
          </Button>
          <Button rounded success onPress={() => this.onFooterLinkPress()}>
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
export default LoginScreen