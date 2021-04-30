import React from 'react'
import {View, Dimensions, TouchableOpacity,Text,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
export default function PageHeaderBackLayout({butonPress,butonColor,title,backgrounColor,type, pageSave}) {
    return (
    <View style={[styles.container,{backgroundColor:backgrounColor}]} >
        <TouchableOpacity style={styles.buttonStyle} onPress={butonPress} >
            <Icon name="chevron-back-outline" size={30} color={butonColor?butonColor:"#fff" }/> 
            <Text style={styles.buttonText} >{title}</Text>
        </TouchableOpacity>
        { type=='pdf'? 
            <View style={{flexDirection:'row'}} >
                <TouchableOpacity style={styles.saveButton} onPress={pageSave} >
                    <Icon name="save-outline" size={25} color={butonColor?butonColor:"#fff" }/> 
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
        paddingVertical:0
    },
    buttonStyle:{ 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    buttonText:{
        fontFamily:'GoogleSans-Medium', 
        fontSize:16, 
        paddingLeft:15
    },
    saveButton:{ 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingHorizontal:5
    }
})
