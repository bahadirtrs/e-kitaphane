import React from 'react'
import { View, TextInput,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default function TwoInputText({value,onChangeText,placeholder,valueTwo,onChangeTextTwo,placeholderTwo}) {
    return (
        <View style={{width:'90%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
          <TextInput
            style={[styles.textInput, {fontSize:13, width:'46%', borderTopLeftRadius:8}]}
            placeholder={placeholder}
            placeholderTextColor={'#555'}
            value={value}
            onChangeText={onChangeText}
            textAlignVertical='auto'
            keyboardType={'email-address'}
            autoCapitalize={'words'}
          />
          <TextInput
            style={[styles.textInput, {fontSize:13,width:'47%', borderTopRightRadius:8}]}
            placeholder={placeholderTwo}
            placeholderTextColor={'#555'}
            value={valueTwo}
            onChangeText={onChangeTextTwo}
            textAlignVertical='auto'
            keyboardType={'email-address'}
            autoCapitalize={'words'}
          />
        </View>
    )
}
const styles = StyleSheet.create({
    textInput:{
        margin:2,
        paddingHorizontal:15, 
        backgroundColor:'#fff',
        fontSize:12,
        color:'#000',
        marginRight:2,
        fontFamily:'GoogleSans-Regular',
        borderColor:'#ddd',
        borderWidth:1,
        height:40,
        borderRadius:8
    },
})

