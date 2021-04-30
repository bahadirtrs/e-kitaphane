import React from 'react'
import { View,Dimensions } from 'react-native'

export default function AccountLayout() {
    return (
        <View 
             style={{
                 position:'absolute',
                 backgroundColor:'#118ab2',
                 top:-200,
                 left:-50,
                 width:Dimensions.get('screen').width*2,
                 height:Dimensions.get('screen').height*0.75,
                 borderRadius:300
             }}
            />
    )
}
