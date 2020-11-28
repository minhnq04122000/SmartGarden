import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Switch, Picker, ScrollView, TextInput } from 'react-native';
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
    Form,
    Right,
    Title,
    H1, H2, H3,
    Col, Row,
    Item
} from 'native-base';

import io from 'socket.io-client';
var e;

export default class SettingScreen extends Component {

    constructor(props) {

        super(props);
        e = this;
        this.socket = io('http://192.168.1.27:3000/', {
            transports: ['websocket'], jsonp: false
        });
        this.socket.connect();
        this.state = {
            datadevice: [],
            switchValueMB: false,
            switchValueLED: false,
            switchValueSTT: false,
            stt: 'AuTo',
            sttled: '',
            sttmb: '',
            ndtuoiAT: '',
            datuoiAT: '',
            ndtuoiMN: '',
            datuoiMN: '',
            congsuatMN: '',
            mucnuoc: '',

        }
        this.socket.on('sv-send-stt', function (data) {
            e.setState({
                stt: data
            })
        })
        this.socket.on('sv-send-sttled', function (data) {
            e.setState({
                sttled: data
            })
        })
        this.socket.on('sv-send-sttmb', function (data) {
            e.setState({
                sttmb: data
            })
        })
        this.socket.on('send-mn', function (data) {
            e.setState({
                mucnuoc: data
            })
        })

    }

    // componentDidMount() {
    //     fetch('http://192.168.0.109:3000/device')
    //         .then(response => response.json())
    //         .then(data => console.log(data.datuoiAT))
    // }

    _updateNDAT = (ndtuoiAT) => {
        this.setState({ ndtuoiAT: ndtuoiAT })
        this.socket.emit('client-send-ndtuoiAT', ndtuoiAT)
    }
    _updateNDMN = (ndtuoiMN) => {
        this.setState({ ndtuoiMN: ndtuoiMN })
        this.socket.emit('client-send-ndtuoiMN', ndtuoiMN)
    }

    _updateDAAT = (datuoiAT) => {
        this.setState({ datuoiAT: datuoiAT })
        this.socket.emit('client-send-datuoiAT', datuoiAT)
    }
    _updateDAMN = (datuoiMN) => {
        this.setState({ datuoiMN: datuoiMN })
        this.socket.emit('client-send-datuoiMN', datuoiMN)
    }
    SENDMUCNUOC() {
        this.socket.emit('client-send-mucnuoc', this.state.mucnuoc)
    }
    _handleToggleSwitchMB = () => {
        this.setState({
            switchValueMB: !this.state.switchValueMB
        })
        this.socket.emit('client-send-MB', !this.state.switchValueMB)
    }
    _handleToggleSwitchLED = () => {
        this.setState({
            switchValueLED: !this.state.switchValueLED
        })
        this.socket.emit('client-send-STTLED', !this.state.switchValueLED)
    }
    _handleToggleSwitchSTT = () => {
        this.setState({
            switchValueSTT: !this.state.switchValueSTT,
        })
        this.socket.emit('client-send-stt', !this.state.switchValueSTT)
    }
    render() {
        return (
            <View >
                <ScrollView>
                    <View style={{ alignItems: 'center', flex: 1, padding: 30 }}>
                        <Title style={{ color: '#000000', fontWeight: "bold" }}>{('Cài Đặt')}</Title>
                    </View>
                    <View style={{ marginLeft: 40, marginBottom: 40, marginRight: 40 }}>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#000000' }}>{'Trạng thái hoạt động : '}</Text>
                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>{this.state.stt}</Text>
                            <Switch

                                onValueChange={this._handleToggleSwitchSTT}
                                value={this.state.switchValueSTT}
                            />
                        </Row>
                    </View>
                    <View style={{ marginLeft: 40, marginBottom: 40 }}>
                        <H3 style={{ fontWeight: 'bold' }}>{'Chế Độ Auto :'}</H3>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40, flex: 1 }}>
                        <Text style={{ color: '#000000' }}>{'Nhiệt Độ tưới cây : '}</Text>
                        <Picker selectedValue={this.state.ndtuoiAT} onValueChange={this._updateNDAT}>
                            <Picker.Item label="20 %" value="20" />
                            <Picker.Item label="40 %" value="40" />
                            <Picker.Item label="60 %" value="60" />
                            <Picker.Item label="80 %" value="80" />
                            <Picker.Item label="100 %" value="100" />
                        </Picker>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#000000' }}>{'Độ Ẩm tưới cây : '}</Text>
                        <Picker selectedValue={this.state.datuoiAT} onValueChange={this._updateDAAT}>
                            <Picker.Item label="20 %" value="20" />
                            <Picker.Item label="40 %" value="40" />
                            <Picker.Item label="60 %" value="60" />
                            <Picker.Item label="80 %" value="80" />
                            <Picker.Item label="100 %" value="100" />
                        </Picker>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#000000' }}>{'Nhập Mực nước còn lại : '}</Text>
                        <Row>
                            <TextInput
                                keyboardType='numeric'
                                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
                                onChangeText={(mucnuoc) => this.setState({ mucnuoc })}
                                value={this.state.mucnuoc}
                            />
                            <Button style={{ width: 80, justifyContent: 'center', margin: 10 }} rounded success onPress={() => this.SENDMUCNUOC()}>
                                <Text>Gửi</Text>
                            </Button>
                        </Row>

                    </View>
                    <View style={{ marginLeft: 40 }}>
                        <H3 style={{ fontWeight: 'bold' }}>{'Chế Độ Manual :'}</H3>
                    </View>
                    <View style={{ margin: 40 }}>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                            <Row>
                                <Text style={{ color: '#000000' }}>Máy Bơm : </Text>
                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>{this.state.sttmb}</Text>
                            </Row>
                            <Switch
                                onValueChange={this._handleToggleSwitchMB}
                                value={this.state.switchValueMB}
                            />
                        </Row>
                    </View>
                    <View style={{ margin: 40 }}>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                            <Row>
                                <Text style={{ color: '#000000' }}>Đèn Led : </Text>
                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>{this.state.sttled}</Text>
                            </Row>
                            <Switch
                                onValueChange={this._handleToggleSwitchLED}
                                value={this.state.switchValueLED}
                            />
                        </Row>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#000000' }}>{'Độ Ẩm : '}</Text>
                        <Picker selectedValue={this.state.datuoiMN} onValueChange={this._updateDAMN}>
                            <Picker.Item label="20 %" value="20" />
                            <Picker.Item label="40 %" value="40" />
                            <Picker.Item label="60 %" value="60" />
                            <Picker.Item label="80 %" value="80" />
                            <Picker.Item label="100 %" value="100" />
                        </Picker>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#000000' }}>{'Nhiệt Độ : '}</Text>
                        <Picker selectedValue={this.state.ndtuoiMN} onValueChange={this._updateNDMN}>
                            <Picker.Item label="20 %" value="20" />
                            <Picker.Item label="40 %" value="40" />
                            <Picker.Item label="60 %" value="60" />
                            <Picker.Item label="80 %" value="80" />
                            <Picker.Item label="100 %" value="100" />
                        </Picker>
                    </View>
                </ScrollView>
            </View>

        )
    }
}
