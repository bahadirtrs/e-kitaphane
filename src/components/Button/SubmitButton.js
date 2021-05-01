import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet, Dimensions } from 'react-native'

export default function SubmitButton({butonPress}) {
    return (
    <TouchableOpacity activeOpacity={0.9} style={styles.pageButton} onPress={butonPress} >
        <Text style={styles.buttonText}>Oturum Açın</Text>
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    pageButton:{
        width:Dimensions.get('screen').width*0.8,
        alignItems:'center',
        padding:10,
        backgroundColor:'#118ab2',
        margin:5,
        borderRadius:20
    },
    buttonText:{
        color:'#fff',
        fontSize:16,
        fontFamily:'GoogleSans-Medium'
    },
})
