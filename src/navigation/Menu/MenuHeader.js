import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from "@react-navigation/native"
const { width, height } = Dimensions.get('window');

export default function MenuHeader(props) {
    const {colors}=useTheme()
  return (
    <View style={[styles.container,{backgroundColor:colors.primary}]} >
        <TouchableOpacity activeOpacity={0.2} onPress={props.modalPress} style={styles.closeButton} >
            <Icon name="times" size={25} color="#fff" />
        </TouchableOpacity>  
        <Image style={styles.image}  source={require('../../../assets/books-logo.png')} />
        <Text style={styles.title}>e-kitaphane</Text>
        <Text style={styles.description} >en sevdiğiniz kitaplar cebinizde</Text>
        <Text style={styles.description} >sürüm V2.2</Text>
    </View>
    );
}
    const styles = StyleSheet.create({
        container:{
            flexDirection:'column', 
            justifyContent:'flex-start', 
            alignItems:'center', 
            backgroundColor:'red', 
            width:width*0.7, 
            padding:10, 
            marginBottom:20,
        },
        menuItemContainer:{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            width:width*0.7,
            borderBottomColor:'#e8e8e8',
            borderBottomWidth:1,
            paddingVertical:3,
            marginVertical:5,
            marginHorizontal:20
        },
        image: {
            width:60,
            height:60,
           
            borderColor:'#f1f1f1'
        },
        title:{
            fontFamily:'GoogleSans-Bold', 
            fontSize:32, 
            color:'#fff', 
            paddingTop:5
        },
        description:{
            fontFamily:'GoogleSans-Regular', 
            fontSize:13, 
            color:'#fff', 
            paddingBottom:5
        },
        closeButton:{ 
            justifyContent:'flex-end', 
            alignItems:'flex-end', 
            width:'100%'
        },
    })