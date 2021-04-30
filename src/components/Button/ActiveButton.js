import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'

export default function ActiveButton({isLogInFormControl,buttonClick}) {
    return (
        <View style={styles.container} >
       { buttonClick
         ?   <TouchableOpacity onPress={()=>{isLogInFormControl()}} style={styles.submitButtonEnable} >
               <Text style={styles.buttonText}>Giriş Yapın</Text>
             </TouchableOpacity>
         :
           <TouchableOpacity activeOpacity={1} onPress={()=>isLogInFormControl()} style={styles.submitButton} >
               <Text style={styles.buttonText}>Giriş Yap</Text>
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
    backgroundColor:'#118ab2',
    borderRadius:30
  },

})

