import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Squad extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static navigationOptions = ({ navigation  }) => ({
            title: "Search Squad",
            headerTransparent: false,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#000000'
            },
        }
    );


    render() {
        return (
            <View style={styles.container}>
                <Text>This module can be accessed by the people who are given permission to search the area. By enabling the mobile hotspot,
                    they can search and communicate with the victims in the area.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
