import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'

export default function ActiveButton({isLogInFormControl,buttonClick,text}) {
    return (
        <View style={styles.container} >
       { buttonClick
         ?   <TouchableOpacity activeOpacity={0.9} onPress={()=>{isLogInFormControl()}} style={styles.submitButtonEnable} >
               <Text style={styles.buttonText}>{text}</Text>
             </TouchableOpacity>
         :
           <TouchableOpacity activeOpacity={1} onPress={()=>isLogInFormControl()} style={styles.submitButton} >
               <Text style={styles.buttonText}>{text}</Text>
           </TouchableOpacity>
       }
     </View>
    )
}
const styles = StyleSheet.create({
  container:{ 
    width:'90%', 
    justifyContent:'center', 
    alignItems:'center'
  },
  buttonText:{
    fontSize:16,
    color:'#fff',
    fontFamily:'GoogleSans-Medium',
    textAlign:'center'
  },
  submitButton:{
    width:'90%',
    marginVertical:10,
    paddingHorizontal:15,
    paddingVertical:10,
    backgroundColor:'#acb9c9',
    borderRadius:30
  },
  submitButtonEnable:{
    width:'90%',
    marginVertical:10,
    paddingHorizontal:15,
    paddingVertical:10,
    backgroundColor:'#1d3557',
    borderRadius:30
  },

})

