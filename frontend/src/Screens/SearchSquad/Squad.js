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
                <Text>Coming Soon</Text>
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
