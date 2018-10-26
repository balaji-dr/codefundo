import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {human} from "react-native-typography/dist/index";
import { Container, Header, Content, Card, CardItem, Body, Button } from "native-base";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

            username: '',
            password: ''
        };
    }

    static navigationOptions = ({ navigation  }) => ({
            title: "Login",
            headerTransparent: false,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#A04000'
            },
        }
    );

    login(){
        if (this.state.username==="admin" && this.state.password==="admin"){
            this.props.navigation.navigate("HelpForm")
        }
        else{
            alert("Please enter the credentials correctly!")
        }
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Text style={[human.footnote,{fontSize:19, marginTop: 10}]}>Username</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(username) =>this.setState({username})}
                        value={this.state.username}
                        placeholder="admin"
                        autoCapitalize = 'none'
                    />
                    <Text style={[human.footnote,{fontSize:19, marginTop: 10}]}>Password</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(password) =>this.setState({password})}
                        value={this.state.password}
                        placeholder="admin"
                        autoCapitalize = 'none'
                        keyboardType="default"
                    />
                    <Button  onPress={() => this.login() } style={{alignSelf:'center', width: 90, marginTop: 10}}><Text style={{alignSelf:'center', marginLeft:22}}>Submit</Text></Button>

                    <Text style={[human.footnote,{fontSize:14, marginTop: 90}]}>Every user have to register to
                        ask for help and provide details such as Mobile number and name etc. By default, admin is registered with mobile number as 1234567890 and name as Admin Tester.</Text>
                </Content>
            </Container>
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
