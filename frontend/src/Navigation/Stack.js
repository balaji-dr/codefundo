import {createStackNavigator} from "react-navigation";
import Home from "../Screens/Home";
import ViewProfile from "../Screens/Profile/ViewProfile";
import Feed from "../Screens/Helper/Feed";
import SingleItem from "../Screens/Helper/SingleItem";
import Victim from "../Screens/Victim/Victim";
import Login from "../Screens/Auth/Login";
import Register from "../Screens/Auth/Register";
import Squad from "../Screens/SearchSquad/Squad";
import HelpForm from "../Screens/Helper/HelpForm";
import ChatBot from "../Screens/Chat/ChatBot";
import MyIssues from "../Screens/Helper/MyIssues";

export const AppStackNavigator = createStackNavigator({
        Home: {
            screen: Home
        },
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        },
        Feed: {
            screen: Feed,
        },
        SingleItem: {
            screen: SingleItem,
        },
        HelpForm: {
            screen: HelpForm,
        },
        Profile:{
            screen: ViewProfile
        },
        Victim:{
            screen: Victim
        },
        Squad:{
            screen: Squad
        },
        ChatBot:{
            screen: ChatBot
        },
    MyIssues:{
            screen: MyIssues
    }
    },
    {
        initialRouteName: 'Home'
    });
