import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from "@react-navigation/native"
const { width, height } = Dimensions.get('window');

export default function MenuItem(props) {
    const {colors}=useTheme()
  return (
    <TouchableOpacity onPress={props.butonPress} activeOpacity={0.6} 
        style={[styles.menuItemContainer,{borderBottomColor:colors.border}]}>
        <View style={{width:20}} >
            <Icon name={props.icon} size={16} color="#1d3557"/>
        </View>
        <Text style={[styles.menuItem, {color:colors.text}]}>{props.text}</Text>
    </TouchableOpacity>
    );
}
    const styles = StyleSheet.create({
        menuItemContainer:{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            borderBottomColor:'#e8e8e8',
            borderBottomWidth:1,
            width:width*0.6,
            marginVertical:5,
            paddingVertical:8,
            marginHorizontal:20
        },
        menuItem:{
            fontFamily:'GoogleSans-Regular',
            fontSize:14,
            paddingHorizontal:0,
            textAlignVertical:'bottom',
            paddingLeft:5
            
        },
    })