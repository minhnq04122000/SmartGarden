import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Dimensions } from 'react-native';
import { LineChart } from 'react-native-line-chart'

export default function StaticScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            data: [20, 45, 28, 80, 99, 43]
        }]
    }
    return (
        <View>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
        </View>
    )
}
const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}
