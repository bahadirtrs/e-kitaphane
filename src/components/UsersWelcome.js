import React from 'react'
import { View, Text,Image,TouchableOpacity,Dimensions,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { COLORS } from '../constants/theme'

export default function UsersWelcome({warning, infoColor, setWarning, text}) {
    return (
        <View style={styles.container} >
          { text
            ? <View style={{justifyContent:'center', alignItems:'center'}} >
            <Image  style={styles.imageStyle} source={require('../../assets/logom-sm.png')} />
            <Text style={[styles.welcomeTextDescription]}>
              {text}
            </Text>  
          </View>
          :null

          }
         
          { warning!='null' ?
          <View style={[styles.infoStyle,{backgroundColor:infoColor}]}> 
            <Text style={styles.warningTextStyle}>{warning}</Text>
            <TouchableOpacity activeOpacity={0.9} onPress={setWarning} >
                <Icon name="close-outline" size={25} color={COLORS.textColorLight}/>
            </TouchableOpacity>
          </View> 
          :null}
       </View>
    )
}
const styles = StyleSheet.create({
  container:{
    justifyContent:'center', 
    alignItems:'center', 
    paddingBottom:20, 
    width:Dimensions.get('screen').width*0.8
  },
  imageStyle:{
    width:110, 
    height:110
  },
  infoStyle:{
    width:Dimensions.get('screen').width*0.85, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    padding:10, 
    borderRadius:5, 
    marginTop:10
  },
  warningTextStyle:{
    color:COLORS.textColorLight, 
    fontFamily:'GoogleSans-Regular'
  },
  welcomeText:{
      fontSize:30,
      fontFamily:'GoogleSans-Medium',
      color:COLORS.textColor,
      paddingTop:15,
    },
    welcomeTextDescription:{
      fontSize:20,
      fontFamily:'GoogleSans-Bold',
      color:COLORS.textColor,
      textAlign:'center',
      paddingTop:10
    },
})
