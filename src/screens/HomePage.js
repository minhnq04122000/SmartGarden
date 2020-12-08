import React, { useState, Component } from 'react';
import { View, StyleSheet, Image, SafeAreaView, Switch, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import { firebaseApp } from '../components/FirebaseConfig';

import io from 'socket.io-client';

import {
  Header,
  Footer,
  Icon,
  FooterTab,
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  Text,
  Left,
  Right,
  Title,
  H1, H2, H3,
  Col, Row,
  Item
} from 'native-base';

var e;
var sttden;
var sttmaybom;

class HomePage extends Component {
  constructor(props) {
    super(props);
    e = this;

    //socket
    this.socket = io('http://192.168.1.10:3000/', {
      transports: ['websocket'], jsonp: false
    });
    this.socket.connect();
    this.state = {
      windowWidth: window.innerWidth,
      userLogin: props.route.params.userLogin,
      switchValueMB: Boolean,
      switchValueLED: Boolean,

      phantram_conlai: '',
      Nhiet_Do: '',
      Do_Am_Dat: ''
    }
    this.socket.on('sv-send-data', function (data) {
      e.setState({
        Nhiet_Do: data.nd,
        Do_Am_Dat: data.dad
      })
      fetch('http://192.168.1.10:3000/', {
        method: 'GET'
      })
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            datadevice: responseJson,
            switchValueMB: responseJson.switchValueMB,
            switchValueLED: responseJson.switchValueLED,
          });
        })
    })
    this.socket.on('send-docao', function (data) {
      e.setState({
        phantram_conlai: data
      })
    })

  }
  _handleToggleSwitchMB = () => {
    this.setState({
      switchValueMB: !this.state.switchValueMB
    })
    this.socket.emit('client-send-MB', !this.state.switchValueMB)
  }
  _handleToggleSwitchMC = () => {
    this.setState({
      switchValueMC: !this.state.switchValueMC
    })
    this.socket.emit('client-send-MC', !this.state.switchValueMC)
  }


  GoToSetting = () => {
    this.props.navigation.navigate('Setting')
  }


  // ListenItem() {
  //   return fetch('http://192.168.0.138:3000/data', {
  //     method: 'GET'
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         Do_Am: responseJson.DoAm,
  //         Nhiet_Do: responseJson.NhietDo,
  //       });
  //       console.log(this.state.Do_Am)
  //     })

  // }

  onFooterLinkPress = () => {
    this.props.navigation.navigate("Static")
  }
  componentDidMount() {
    fetch('http://192.168.1.10:3000/', {
      method: 'GET'
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          datadevice: responseJson,
          switchValueMB: responseJson.switchValueMB,
          switchValueLED: responseJson.switchValueLED,
        });
      })
  }
  checkSTT() {
    if (this.state.switchValueMB == false) {
      sttmaybom = 'Tắt'
    } if (this.state.switchValueMB == true) {
      sttmaybom = 'Bật'
    } if (this.state.switchValueLED == false) {
      sttden = 'Tắt'
    } if (this.state.switchValueLED == true) {
      sttden = 'Bật'
    }

  }

  render() {
    this.checkSTT()
    console.log(this.state.userLogin)
    return (
      <Container style={styles.container}>
        <Row style={{ marginTop: 25 }}>
          <Text>Xin Chào, </Text>
    <Text style={{ fontWeight: 'bold' }}>{this.state.userLogin}</Text>
        </Row>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Mực nước còn lại</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{this.state.phantram_conlai + '%'}</Text>
          </CardItem>
          <CardItem footer bordered>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Nhiệt Độ</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{this.state.Nhiet_Do + '°C'}</Text>
          </CardItem>
          <CardItem footer bordered>
            <Row style={{ justifyContent: 'space-around' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ color: '#000000' }}>Đèn</Text>
                <Text style={{ color: '#000000' }}>{sttden}</Text>
              </Row>
            </Row>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Độ Ẩm Đất</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{this.state.Do_Am_Dat}%</Text>
          </CardItem>
          <CardItem footer bordered>
            <Row style={{ justifyContent: 'space-around' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ color: '#000000' }}>Máy Bơm</Text>
                <Text style={{ color: '#000000' }}>{sttmaybom}</Text>
              </Row>
            </Row>
          </CardItem>
        </Card>
        <View style={{ margin: 20 }}>
          <Button rounded success onPress={() => this.GoToSetting()}>
            <Text>{'Đi Tới Cài Đặt'}</Text>
          </Button>
        </View>
      </Container>
    )
  }

  // componentDidMount() {
  //   this.ListenItem(this.itemRef);
  // }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  card: {
    height: 200,
    width: 300,
    alignItems: 'center',
  }

});

export default HomePage;

