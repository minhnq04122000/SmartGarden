import React, { useState, Component } from 'react';
import { View, StyleSheet, Text, Button, Dimensions } from 'react-native';
import { LineChart } from 'react-native-line-chart'
import io from 'socket.io-client';
const staticArr = []
var e;
export default class StaticScreen extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.state = {
            doamdat: '',
        }
        //socket

        this.socket = io('http://192.168.1.10:3000/', {
            transports: ['websocket'], jsonp: false
        });
        this.socket.connect();

        this.socket.on('sv-send-data', function (data) {
            e.setState({
                doamdat: data.dad,
            })
        })
    }
    render() {
        staticArr.push(parseInt(this.state.doamdat))
        console.log(staticArr)

        const screenWidth = Dimensions.get('window').width
        const data = {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00'],
            datasets: [{
                data: [20, 40, 60, 80, 100, 120]
            }]
        }
        return (
            <View style={{ padding: 30 }}>
                <LineChart
                    data={data}
                    width={350}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View>
        )
    }
}
const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
