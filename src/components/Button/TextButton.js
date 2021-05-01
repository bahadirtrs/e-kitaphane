import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text,StyleSheet  } from 'react-native'

export default function TextButton({questions,redirectText, buttonPress}) {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={buttonPress} style={styles.container}>
            <Text style={styles.questionText}>{questions}</Text>
            <Text style={styles.redirectText}>{redirectText}</Text>
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
        color:'#555',
        fontFamily:'GoogleSans-Regular',
        fontSize:16,
        textAlign:'center',
    },
    redirectText:{
        color:'#118ab2',
        fontFamily:'GoogleSans-Medium',
        fontSize:15,
        textAlign:'center',
    }
})

