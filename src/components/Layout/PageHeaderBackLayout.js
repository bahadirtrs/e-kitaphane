import React,{useState} from 'react'
import {View, Dimensions, TouchableOpacity,Text,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"


export default function PageHeaderBackLayout({butonPress,butonColor,title,backgrounColor,type, darkMode, pageSave, deleteNumber,pageHorizontal, setPageHorizontalTrue,themeSelect, listType, listTypePress}) {
      
    return (
        <View style={[styles.container,{backgroundColor:backgrounColor}]} >
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', maxWidth:'70%'}} >
                <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={butonPress} >
                    <Icon name="chevron-back-outline" size={25} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
                <View>
                    <Text numberOfLines={1} style={[styles.buttonText, {color:butonColor}]}>{title}</Text>
                </View>
            </View>
        { type=='pdf'? 
            <View style={styles.buttonContainer}>
                {darkMode
                ?
                <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={themeSelect} >
                  <Icon name="moon-outline" size={22} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={themeSelect} >
                  <Icon name="moon" size={22} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
                }
               {pageHorizontal 
               ?<TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={setPageHorizontalTrue} >
                    <Icon name="tablet-landscape-outline" size={22} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
               :<TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={setPageHorizontalTrue} >
                    <Icon name="tablet-portrait-outline" size={22} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
               }
                 <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={deleteNumber} >
                    <Icon name="trash-sharp" size={20} color={butonColor?butonColor:"#fff" }/> 
               </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={pageSave} >
                    <Icon name="save" size={20} color={butonColor?butonColor:"#fff" }/> 
                </TouchableOpacity>
            </View>
            :<Text>{' '}</Text>
        }
        { listTypePress
        ? listType
            ? <TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={listTypePress} >
                <Icon name="list-outline" size={22} color={butonColor?butonColor:"#fff" }/> 
              </TouchableOpacity>
            :<TouchableOpacity activeOpacity={0.9} style={styles.saveButton} onPress={listTypePress} >
                <Icon name="apps-outline" size={20} color={butonColor?butonColor:"#fff" }/> 
             </TouchableOpacity>
        :null
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
    buttonContainer:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center', 
        paddingRight:0
    },
    buttonStyle:{ 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    buttonText:{
        fontFamily:'GoogleSans-Medium', 
        lineHeight:20,
        fontSize:14, 
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
