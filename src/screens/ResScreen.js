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
        this.socket = io('http://192.168.1.27:3000/', {
            transports: ['websocket'], jsonp: false
        });
        this.socket.connect();
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    onRegisterPress() {
        // console.log("ok")
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        var user = {
            email : this.state.email,
            password : this.state.password
        }

        this.socket.emit('client-send-user',user)
        console.log(user)
    }
    // onRegisterPress() {
    //     if (this.state.password !== this.state.confirmPassword) {
    //         alert("Passwords don't match.")
    //         return
    //     }

    //     firebaseApp
    //         .auth()
    //         .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //         .then(() => {
    //             Alert.alert(
    //                 'Thông Báo',
    //                 'Đăng Ký Thành Công Email : ' + this.state.email,
    //                 [
    //                     { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //                     { text: 'OK', onPress: () => this.props.navigation.navigate("Login") },
    //                 ],
    //                 { cancellabel: false }
    //             )
    //             this.setState({
    //                 email: '',
    //                 password: ''
    //             })
    //         })
    //         .catch(function (error) {
    //             Alert.alert(
    //                 'Thông Báo',
    //                 'Đăng Ký Thất Bại ! ',
    //                 [
    //                     { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //                     { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //                 ],
    //                 { cancellabel: false }
    //             )
    //         });


    // }
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