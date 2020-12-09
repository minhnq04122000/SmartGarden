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
var sttmaybomla;
var sttmaybomdat;

class HomePage extends Component {
  constructor(props) {
    super(props);
    e = this;

    //socket
    this.socket = io('http://192.168.0.104:3000/', {
      transports: ['websocket'], jsonp: false
    });
    this.socket.connect();
    this.state = {
      windowWidth: window.innerWidth,
      userLogin: props.route.params.userLogin,
      switchValueMBL: Boolean,
      switchValueMBD: Boolean,
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
      fetch('http://192.168.0.104:3000/', {
        method: 'GET'
      })
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            datadevice: responseJson,
            switchValueMBL: responseJson.switchValueMBL,
            switchValueMBD: responseJson.switchValueMBD,
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
    fetch('http://192.168.1.27:3000/', {
      method: 'GET'
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          datadevice: responseJson,
          switchValueMBL: responseJson.switchValueMBL,
          switchValueMBD: responseJson.switchValueMBD,
          switchValueLED: responseJson.switchValueLED,
        });
      })
  }
  checkSTT() {
    if (this.state.switchValueMBL == false) {
      sttmaybomla = 'Tắt'
    } if (this.state.switchValueMBL == true) {
      sttmaybomla = 'Bật'
    } if (this.state.switchValueMBD == false) {
      sttmaybomdat = 'Tắt'
    } if (this.state.switchValueMBD == true) {
      sttmaybomdat = 'Bật'
    } if (this.state.switchValueLED == false) {
      sttden = 'Tắt'
    } if (this.state.switchValueLED == true) {
      sttden = 'Bật'
    }

  }

  render() {
    this.checkSTT()
    console.log(this.state.switchValueMBL)
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
            <Image style={{ height: 40, width: 40, marginLeft: 20 }} source={require('../assets/other/iconmucnuoc.png')}>
            </Image>
          </CardItem>
          <CardItem footer bordered>
            <Row style={{ justifyContent: 'space-around' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ color: '#000000' }}>Đèn</Text>
                <Image style={{ height: 40, width: 40, marginLeft: 20 }} source={require('../assets/other/iconden.png')}>
                </Image>
                <Text style={{ color: '#000000' }}>{sttden}</Text>
              </Row>
            </Row>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Nhiệt Độ</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{this.state.Nhiet_Do + '°C'}</Text>
            <Image style={{ height: 40, width: 40, marginLeft: 20 }} source={require('../assets/other/iconnhietdo.png')}>
            </Image>
          </CardItem>
          <CardItem footer bordered>
            <Row style={{ justifyContent: 'space-around' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ color: '#000000' }}>Máy Bơm Lá</Text>
                <Image style={{ height: 40, width: 40, marginLeft: 20 }} source={require('../assets/other/iconmaybom.png')}>
                </Image>
                <Text style={{ color: '#000000' }}>{sttmaybomla}</Text>
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
            <Image style={{ height: 40, width: 40, marginLeft: 20 }} source={require('../assets/other/icondoam.png')}>
            </Image>
          </CardItem>
          <CardItem footer bordered>
            <Row style={{ justifyContent: 'space-around' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ color: '#000000' }}>Máy Bơm Đất</Text>
                <Image style={{ height: 40, width: 40, marginLeft: 20 }} source={require('../assets/other/iconmaybom.png')}>
                </Image>
                <Text style={{ color: '#000000' }}>{sttmaybomdat}</Text>
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

