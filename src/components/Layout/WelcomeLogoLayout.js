import React from 'react'
import { View, Text,StyleSheet,Image } from 'react-native'
export default function WelcomeLogoLayout() {
    return (
        <View style={styles.welcome} >
            <Image style={{width:65,height:67}} source={require('../../../assets/books-logo.png')}/>
            <Text style={styles.welcomeTitle}>E-Kitaphane</Text>
            <Text style={styles.welcomeDescription}>Sevdiğiniz kitaplar cebinizde</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    welcome:{
        justifyContent:'center',
        alignItems:'center',  
    },
    welcomeTitle:{
        fontSize:34, 
        color:'#fff', 
        fontFamily:'GoogleSans-Medium', 
        textAlign:'center'
    },
    welcomeDescription:{
        fontSize:13,
        color:'#fff',
        fontFamily:'GoogleSans-Regular',
        textAlign:'center'
    },
})
