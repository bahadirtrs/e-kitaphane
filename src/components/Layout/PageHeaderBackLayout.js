import React from 'react'
import {View, Dimensions, TouchableOpacity,Text,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default function PageHeaderBackLayout({butonPress,butonColor,title,textColor,backgrounColor,type, pageSave, deleteNumber,pageHorizontal, setPageHorizontalTrue}) {
    return (
        <View style={[styles.container,{backgroundColor:backgrounColor}]} >
            <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={butonPress} >
                <Icon name="chevron-back-outline" size={25} color={butonColor?butonColor:"#fff" }/> 
            </TouchableOpacity>
            <View  style={{maxWidth:'60%'}}>
                <Text numberOfLines={1} style={[styles.buttonText, {color:butonColor}]}>{title}</Text>
            </View>
        { type=='pdf'? 
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingRight:0}}>
               {pageHorizontal 
               ?<TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={setPageHorizontalTrue} >
                    <Icon name="tablet-landscape-outline" size={22} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
               :<TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={setPageHorizontalTrue} >
                    <Icon name="tablet-portrait-outline" size={22} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
               }
                 <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={deleteNumber} >
                    <Icon name="trash-sharp" size={22} color={butonColor?butonColor:"#fff" }/> 
               </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={pageSave} >
                    <Icon name="save" size={25} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
            </View>
            :<Text>{' '} </Text>
        }
    </View>
    )
}
const styles = StyleSheet.create({
    container:{ 
        width:Dimensions.get('screen').width,
        maxWidth:Dimensions.get('screen').width, 
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center', 
        paddingHorizontal:15, 
        paddingVertical:10,
        margin:0
    },
    buttonStyle:{ 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    buttonText:{
        fontFamily:'GoogleSans-Medium', 
        height:20,
        lineHeight:20,
        fontSize:13, 
        paddingLeft:0,
        textAlign:'center',
        width:'100%',
       
    },
    saveButton:{ 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center',
        paddingHorizontal:5
    }
})
