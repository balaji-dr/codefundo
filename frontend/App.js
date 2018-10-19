import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';
import {
    initialize,
    isSuccessfulInitialize,
    startDiscoveringPeers,
    stopDiscoveringPeers,
    unsubscribeFromPeersUpdates,
    unsubscribeFromConnectionInfoUpdates,
    subscribeOnConnectionInfoUpdates,
    subscribeOnPeersUpdates,
    connect,
    disconnect,
    createGroup,
    removeGroup,
    getAvailablePeers,
    sendFile,
    receiveFile,
    getConnectionInfo
} from 'react-native-wifi-p2p';
import { PermissionsAndroid } from 'react-native';

type Props = {};
export default class App extends Component<Props> {
    state = {
        devices: []
    };

    componentDidMount() {
        initialize();
        isSuccessfulInitialize()
            .then(status => console.log(status));
        startDiscoveringPeers()
            .then(() => console.log('Sucessfull'))
            .catch(err => console.log(err));

        subscribeOnPeersUpdates(({ devices }) => this.handleNewPeers(devices));
        subscribeOnConnectionInfoUpdates(this.handleNewInfo);
    }

    componentWillUnmount() {
        unsubscribeFromConnectionInfoUpdates((event) => console.log('unsubscribeFromConnectionInfoUpdates', event));
        unsubscribeFromPeersUpdates((event) => console.log('unsubscribeFromPeersUpdates', event));
    }

    handleNewInfo = (info, sceondParam) => {
        console.log(64646776467, info);
    };

    handleNewPeers = (peers) => {
        console.log(754862162442324, peers);
        this.setState({ devices: peers });
    };

    connectToFirstDevice = () => {
        console.log(this.state.devices[0]);
        connect(this.state.devices[0].deviceAddress)
            .then(() => console.log('Successfully connected'))
            .catch(err => console.error('Something gone wrong. Details: ', err));
    };

    disconnectFromDevice = () => {
        disconnect()
            .then(() => console.log(2423435423, 'Successfully disconnected'))
            .catch(err => console.error(2423435423, 'Something gone wrong. Details: ', err));
    };

    onCreateGroup = () => {
        createGroup()
            .then(() => console.log('Group created successfully!'))
            .catch(err => console.error('Something gone wrong. Details: ', err));
    };

    onRemoveGroup = () => {
        removeGroup()
            .then(() => console.log('Currently you don\'t belong to group!'))
            .catch(err => console.error('Something gone wrong. Details: ', err));
    };

    onStopInvestigation = () => {
        stopDiscoveringPeers()
            .then(() => console.log('Stopping of discovering was successful'))
            .catch(err => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details`, err));
    };

    onStartInvestigate = () => {
        startDiscoveringPeers()
            .then(status => console.log(33333333, `Status of discovering peers: ${status}`))
            .catch(err => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`));
    };

    onGetAvailableDevices = () => {
        getAvailablePeers()
            .then(peers => console.log(peers));
    };

    onSendFile = () => {
        //const url = '/storage/sdcard0/Music/Rammstein:Amerika.mp3';
        const url = '/storage/emulated/0/Music/Bullet For My Valentine:Letting You Go.mp3';
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Access to read',
                'message': 'READ_EXTERNAL_STORAGE'
            }
        )
            .then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the camera")
                } else {
                    console.log("Camera permission denied")
                }
            })
            .then(() => {
                return PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': 'Access to write',
                        'message': 'WRITE_EXTERNAL_STORAGE'
                    }
                )
            })
            .then(() => {
                return sendFile(url)
                    .then(() => console.log('File sent successfully'))
                    .catch(err => console.log('Error while file sending', err));
            })
            .catch(err => console.log(err));
    };

    onReceiveFile = () => {
        receiveFile()
            .then(() => console.log('File received successfully'))
            .catch(err => console.log('Error while file receiving', err))
    };

    onGetConnectionInfo = () => {
        getConnectionInfo()
            .then(info => console.log(info));
    };

    render() {
        return (
            <View style={styles.container}>
                {/*<Button*/}
                    {/*title="Connect"*/}
                    {/*onPress={this.connectToFirstDevice()}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*title="Disconnect"*/}
                    {/*onPress={this.disconnectFromDevice}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*title="Create group"*/}
                    {/*onPress={this.onCreateGroup}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*title="Remove group"*/}
                    {/*onPress={this.onRemoveGroup}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*title="Investigate"*/}
                    {/*onPress={this.onStartInvestigate}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*title="Prevent Investigation"*/}
                    {/*onPress={this.onStopInvestigation}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*title="Get Available Devices"*/}
                    {/*onPress={this.onGetAvailableDevices()}*/}
                {/*/>*/}
                <Button
                    title="Get connection Info"
                    onPress={this.onGetConnectionInfo()}
                />
                {/*<Button*/}
                    {/*title="Send file"*/}
                    {/*onPress={this.onSendFile}*/}
                {/*/>*/}
                {/*<Button*/}
                    {/*title="Receive file"*/}
                    {/*onPress={this.onReceiveFile}*/}
                {/*/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
