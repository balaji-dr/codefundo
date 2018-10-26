import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { DirectLine } from "botframework-directlinejs";
import { Container, Header, Content, Card, CardItem, Button } from "native-base";

const directLine = new DirectLine({
    secret: "a7H6qqYvkqM.cwA.rrs.sGCtbC0MEBK2V3hxYj3s-LuRXCNBfvK5F2Lh4_jK4DI"
});
const botMessageToGiftedMessage = botMessage => ({
    ...botMessage,
    _id: botMessage.id,
    createdAt: botMessage.timestamp,
    user: {
        _id: 2,
        name: "React Native",
        avatar:
            "https://cdn.iconscout.com/public/images/icon/free/png-512/avatar-user-business-man-399587fe24739d5a-512x512.png"
    }
});
function giftedMessageToBotMessage(message) {
    return {
        from: { id: 1, name: "Survivor" },
        type: "message",
        text: message.text
    };
}
export default class App extends React.Component {
    state = {
        messages: []
    };
    constructor(props) {
        super(props);
        directLine.activity$.subscribe(botMessage => {
            const newMessage = botMessageToGiftedMessage(botMessage);
            this.setState({ messages: [newMessage, ...this.state.messages] });
        });
    }


    static navigationOptions = ({ navigation  }) => ({
            title: "Say Hi",
            headerTransparent: false,
        }
    );


    onSend = messages => {
        this.setState({ messages: [...messages, ...this.state.messages] });
        messages.forEach(message => {
            directLine
                .postActivity(giftedMessageToBotMessage(message))
                .subscribe(() => console.log("success"), () => console.log("failed"));
        });
    };

    clear(){
        directLine.end()
    }
    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    user={{
                        _id: 1
                    }}
                    messages={this.state.messages}
                    onSend={this.onSend}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
