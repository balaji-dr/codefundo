import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right, Thumbnail, Button, Icon } from "native-base";
import { material, human } from 'react-native-typography';
import Ionicons from "react-native-vector-icons/Ionicons";
import call from 'react-native-phone-call'
import axios from "axios";

import {getData, postData} from "../../Secondary/Methods";
import {AddHelp, getAllHelp} from "../../Secondary/ServerEndpoints";

export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            feedList:[

            ]
        };
    }

    static navigationOptions = ({ navigation  }) => ({
            title: "Issue Feed",
            headerTransparent: false,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#C92627'
            },
        }
    );

    _onRefresh = () => {
        this.setState({refreshing: true});
        axios.get(getAllHelp).then((response) => {
            console.log(response.data);
            this.setState({feedList: response.data});
        });
    };

    componentDidMount(){
            axios.get(getAllHelp).then((response) => {
                console.log(response.data);
                this.setState({feedList: response.data});
            });
    }

    call(number){
        call({number:number , prompt: false}).catch(console.error)
    }


    getStatus(status){
        if(status === 'true'){
            return "Verified"
        }
        else{
            return "Not Verified"
        }
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
                        <Button transparent textStyle={{color: '#87838B'}}>
                            <Ionicons name="md-information-circle" size={25} color="red" />
                            <Text style={{marginLeft: 5}}>{this.getStatus(item.status)}</Text>
                        </Button>
                        <Button transparent textStyle={{color: '#87838B'}} >
                            <Ionicons name="md-call" size={25}/>
                            <Text style={{marginLeft: 5}} onPress={() => this.call(item.contact) }>Call</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
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
