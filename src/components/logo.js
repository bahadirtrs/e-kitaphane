import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import { COLORS } from "../constants/theme"
import { useTheme } from "@react-navigation/native"

export default function logo() {
    const {colors}=useTheme()
    return (
        <View>
            <Text style={[styles.logoText,{color:colors.textColorLight}]}>e-Kitaphane</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    logoText:{
        fontFamily:'GoogleSans-Medium',
        fontSize:22
        
    }
})
