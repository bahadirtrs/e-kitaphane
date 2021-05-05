import React from 'react'
import {View, Dimensions, TouchableOpacity,Text,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default function PageHeaderBackLayout({butonPress,butonColor,title,textColor,backgrounColor,type, pageSave, deleteNumber}) {
    return (
    <View style={[styles.container,{backgroundColor:backgrounColor}]} >
        <TouchableOpacity  style={styles.buttonStyle} onPress={butonPress} >
            <Icon name="chevron-back-outline" size={25} color={butonColor?butonColor:"#fff" }/> 
        </TouchableOpacity>
        <Text style={[styles.buttonText, {color:butonColor?butonColor:"#fff"}]}>{title}</Text>
        <Icon name="ellipsis-horizontal-outline" size={25} color={butonColor?butonColor:"#fff" }/> 
    </View>
    )
}
const styles = StyleSheet.create({
    container:{ 
        width:Dimensions.get('screen').width, 
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center', 
        paddingHorizontal:10, 
        paddingBottom:5,
        margin:0
    },
    buttonStyle:{ 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    buttonText:{
        fontFamily:'GoogleSans-Medium', 
        fontSize:14, 
        paddingLeft:0,
        textAlign:'center',
    },
    saveButton:{ 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingHorizontal:5
    }
})
