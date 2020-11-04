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
var database = firebaseApp.database();


// function setonoff(doamdat, mua, rainstt) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

// const itemRef = firebaseApp.database();
export default function HomePage({ navigation }) {
  return (
    <Container>
      <Header>
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
      </Header>
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
          <Text>{'50%'}</Text>
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
          <Button transparent light onPress={() => navigation.navigate('Static')}>
            <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
          </Button>
        </CardItem>
      </Card>
      <Card style={styles.card}>
        <CardItem header bordered>
          <Text>Độ Ẩm</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{'50%'}</Text>
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
          <Button transparent light onPress={() => {navigation.navigate("Static")}}>
            <Image source={require('../assets/other/chart.png')} style={{ height: 20, width: 20 }} />
          </Button>
        </CardItem>
      </Card>
      <Card style={styles.card}>
        <CardItem header bordered>
          <Text>Độ Ẩm</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{'50%'}</Text>
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
          <Button transparent light onPress={() => { navigation.navigate("Static") }}>
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
    </Container>
  )
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
