import React from 'react'
import { Text } from 'react-native'
import { View, Dimensions, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
export default function HeaderBackLayout({butonPress,butonColor,pageName}) {
    return (
    <View style={{width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'space-between',alignItems:'center', paddingHorizontal:15, paddingVertical:5}} >
        <TouchableOpacity style={{  flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'}} onPress={butonPress} >
            <Icon name="chevron-back-outline" size={30} color={butonColor?butonColor:"#fff" }/> 
        </TouchableOpacity>
        <Text style={{fontFamily:'GoogleSans-Medium', color:butonColor?butonColor:"#fff", fontSize:16}} >{pageName}</Text>
        <Icon name="help-circle-outline" size={30} color={butonColor?butonColor:"#fff" }/> 
    </View>
    )
}
