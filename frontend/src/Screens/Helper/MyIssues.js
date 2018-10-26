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
                        <Text style={{fontSize: 20}}>{item.probTitle}</Text>
                        <Text note>{item.probType}</Text>
                        <Text note>{item.time}</Text>
                        </Body>
                    </Left>
                    <Thumbnail source={{uri: 'https://png.pngtree.com/svg/20161124/flood_and_water_logging_972327.png'}}/>
                </CardItem>
                <CardItem>
                    <Body>
                    <Text style={{fontSize:15}}>
                        {item.probDesc}
                    </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent textStyle={{color: '#87838B'}}>
                            <Ionicons name="md-compass" size={25}/>
                            <Text style={{marginLeft: 2}}>{item.location}</Text>
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
