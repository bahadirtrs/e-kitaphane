import React from 'react'
import { View,StyleSheet,ActivityIndicator,Text } from 'react-native'

export default function BeingIndicator({title=''}) {
    return (
    <View style={{justifyContent:'center',alignItems:'center'}} >
        <View style={styles.activityStyle} >
            <ActivityIndicator color='#fff' size="large" />
            <Text style={styles.title}>{title}</Text>
        </View>
     </View>
    )
}
const styles = StyleSheet.create({
    activityStyle:{ 
        padding:10,
        backgroundColor:'#00000090', 
        justifyContent:'center',
        alignItems:'center', 
        width:140, 
        height:120,
        borderRadius:8,
        shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 0,
    },
    title:{
        textAlign:'center',
        paddingTop:10,
        fontSize:12,
        fontFamily:'GoogleSans-Regular',
        color:'#fff'
    }
})
