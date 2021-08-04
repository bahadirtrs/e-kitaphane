import React from 'react'
import { View, TextInput,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { COLORS } from '../constants/theme'
import { useTheme } from "@react-navigation/native"

export default function TwoInputText({value,onChangeText,placeholder,valueTwo,onChangeTextTwo,placeholderTwo}) {
  const {colors}=useTheme()
    return (
        <View style={{width:'90%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
          <TextInput
            style={[styles.textInput, {fontSize:13, width:'46%', borderTopLeftRadius:8,color:colors.text, borderColor:colors.border, backgroundColor:colors.background}]}
            placeholder={placeholder}
            placeholderTextColor={colors.text}
            value={value}
            onChangeText={onChangeText}
            textAlignVertical='auto'
            keyboardType={'email-address'}
            autoCapitalize={'words'}
          />
          <TextInput
            style={[styles.textInput, {fontSize:13,width:'47%', borderTopRightRadius:8,borderColor:colors.border, color:colors.text, backgroundColor:colors.background}]}
            placeholder={placeholderTwo}
            placeholderTextColor={colors.text}
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
        backgroundColor:COLORS.backgroundColor,
        fontSize:12,
        color:COLORS.textColor,
        marginRight:2,
        fontFamily:'GoogleSans-Regular',
        borderColor:'#ddd',
        borderWidth:1,
        height:40,
        borderRadius:8
    },
})

