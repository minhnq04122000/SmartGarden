import React, { useState } from 'react';
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
import { firebaseApp } from '../components/FirebaseConfig.js'


export default function ResScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                };
                const usersRef = firebaseApp.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', { user: data })
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })     
            .catch((error) => {
                alert(error)
            });
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
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <Text>Nhập Lại Mật Khẩu : </Text>
                <TextInput
                    style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <Button rounded success onPress={() => onRegisterPress()}>
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