import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right, Thumbnail, Button, Icon } from "native-base";
import { material, human } from 'react-native-typography';
import Ionicons from "react-native-vector-icons/Ionicons";

import {deleteById, myIssuesURL} from "../../Secondary/ServerEndpoints";
import axios from "axios/index";



export default class MyIssues extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedList: [
                {issueId: 123, title: "Need help in ceg", location: "Alwarpet, Chennai", color: "red", category: "Food", timestamp: "12/12/2017 8:30 AM", status: "Very Urgent", description:"We need food at the gandhi mandapam due to the floods"},
                {issueId: 124, title: "Need help in ceg", location: "Alwarpet, Chennai", color: "yellow", category: "Food", timestamp: "12/12/2017 8:30 AM", status: "Urgent", description:"We need food at the gandhi mandapam due to the floods"},
                {issueId: 143, title: "Need help in ceg", location: "Guindy", color: "red", category: "red", timestamp: "12/12/2017 8:30 AM", status: "Urgent", description:"We need food at the gandhi mandapam due to the floods"}
            ]

        };
    }

    static navigationOptions = ({ navigation  }) => ({
            title: "Survivor Call",
            headerTransparent: false,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#C92627'
            },
        }
    );


    componentDidMount(){
        axios.get(myIssuesURL+"1234567890").then((response) => {
            console.log(response.data);
            this.setState({feedList: response.data});
        });
    }

    closeIssue(issueId){
        axios.get(deleteById+issueId).then((response) => {
            console.log(response.data);
        }).then(()=>{
            axios.get(myIssuesURL+"1234567890").then((response) => {
                console.log(response.data);
                this.setState({feedList: response.data});
                alert("Successfully closed your issue!");
        });
    });
    }



    _generateFeed(item){
        return(
            <Card style={{flex: 0}}>
                <CardItem>
                    <Left>
                        <Body>
                        <Text style={{fontSize: 20}}>{this.state.feedList[0].title}</Text>
                        <Text note>{this.state.feedList[0].category}</Text>
                        <Text note>{this.state.feedList[0].timestamp}</Text>
                        </Body>
                    </Left>
                    <Thumbnail source={{uri: 'https://cdn3.iconfinder.com/data/icons/medical-and-heathcare/512/medical_healthcare_medecine_2-512.png'}}/>
                </CardItem>
                <CardItem>
                    <Body>
                    <Text style={{fontSize:15}}>
                        {this.state.feedList[0].description}
                    </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent textStyle={{color: '#87838B'}}>
                            <Ionicons name="md-compass" size={25}/>
                            <Text style={{marginLeft: 2}}>{this.state.feedList[0].location}</Text>
                        </Button>
                        <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.closeIssue(item._id) }>
                            <Ionicons name="md-close" size={25}/>
                            <Text style={{marginLeft: 5}}>Close Issue</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    render() {
        return (
            <ScrollView>
                <Content padder>
                    <FlatList data={this.state.feedList}
                              renderItem={({item, index}) => this._generateFeed(item) }/>
                </Content>
            </ScrollView>
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
