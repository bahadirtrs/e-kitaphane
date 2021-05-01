import React from 'react'
import { Text } from 'react-native'
import { View, Dimensions, TouchableOpacity,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
export default function HeaderBackLayout({butonPress,butonPressRight,butonColor,pageName}) {
    return (
    <View style={styles.container} >
        <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={butonPress} >
            <Icon name="chevron-back-outline" size={30} color={butonColor?butonColor:"#fff" }/> 
        </TouchableOpacity>
        <Text style={
            [styles.pageNameStyle,{color:butonColor?butonColor:"#fff", }]}>{pageName}</Text>
        <TouchableOpacity activeOpacity={0.9}style={styles.buttonStyle} onPress={butonPressRight} >
            <Icon name="help-circle-outline" size={30} color={butonColor?butonColor:"#fff" }/> 
        </TouchableOpacity>
    </View>
    )
}
const styles = StyleSheet.create({
    container:{ 
        zIndex:1, 
        width:Dimensions.get('screen').width, 
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center', 
        paddingHorizontal:15, 
        paddingVertical:5
    },
    buttonStyle:{  
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'flex-end'
    },
    pageNameStyle:{
        fontFamily:'GoogleSans-Medium', 
        fontSize:16}
})
