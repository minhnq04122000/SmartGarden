import React, { useState, Component } from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import { firebaseApp } from '../components/FirebaseConfig';

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


// var firebase = require("firebase");



class HomePage extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database()
    this.state = {
      Do_Am: '',
      Nhiet_Do: '',
    }
    this.itemRef.ref('Do_Am/').on('value', function (snapshot) {
      console.log(snapshot.val())
    });
  }

  ListenItem(itemRef) {
    var doam = '';
    var nhietdo = '';
    this.itemRef.ref('Do_Am/').on('value', function (snapshot) {
      doam = snapshot.val();
    });
    this.itemRef.ref('Nhiet_Do/').on('value', function (snapshot) {
      nhietdo = snapshot.val();
    });
    this.setState({
      Do_Am: doam,
      Nhiet_Do: nhietdo
    })
  }

  onFooterLinkPress = () => {
    this.props.navigation.navigate("Static")
  }

  render() {
    return (
      <Container style={styles.container}>
        {/* <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header> */}
        {/* <Card style={{}}>
          <Card.Title>Độ Ẩm</Card.Title>
          <Text style={{ textAlign: "center" }}>{'50%'}</Text>
          <ToggleSwitch
            isOn={false}
            onColor="#634fc9"
            offColor="#ecf0f1"
            label="Bật"
            labelStyle={{ color: "black", fontWeight: "300" }}
            size="normal"
            onToggle={isOn => console.log("changed to : ", isOn)}
          />
          <Button transparent light onPress={() => { navigation.navigate("Static") }}>
            <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
          </Button>
        </Card> */}
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Độ Ẩm</Text>
          </CardItem>
          <CardItem bordered>
            {/* <Text>{this.state.Do_Am + '%'}</Text> */}
          </CardItem>
          <CardItem footer bordered>
            <ToggleSwitch
              isOn={false}
              onColor="#634fc9"
              offColor="#ecf0f1"
              label="Bật"
              labelStyle={{ color: "black", fontWeight: "300" }}
              size="normal"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
            <Button transparent light onPress={() => this.onFooterLinkPress()}>
              <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
            </Button>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Nhiệt Độ</Text>
          </CardItem>
          <CardItem bordered>
            {/* <Text>{this.state.Nhiet_Do + '%'}</Text> */}
          </CardItem>
          <CardItem footer bordered>
            <ToggleSwitch
              isOn={false}
              onColor="#634fc9"
              offColor="#ecf0f1"
              label="Bật"
              labelStyle={{ color: "black", fontWeight: "300" }}
              size="normal"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
            <Button transparent light onPress={() => this.props.navigation.navigate("Static")}>
              <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
            </Button>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem header bordered>
            <Text>Độ Ẩm</Text>
          </CardItem>
          <CardItem bordered>
            <Text>50%</Text>
          </CardItem>
          <CardItem footer bordered>
            <ToggleSwitch
              isOn={false}
              onColor="#634fc9"
              offColor="#ecf0f1"
              label="Bật"
              labelStyle={{ color: "black", fontWeight: "300" }}
              size="normal"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
            <Button transparent light onPress={() => this.onFooterLinkPress()}>
              <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
            </Button>
          </CardItem>
        </Card>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Button rounded success onPress={() => this.ListenItem()}>
          <Text>Resfresh</Text>
        </Button>
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
    width: 300,
    alignItems: 'center',
  }

});

export default HomePage;

