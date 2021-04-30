import React,{useState,useEffect} from 'react'
import { Dimensions } from 'react-native'
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'
import RNSecureStorage from "rn-secure-storage";
import NotLoginLibrary from '../../components/notLoginLibrary'


export default function MyLibrary() {
    const [token, setToken] = useState(null)
    useEffect(() => {
        Token()
    }, [])

    const Token = async() =>{
        try {
          await RNSecureStorage.get("access_token").then((value) => {
            if(value!=null)
              setToken(value);
          })
        } catch (error){}
      }
  if(token==null){
    return(
     <NotLoginLibrary/>
    )
}
    return (
        <View style={styles.container} >
            <Text>MyLibrary Welcome</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
