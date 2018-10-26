import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static navigationOptions = ({ navigation  }) => ({
            title: "Survivor Call",
            headerTransparent: false,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#A04000'
            },
        }
    );

    render() {
        return (
            <View>
                <Text style={styles.red}>just red</Text>
                <Text style={styles.bigblue}>just bigblue</Text>
                <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
                <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});
