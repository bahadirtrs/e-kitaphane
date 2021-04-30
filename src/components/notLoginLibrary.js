import React from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text,Dimensions,SafeAreaView,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import SubmitButton from '../components/Button/SubmitButton'
import TextButton from '../components/Button/TextButton'
import {useNavigation} from '@react-navigation/native'

const width=Dimensions.get('screen').width;
const height=Dimensions.get('screen').height;

export default function notLoginLibrary() {
    const navigation=useNavigation();
    return (
        <SafeAreaView style={styles.container} >
          <Icon name="information-circle-outline" size={100} color="#333" />
          <Text style={styles.text}>Kütüphane özelliğini kullanabilmeniz için kayıt olmanız gerekmektedir.</Text>
          <SubmitButton butonPress={()=>navigation.push('LogIn')} />
          <TextButton
            questions={'Henüz hesap oluşturmadınız mı?'}
            redirectText={'Hesap Oluşturun'} buttonPress={()=> navigation.push('SingIn')}
          />

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

