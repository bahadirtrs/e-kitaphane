import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text,StyleSheet  } from 'react-native'
import { useTheme } from "@react-navigation/native"
export default function TextButton({questions,redirectText, buttonPress}) {
    const {colors}=useTheme()
    return (
        <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={buttonPress} 
            style={styles.container}>
                <Text style={[styles.questionText,{color:colors.text}]}>{questions}</Text>
                <Text style={[styles.redirectText,{color:colors.text}]}>{redirectText}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    questionText:{
        color:'#888',
        fontFamily:'GoogleSans-Regular',
        fontSize:14,
        textAlign:'center',
    },
    redirectText:{
        color:'#1d3557',
        fontFamily:'GoogleSans-Medium',
        fontSize:13,
        textAlign:'center',
    }
})

