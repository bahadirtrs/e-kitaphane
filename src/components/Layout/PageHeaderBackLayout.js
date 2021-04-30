import React from 'react'
import { View, Dimensions, TouchableOpacity,Text } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
export default function PageHeaderBackLayout({butonPress,butonColor,title,backgrounColor,type, pageSave, bookMark}) {
    return (
    <View style={{backgroundColor:backgrounColor, width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'space-between',alignItems:'center', paddingHorizontal:10, paddingVertical:0}} >
        <TouchableOpacity style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} onPress={butonPress} >
            <Icon name="chevron-back-outline" size={30} color={butonColor?butonColor:"#fff" }/> 
            <Text style={{fontFamily:'GoogleSans-Medium', fontSize:16, paddingLeft:15}} >{title}</Text>
        </TouchableOpacity>
        

        
        { type=='pdf'
            ?
            <View style={{flexDirection:'row'}} >

            <TouchableOpacity style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center',paddingHorizontal:5}} onPress={pageSave} >
                <Icon name="save-outline" size={25} color={butonColor?butonColor:"#fff" }/> 
            </TouchableOpacity>
            </View>
            :null
            }
    </View>
    )
}
