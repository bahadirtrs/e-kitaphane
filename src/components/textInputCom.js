import React from 'react'
import { View, TextInput,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default function textInputCom({value,onChangeText,placeholder,passwordHide,setPasswordHide}) {
    return (
      <View style={{width:'90%', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
      <TextInput
         style={[styles.textInput, {fontSize:14, width:'94%'}]}
         placeholder={placeholder}
         placeholderTextColor={'#555'}
         value={value}
         onChangeText={onChangeText}
         textAlignVertical='auto'
         keyboardType={'email-address'}
         secureTextEntry={passwordHide?true:false}
         autoCapitalize={'none'}
       />
        { setPasswordHide ?
        passwordHide ?
        <TouchableOpacity activeOpacity={0.9} onPress={setPasswordHide} style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
          <Icon style={{ position:'absolute', right:10}} name="eye-off-outline" size={20} color="#118ab2" /> 
        </TouchableOpacity>
        :
        <TouchableOpacity activeOpacity={0.9} onPress={setPasswordHide} style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
          <Icon style={{ position:'absolute', right:10}} name="eye-outline" size={20} color="#118ab2" /> 
       </TouchableOpacity>
       :null
       }
     </View>
    )
}

const styles = StyleSheet.create({
  textInput:{
    margin:2,
    paddingHorizontal:15, 
    backgroundColor:'#fff',
    fontSize:16,
    color:'#000',
    marginRight:2,
    fontFamily:'GoogleSans-Regular',
    borderColor:'#ddd',
    borderWidth:1,
    height:40,
    borderRadius:8
},
})

