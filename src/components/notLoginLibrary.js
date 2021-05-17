//devredisi
import React from 'react'
import {Text,Dimensions,SafeAreaView,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import SubmitButton from '../components/Button/SubmitButton'
import {useNavigation} from '@react-navigation/native'
const width=Dimensions.get('screen').width;
const height=Dimensions.get('screen').height;

export default function notLoginLibrary() {
    const navigation=useNavigation();
    return (
        <SafeAreaView style={styles.container} >
          <Icon name="information-circle-outline" size={100} color="#555" />
          <Text style={styles.text}>Kütüphane özelliğini kullanabilmeniz için kayıt olmanız gerekmektedir.</Text>
          <SubmitButton butonPress={()=>navigation.push('LogIn')} />
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        color:'#333',
        fontFamily:'GoogleSans-Regular', 
        textAlign:'center', 
        fontSize:16, 
        paddingHorizontal:50,
        paddingVertical:10
    },
   
})

