import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import logom from "../../assets/logo.png";

export default function logo() {
    return (
        <View>
            {
         // <Image source={logom} style={{ width: 100 }} resizeMode="contain" />
            <Text style={styles.logoText}>e-Kitaphane</Text>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    logoText:{
        fontFamily:'GoogleSans-Bold',
        fontSize:22
        
    }
})
