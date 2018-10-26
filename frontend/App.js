import React, { Component } from 'react';
import { AppStackNavigator } from './src/Navigation/Stack';

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <AppStackNavigator/>
        );
    }
}
