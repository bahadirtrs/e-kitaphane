import React from 'react'
import {View, Dimensions, TouchableOpacity,Text,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default function PageHeaderBackLayout({butonPress,butonColor,title,textColor,backgrounColor,type, pageSave, deleteNumber}) {
    return (
    <View style={[styles.container,{backgroundColor:backgrounColor}]} >
        <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={butonPress} >
            <Icon name="chevron-back-outline" size={30} color={butonColor?butonColor:"#fff" }/> 
            <Text style={[styles.buttonText, {color:textColor}]} >{title}</Text>
        </TouchableOpacity>
        { type=='pdf'? 
            <View style={{flexDirection:'row'}} >
                <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={deleteNumber} >
                    <Icon name="trash-outline" size={22} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={pageSave} >
                    <Icon name="bookmark-outline" size={25} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
            </View>
            :null
        }
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
        paddingLeft:15,
        minWidth:'70%',
        maxWidth:'70%',
        textAlign:'left'
    },
    saveButton:{ 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingHorizontal:5
    }
})
