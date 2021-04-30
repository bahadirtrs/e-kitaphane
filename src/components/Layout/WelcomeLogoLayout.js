import React from 'react'
import { View, Text,StyleSheet,Image } from 'react-native'
export default function WelcomeLogoLayout() {
    return (
        <View style={styles.welcome} >
            <Image style={{width:80,height:80}} source={require('../../../assets/books-logo.png')}/>
            <Text style={styles.welcomeTitle}>E-Kitaphane</Text>
            <Text style={styles.welcomeDescription}>Sevdiğiniz kitaplar cebinizde</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    welcome:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',  
    },
    welcomeTitle:{
        fontSize:44, 
        color:'#fff', 
        fontFamily:'GoogleSans-Medium', 
        textAlign:'center'
    },
    welcomeDescription:{
        fontSize:16,
        color:'#fff',
        fontFamily:'GoogleSans-Regular',
        textAlign:'center'
    },
})
