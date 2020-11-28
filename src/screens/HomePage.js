import React, { useState, Component } from 'react';
import { View, StyleSheet, Image, SafeAreaView, Switch } from 'react-native';
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


class HomePage extends Component {
  constructor(props) {
    super(props);
    e = this;

    //socket
    this.socket = io('http://192.168.1.27:3000/', {
      transports: ['websocket'], jsonp: false
    });
    this.socket.connect();
    this.state = {
      windowWidth: window.innerWidth,

      switchValueMB: false,
      switchValueMC: false,

      Do_Am: '',
      Nhiet_Do: '',
      Do_Am_Dat: ''
    }
    this.socket.on('sv-send-data', function (data) {
      e.setState({
        Nhiet_Do: data.nd,
        Do_Am: data.da,
        Do_Am_Dat: data.dad
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

  render() {

    return (
      <Container style={styles.container}>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Độ Ẩm</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{this.state.Do_Am + '%'}</Text>
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
            <Row style={{ justifyContent: 'space-between' }}>
              <Row style={{ alignItems: 'center' }}>
                <Text style={{ color: '#000000' }}>Mái Che</Text>
                <Switch
                  onValueChange={this._handleToggleSwitchMC}
                  value={this.state.switchValueMC}
                />
              </Row>
              <Button transparent light onPress={() => this.onFooterLinkPress()}>
                <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
              </Button>
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
            <Row style={{ justifyContent: 'space-between' }}>
              <Row style={{ alignItems: 'center' }}>
                <Text style={{ color: '#000000' }}>Máy Bơm</Text>
                <Switch
                  onValueChange={this._handleToggleSwitchMB}
                  value={this.state.switchValueMB}
                />
              </Row>
              <Button transparent light onPress={() => this.onFooterLinkPress()}>
                <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
              </Button>
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

