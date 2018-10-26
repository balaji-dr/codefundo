import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Button} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { material, human } from 'react-native-typography';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import {Select, Option} from "react-native-chooser";
import axios from "axios";


import {postData} from "../../Secondary/Methods";
import {AddHelp} from "../../Secondary/ServerEndpoints";

export default class HelpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            probTitle:'',
            probDesc: '',
            probType: '',
            location: '',
            contact:'1234567890',
            victimName:'Admin Tester',
            status: 'true'
        };
    }

    static navigationOptions = ({ navigation  }) => ({
            title: "Need Help",
            headerTransparent: false,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#C92627'
            },
        }
    );

    register_help() {
        if(this.state.probTitle === '' || this.state.probType === '' || this.state.probDesc === '' || this.state.location === ''){
            alert("empty fields");
        }
        else{
            axios.post(AddHelp,this.state).then((response) => {
                console.log(response.data);
                if (response.data.status === 'true'){
                    alert("Successfully posted the Issue.");
                    this.props.navigation.navigate("Home");
                }
                else{
                    alert("Unsuccessful in connecting the server.");
                }
            })
        }
    }

    onSelect(value, label) {
        this.setState({probType : value});
    }

    render() {
        return (
            <Container>
                <Content padder>
                <Text style={[human.footnote,{fontSize:19, marginTop: 10}]}>Title of the Issue</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(probTitle) =>this.setState({probTitle})}
                    value={this.state.text}
                />
                <Text style={[human.footnote,{fontSize:19, marginTop: 10}]}>Issue Description</Text>
                <TextInput
                    style={{height: 100, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(probDesc) =>this.setState({probDesc})}
                    multiline={true}
                    numberOfLines={4}
                    autoCapitalize = 'none'
                    value={this.state.description}
                />

                <Text style={[human.footnote,{fontSize:19, marginTop: 10}]}>Issue Category</Text>
                <Select
                    onSelect = {this.onSelect.bind(this)}
                    defaultText  = {this.state.probType}
                    style = {{borderWidth : 1, borderColor : "black", width: 200}}
                    textStyle = {{}}
                    optionListStyle = {{backgroundColor : "#F5FCFF"}}
                >
                    <Option  value = "shelter">Shelter</Option>
                    <Option value = "food">Food</Option>
                    <Option value = "electricity">Electricity</Option>
                    <Option value = "transportation">Transportation</Option>
                    <Option value = "human_resource">Human Resource</Option>

                </Select>
                    <Text style={[human.footnote,{fontSize:19, marginTop: 10}]}>Location</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(location) =>this.setState({location})}
                        autoCapitalize = 'none'
                        value={this.state.text}
                    />

                    <Button  onPress={() => this.register_help() } style={{alignSelf:'center', width: 90, marginTop: 10}}><Text style={{alignSelf:'center', marginLeft:22}}>Submit</Text></Button>
                    <Button  onPress={() => this.props.navigation.navigate("MyIssues") } style={{alignSelf:'center', width: 90, marginTop: 10}}><Text style={{alignSelf:'center', marginLeft:15}}>My Issues</Text></Button>
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
