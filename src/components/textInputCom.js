import React, {useState, useEffect} from 'react'
import { View, TextInput,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { COLORS } from '../constants/theme'
import { useTheme } from "@react-navigation/native"
export default function textInputCom({type,value,onChangeText,placeholder,passwordHide,setPasswordHide}) {
  const [passHide, setPassHide] = useState(true)
  const {colors}=useTheme()
  useEffect(() => {
    type=='password'
      ?setPassHide(true)
      :setPassHide(false)
  }, [])
    return (
      <View style={[styles.container,{backgroundColor:colors.background, borderColor:colors.border}]} >
      <TextInput
         style={[styles.textInput, {fontSize:14, width:'90%', backgroundColor:colors.background, color:colors.text}]}
         placeholder={placeholder}
         placeholderTextColor={colors.text}
         value={value}
         onChangeText={onChangeText}
         textAlignVertical='auto'
         keyboardType={passwordHide? 'default':'email-address'}
         secureTextEntry={passHide? true:false}
         autoCapitalize={'none'}
       />
        { setPasswordHide 
        ?passHide 
          ? <TouchableOpacity activeOpacity={0.9} onPress={()=>setPassHide(false)} style={styles.textButton}>
              <Icon  name="eye-off-outline" size={20} color="#1d3557" /> 
            </TouchableOpacity>
          : <TouchableOpacity activeOpacity={0.9} onPress={()=>setPassHide(true)}  style={styles.textButton} >
              <Icon name="eye-outline" size={20} color="#1d3557" /> 
            </TouchableOpacity>
       :null
       }
     </View>
    )
}

const styles = StyleSheet.create({
  container:{
    width:'85%', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    paddingHorizontal:10,
    borderRadius:8,
    margin:5,
    borderWidth:1,
    height:40,

  },
  textInput:{
    paddingHorizontal:0, 
    fontFamily:'GoogleSans-Regular',
},
textButton:{ 
  flexDirection:'row', 
  justifyContent:'center', 
  alignItems:'center'
},
})

