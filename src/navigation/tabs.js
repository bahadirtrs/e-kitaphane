import React from "react";
import { SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../rotues/Home'
import Support from '../rotues/Support'
import SearchScreen from "../rotues/Search"
import MyLibrary from '../rotues/Library/MyLibrary'
import Notification from '../rotues/Notification'
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native"


const Tab = createBottomTabNavigator();
const tabOptions = {
    showLabel: true,
    labelStyle:{fontFamily:'GoogleSans-Regular',},
    style: {
       
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:5,
        height:60,
        
    },
}

const Tabs = () => {
    const {colors}=useTheme()
    return (
        <>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? '#118ab2' :colors.text;

                    switch (route.name) {
                        case "Anasayfa":
                            return (<Icon  name={'apps-outline'} size={25} color={tintColor}/>)
                        case "Arama":
                            return (<Icon  name={'search-outline'} size={25} color={tintColor}/>)
                        case "Son Eklenenler":
                            return (<Icon  name={'newspaper-outline'} size={25} color={tintColor}/>)
                        case "Destek":
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
            <Tab.Screen name="Kütüphane" component={MyLibrary}/>
            <Tab.Screen name="Destek" component={Support}/>
            <Tab.Screen name="Son Eklenenler" component={Notification}/>
        </Tab.Navigator>
        <SafeAreaView backgroundColor={colors.card} />
        </>
    )
}

export default Tabs;