import React from 'react'
import { View, Dimensions,StyleSheet,ActivityIndicator } from 'react-native'

export default function BeingIndicator() {
    return (
    <View style={{ zIndex:1, backgroundColor: 'transparent', height:Dimensions.get('screen').height,  width:Dimensions.get('screen').width, justifyContent:'center',alignItems:'center'}} >
        <View style={styles.activityStyle} >
            <ActivityIndicator color='#fff' size="large" />
        </View>
     </View>
    )
}
const styles = StyleSheet.create({
    activityStyle:{ 
        backgroundColor:'#00000090', 
        justifyContent:'center',
        alignItems:'center', 
        width:100, 
        height:80,
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
})
