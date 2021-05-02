import React from "react";
import { SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../rotues/Home'
import SearchScreen from "../rotues/Search"
import MyLibrary from '../rotues/Library/MyLibrary'

const Tab = createBottomTabNavigator();
const tabOptions = {
    showLabel: true,
    labelStyle:{fontFamily:'GoogleSans-Regular' },
    style: {
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:5,
        height:60,
    },
   
}

const Tabs = () => {
    return (
        <>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? '#1d3557' : '#333';

                    switch (route.name) {
                        case "Anasayfa":
                            return (<Icon  name={'apps-outline'} size={25} color={tintColor}/>)
                        case "Arama":
                            return (<Icon  name={'search-outline'} size={25} color={tintColor}/>)
                        case "Bildirimler":
                            return (<Icon  name={'notifications-outline'} size={25} color={tintColor}/>)
                        case "Mesajlar":
                            return (<Icon  name={'mail-outline'} size={25} color={tintColor}/>)
                        case "Kütüphane":
                            return (<Icon  name={'book-outline'} size={25} color={tintColor}/>)
                    }
                }
            })}
            tabBarOptions={tabOptions}
        >
            <Tab.Screen name="Anasayfa" component={Home}/>
            <Tab.Screen name="Arama" component={SearchScreen}/>
            <Tab.Screen name="Bildirimler" component={Home}/>
            <Tab.Screen name="Kütüphane" component={MyLibrary}/>
            <Tab.Screen name="Mesajlar" component={Home}/>
        </Tab.Navigator>
        <SafeAreaView backgroundColor='#fff' />
        </>
    )
}

export default Tabs;