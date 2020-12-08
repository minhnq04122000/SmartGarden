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
import DatePicker from 'react-native-date-picker'

import io from 'socket.io-client';
var e;
var stt;
export default class SettingScreen extends Component {

    constructor(props) {
        super(props);
        e = this;
        this.socket = io('http://192.168.1.10:3000/', {
            transports: ['websocket'], jsonp: false
        });
        this.socket.connect();
        this.state = {
            datadevice: {},
            switchValueMB: Boolean,
            switchValueLED: Boolean,
            switchValueSTT: Boolean,
            sttled: '',
            sttmb: '',
            ndtuoiAT: '',
            datuoiATmin: '',
            datuoiATmax: '',
            ndtuoiMN: '',
            congsuatMN: '',
            mucnuoc: '',
            chieucaobe: '',
            isVisible: false

        }
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



    // _updateNDAT = (ndtuoiAT) => {
    //     this.setState({ ndtuoiAT: ndtuoiAT })
    //     this.socket.emit('client-send-ndtuoiAT', ndtuoiAT)
    // }
    _updateNDMN = (ndtuoiMN) => {
        this.setState({ ndtuoiMN: ndtuoiMN })
        this.socket.emit('client-send-ndtuoiMN', ndtuoiMN)
    }

    // _updateDAAT = (datuoiAT) => {
    //     this.setState({ datuoiAT: datuoiAT })
    //     this.socket.emit('client-send-datuoiAT', datuoiAT)
    // }
    _updateDAMN = (datuoiMN) => {
        this.setState({ datuoiMN: datuoiMN })
        this.socket.emit('client-send-datuoiMN', datuoiMN)
    }
    SENDCHIEUCAOBE() {
        this.socket.emit('client-send-chieucaobe', this.state.chieucaobe)
        fetch('http://192.168.1.10:3000/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    datadevice: responseJson
                });
            })

    }
    SENDNHIETDOAUTO() {
        this.socket.emit('client-send-ndtuoiAT', this.state.ndtuoiAT)
        fetch('http://192.168.1.10:3000/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    datadevice: responseJson
                });
            })

    }
    SENDDOAMAUTO() {
        var doamAT = {
            datuoiATmin: this.state.datuoiATmin,
            datuoiATmax: this.state.datuoiATmax
        }
        if (this.state.datuoiATmin.length > 0 || this.state.datuoiATmax.length > 0) {
            this.socket.emit('client-send-datuoiAT', doamAT)
        }
        fetch('http://192.168.1.10:3000/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    datadevice: responseJson
                });
            })
    }
    SENDMUCNUOC() {
        this.socket.emit('client-send-mucnuoc', this.state.mucnuoc)
        fetch('http://192.168.1.10:3000/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    datadevice: responseJson
                });
            })
    }
    _handleToggleSwitchMB = () => {
        this.setState({
            switchValueMB: !this.state.switchValueMB
        })
        this.socket.emit('client-send-MB', !this.state.switchValueMB)
        fetch('http://192.168.1.10:3000/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    datadevice: responseJson
                });
            })
    }
    _handleToggleSwitchLED = () => {
        this.setState({
            switchValueLED: !this.state.switchValueLED
        })
        this.socket.emit('client-send-STTLED', !this.state.switchValueLED)
        fetch('http://192.168.1.10:3000/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    datadevice: responseJson
                });
            })
    }

    _handleToggleSwitchSTT = () => {
        this.setState({
            switchValueSTT: !this.state.switchValueSTT,
        })
        this.socket.emit('client-send-stt', !this.state.switchValueSTT)
        fetch('http://192.168.1.10:3000/', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    datadevice: responseJson
                });
            })
    }
    handlePicker = () => {
        this.setState({
            isVisible
        })
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
                    switchValueSTT: responseJson.switchValueSTT
                });
            })
    }
    checkstt() {
        if (this.state.switchValueSTT == true) {
            stt = "Manual"
        }
        if (this.state.switchValueSTT == false) {
            stt = "Auto"
        }

    }

    render() {
        this.checkstt()
        return (
            <View >
                <ScrollView>
                    <View style={{ alignItems: 'center', flex: 1, padding: 30 }}>
                        <Title style={{ color: '#000000', fontWeight: "bold" }}>{('Cài Đặt')}</Title>
                    </View>
                    <View style={{ marginLeft: 40, marginBottom: 40, marginRight: 40 }}>
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#000000' }}>{'Trạng thái hoạt động : '}</Text>
                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>{stt}</Text>
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
                        <Row style={{ justifyContent: 'space-between' }}>
                            <TextInput
                                placeholder={this.state.datadevice.nhietdotuoi}
                                keyboardType='numeric'
                                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
                                onChangeText={(ndtuoiAT) => this.setState({ ndtuoiAT })}
                                value={this.state.ndtuoiAT}
                            />
                            <Button style={{ width: 80, justifyContent: 'center', margin: 10 }} rounded success onPress={() => this.SENDNHIETDOAUTO()}>
                                <Text>Gửi</Text>
                            </Button>
                        </Row>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#000000' }}>{'Độ Ẩm tưới cây : '}</Text>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Từ</Text>
                            <TextInput
                                placeholder={this.state.datadevice.doammin}
                                keyboardType='numeric'
                                style={{ height: 40, width: 67, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
                                onChangeText={(datuoiATmin) => this.setState({ datuoiATmin })}
                                value={this.state.datuoiATmin}
                            />
                            <Text style={{ fontWeight: 'bold' }}>Đến</Text>
                            <TextInput
                                placeholder={this.state.datadevice.doammax}
                                keyboardType='numeric'
                                style={{ height: 40, width: 67, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
                                onChangeText={(datuoiATmax) => this.setState({ datuoiATmax })}
                                value={this.state.datuoiATmax}
                            />
                            <Button style={{ width: 80, justifyContent: 'center', margin: 10, alignItems: 'flex-end' }} rounded success onPress={() => this.SENDDOAMAUTO()}>
                                <Text>Gửi</Text>
                            </Button>
                        </Row>
                        <Row style={{ justifyContent: 'center' }}>

                        </Row>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#000000' }}>{'Nhập Chiều Cao Của Bể : '}</Text>
                        <Row>
                            <TextInput
                                placeholder={this.state.datadevice.docaobe}
                                keyboardType='numeric'
                                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10 }}
                                onChangeText={(chieucaobe) => this.setState({ chieucaobe })}
                                value={this.state.chieucaobe}
                            />
                            <Button style={{ width: 80, justifyContent: 'center', margin: 10 }} rounded success onPress={() => this.SENDCHIEUCAOBE()}>
                                <Text>Gửi</Text>
                            </Button>
                        </Row>

                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40 }}>
                        <Text style={{ color: '#000000' }}>{'Nhập Mực Tối Thiểu : '}</Text>
                        <Row>
                            <TextInput
                                placeholder={this.state.datadevice.mucnuoc}
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
                    <View style={{ margin: 40 }}>
                        <H3 style={{ fontWeight: 'bold' }}>{'Chế Độ Manual :'}</H3>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40, marginBottom: 40 }}>
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
                    <View style={{ marginLeft: 40, marginRight: 40, marginBottom: 80 }}>
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

                </ScrollView>
            </View>

        )
    }
}
