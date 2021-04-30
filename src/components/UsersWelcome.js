import React from 'react'
import { View, Text,Image,TouchableOpacity,Dimensions,StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default function UsersWelcome({warning, infoColor, setWarning}) {
    return (
        <View style={styles.container} >
          <Image  style={styles.imageStyle} source={require('../../assets/logom-sm.png')} />
          <Text style={[styles.welcomeTextDescription]}>
            Birbirinden eşsiz kitapları okumak için oturum açın
          </Text>  
          { warning!='null' ?
          <View style={[styles.infoStyle,{backgroundColor:infoColor}]}> 
            <Text style={style.warningTextStyle}>{warning}</Text>
            <TouchableOpacity onPress={setWarning} >
                <Icon name="close-outline" size={25} color="#fff" />
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
    width:Dimensions.get('screen').width*0.6
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
    color:'#fff', 
    fontFamily:'GoogleSans-Regular'
  },
  welcomeText:{
      fontSize:30,
      fontFamily:'GoogleSans-Medium',
      color:'#333',
      paddingTop:15,
    },
    welcomeTextDescription:{
      fontSize:20,
      fontFamily:'GoogleSans-Bold',
      color:'#555',
      textAlign:'center',
      paddingTop:10
    },
})
