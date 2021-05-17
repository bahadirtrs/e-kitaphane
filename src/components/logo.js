import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';

export default function logo() {
    return (
        <View>
            <Text style={styles.logoText}>e-Kitaphane</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    logoText:{
        color:'#fff',
        fontFamily:'GoogleSans-Medium',
        fontSize:22
        
    }
})
