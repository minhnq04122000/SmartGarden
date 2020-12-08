import React, { Component, useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, Image, Alert } from 'react-native';
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

var e;
import { firebaseApp } from '../components/FirebaseConfig.js'


class ResScreen extends Component {
    constructor(props) {
        super(props);
        e = this;

        //socket
        this.socket = io('http://192.168.0.104:3000/', {
            transports: ['websocket'], jsonp: false
        });
        this.socket.connect();
        this.state = {
            ArrUser: [],
            username: '',
            password: '',
            confirmPassword: ''
        }

    }
    onRegisterPress() {

        var user = {
            username: this.state.username,
            password: this.state.password,
            repass: this.state.confirmPassword
        }

        if (user.username == '') {
            alert('Vui Lòng Điền Tài Khoản')
        } else if (user.password == '') {
            alert('Vui Lòng Điền Mật Khẩu')
        } else if (user.password != user.repass) {
            alert('Password Không Trùng Nhau')
        } else if (user.password.length < 8 || user.repass.length < 8) {
            alert('Password phải lớn hơn 8 ký tự')
        }
        else {
            let stt = 0;
            for (let index = 0; index < this.state.ArrUser.length; index++) {
                const element = this.state.ArrUser[index];
                if (user.username == element.username) {
                    stt++;
                }
            }
            if (stt > 0) {
                alert('Tên Đăng Nhập' + user.username + 'Đã Tồn Tại, Vui Lòng Nhập Tên Khác')
            } else if (stt <= 0) {
                alert('Đăng ký thành công tài khoản : ' + user.username)
                this.props.navigation.navigate('Login')
                this.socket.emit('client-send-user', user)
            }
        }

    }
    componentDidMount() {
        fetch('http://192.168.0.104:3000/Alluser')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ArrUser: data
                })
            })
    }

    render() {
        console.log(this.state.ArrUser)
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
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Text>Nhập Lại Mật Khẩu : </Text>
                    <TextInput
                        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        value={this.state.confirmPassword}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button rounded success onPress={() => this.onRegisterPress()}>
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
export default ResScreen;