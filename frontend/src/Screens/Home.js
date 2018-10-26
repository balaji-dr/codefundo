import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Dimensions, AsyncStorage} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import { material, human } from 'react-native-typography';
import {getData} from "../Secondary/Methods";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,

        };
    }

    isSignedIn = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('logged_in')
                .then(res => {
                    if (res !== null) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch(err => reject(err));
        });
    };


    static navigationOptions = ({ navigation  }) => ({
            title: "Survivor Call",
            headerTransparent: false,
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: '#A04000'
            },
        }
    );

    async componentDidMount(){
        this.isSignedIn()
            .then(response => this.setState({ signedIn: response, checkedSignIn: true }))
            .catch(error => alert("Oops! Something broked"));

        // getData("http://40.118.4.105:4002/surviva/getHelp?sort_by=desc(emotion)")

    }


    check_and_proceed(){
        const { checkedSignIn, signedIn } = this.state;

        if(signedIn){
            this.props.navigation.navigate("HelpForm")
        }
        else{
            this.props.navigation.navigate("Login")
        }





    }

    render() {
        return (
            <Container>
                <Content padder>
                        <View style={{flexDirection: 'row', width: 200}}>
                            <Card style={{width: 166.5}}>
                                <CardItem button onPress={() => this.check_and_proceed()} style={{backgroundColor: "#C92627"}}>
                                    <Body>
                                    <Image source={{uri: "https://cdn3.iconfinder.com/data/icons/medical-and-heathcare/512/medical_healthcare_medecine_2-512.png"}}
                                           style={{width: 150, height: 150, alignSelf: 'center'}} />
                                    <Text style={[{fontSize:20, alignSelf: 'center' }, material.title]}>
                                        Need Help
                                    </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{width: 166.5}}>
                                <CardItem button onPress={() => this.props.navigation.navigate("Feed")} style={{backgroundColor: "#C92627"}}>
                                    <Body>
                                    <Image source={{uri: "https://mbtskoudsalg.com/images/helping-hand-png-4.png"}}
                                           style={{width: 150, height: 150, alignSelf: 'center'}} />
                                    <Text style={[{fontSize:20, alignSelf: 'center' }, material.title]}>
                                        Help Others
                                    </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>

                        <Card>
                            <CardItem button onPress={() => this.props.navigation.navigate("ChatBot")} style={{backgroundColor: "#000000"}}>
                                <Body>
                                <Image source={{uri: "https://www.materialui.co/materialIcons/communication/chat_white_192x192.png"}}
                                       style={{width: 150, height: 150, alignSelf: 'center'}} />
                                <Text style={[{fontSize:20, alignSelf: 'center' }, material.titleWhite]}>
                                    Chat Assist
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>

                    <View style={{flexDirection: 'row', width: 200}}>
                        <Card style={{width: 166.5}}>
                            <CardItem button onPress={() => this.props.navigation.navigate("Victim")} style={{backgroundColor: "#0CA200"}}>
                                <Body>
                                <Image source={{uri: "https://www.ukfiretraining.com/uploads/images/icons/unique-evacuation-issues.png"}}
                                       style={{width: 150, height: 150, alignSelf: 'center'}} />
                                <Text style={[{fontSize:20, alignSelf: 'center' }, material.title]}>
                                    Rescue Mode
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{width: 166.5}}>
                            <CardItem button onPress={() => this.props.navigation.navigate("Squad")} style={{backgroundColor: "#FFFFFF"}}>
                                <Body>
                                <Image source={{uri: "https://www.shareicon.net/data/512x512/2015/11/06/667992_users_512x512.png"}}
                                       style={{width: 150, height: 150, alignSelf: 'center'}} />
                                <Text style={[{fontSize:20, alignSelf: 'center' }, material.title]}>
                                    Search Squad
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
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
