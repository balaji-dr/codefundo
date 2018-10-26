import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Squad extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static navigationOptions = ({ navigation  }) => ({
            title: "Victim",
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
                <Text>In this module, the victim who got stuck in an area can turn on the wifi hotspot so
                    that they are visible to the search squad. Due to time constraints we couldn't complete the module.</Text>
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
