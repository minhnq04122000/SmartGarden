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
import io from 'socket.io-client';

// const [value, onChangeText] = useState('Useless Placeholder');

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://192.168.1.27:3000/', {
      transports: ['websocket'], jsonp: false
    });
    this.socket.connect();
    this.state = {
      ArrUser: [],
      username: '',
      password: '',
      uid: '',
      usersRef: '',
    }
    fetch('http://192.168.1.27:3000/Alluser')
      .then(response => response.json())
      .then(data => {
        this.setState({
          ArrUser: data
        })
        console.log(data)
      }).catch((error) => {
        console.error(error);
      });
  }
  onFooterLinkPress = () => {
    this.props.navigation.navigate('Res')
  }
  onFooterLinkPress2 = () => {
    this.props.navigation.navigate('Home')
  }
  onLoginPress() {
    if (this.state.username == '') {
      alert('Nhập Tài Khoản')
    } else if (this.state.password == '') {
      alert('Nhập Mật Khẩu')
    } else {
      let status = 0;
      let statuspass = 0;
      for (let index = 0; index < this.state.ArrUser.length; index++) {
        const element = this.state.ArrUser[index];
        if (this.state.username == element.username && this.state.password == element.password) {
          status++;
        } if (this.state.username == element.username && this.state.password != element.password) {
          statuspass++;
        }
      }
      if (status > 0) {
        this.props.navigation.navigate('Home', { userLogin: this.state.username })
      } else {
        alert('Không Tìm Thấy Tài Khoản')
      }
      if (statuspass > 0) {
        alert('Mật Khẩu Không Đúng, Vui Lòng Thử Lại')
      }
    }
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
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
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
          <Button style={{ width: 200, alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 30 }} rounded success onPress={() => this.onLoginPress()}>
            <Text>Login</Text>
          </Button>
          <Button style={{ width: 200, justifyContent: 'center' }} rounded success onPress={() => this.onFooterLinkPress()}>
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