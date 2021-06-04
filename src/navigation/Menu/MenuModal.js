import React, {useState, useEffect,useCallback} from "react";
import {Modal,StyleSheet,View,Text,TouchableOpacity, Dimensions, Switch} from "react-native";
import MenuItem from './MenuItem';
import SocialItem from './SocialItem';
import MenuHeader from './MenuHeader';
import { SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native"
import { EventRegister } from 'react-native-event-listeners'
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from "@react-navigation/native"
const { width, height } = Dimensions.get('window');
const instagramUrl = "https://www.instagram.com/bir.hikayem/?hl=tr";

const MenuModal = (props) => {
  const {colors}=useTheme()
  const [darkMode, setDarkMode] = useState(false)


  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("useTheme").then(item =>{
        if(item==="true"){
          setDarkMode(true)
        }else{
          setDarkMode(false)
        }
      })
      return () => {
        true
      }
    }, [])
  );

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={props.menuModal}>
      <SafeAreaView/>
        <TouchableOpacity activeOpacity={1} onPress={props.modalPress}  style={styles.centeredView}>
         <TouchableOpacity activeOpacity={1} style={[styles.modalView, {backgroundColor:colors.background}]}>     
            <View style={{flexDirection:'column', justifyContent:'space-between', height:Dimensions.get('screen').height-100}} >
             <View>
                <MenuHeader modalPress={props.modalPress} />
                <View>
                    <MenuItem text={'İletişim'} butonPress={props.menuThreePress} icon={'users-cog'}/>
                    <MenuItem text={'Gizlilik sözleşmesi'} butonPress={props.menuOnePress} icon={'save'}/>
                    <MenuItem text={'Kullanıcı Sözleşmesi'} butonPress={props.menuTwoPress} icon={'clock'}/>
                    <MenuItem text={'Uygulama Hakkında'} butonPress={props.menuFourPress} icon={'eject'}/>
                </View>
                <View style={styles.SocialContainer} >
                   <SocialItem url={null} icon={'facebook'}/>
                   <SocialItem url={null} icon={'twitter'}/>
                   <SocialItem url={instagramUrl} icon={'instagram'} />
                   <SocialItem url={null}  icon={'whatsapp'}/>
                </View>  
            </View>    
            <View>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:30, paddingVertical:10}} >
              <Text style={{fontFamily:'GoogleSans-Regular', fontSize:16, color:colors.text}} >Karanlık Mod {darkMode?'(Açık)': '(Kapalı)'} </Text> 
              <Switch 
                trackColor={{ false:colors.primary, true:'#40916c'}}
                value={darkMode} onValueChange={(val)=>{
                    setDarkMode(!darkMode)
                    AsyncStorage.setItem("useTheme",String(val)); 
                    EventRegister.emit('useThemeDeg', val)
                  }}  />
              </View>
            </View>
            </View>
         </TouchableOpacity>
       </TouchableOpacity>      
      </Modal>
      </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    height:height,
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    opacity:1,
    backgroundColor:'#00000050'  
  },

  modalView: {
    width:'70%',
    height:height,
    backgroundColor: "#f1f1f1",
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    
  },
  SocialContainer:{
      flexDirection:'row', 
      justifyContent:'center', 
      alignItems:'center', 
      paddingVertical:20
  }
});

export default MenuModal;