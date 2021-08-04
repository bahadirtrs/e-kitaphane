import React, {useState, useEffect,useCallback} from "react";
import {Modal,StyleSheet,View,Text,TouchableOpacity, Dimensions, Switch, Pressable} from "react-native";
import MenuItem from './MenuItem';
import SocialItem from './SocialItem';
import MenuHeader from './MenuHeader';
import { SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native"
import { EventRegister } from 'react-native-event-listeners'
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from "@react-navigation/native"
import {useNavigation} from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons"
const { width, height } = Dimensions.get('window');
const instagramUrl = "https://www.instagram.com/bir.hikayem/?hl=tr";

const MenuModal = (props) => {
  const {colors}=useTheme()
  const [darkMode, setDarkMode] = useState(false)
  const [modalVisible,setModalVisible]= useState(false)
  const [click, setClick]=useState(false)
  const navigation=useNavigation();

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

  const isMembership = () =>{
    navigation.navigate('UyelikSozlesmesi'),
    setModalVisible(false);
  }

  const isConfidentialty = () =>{
    navigation.navigate('GizlilikSozlesmesi'),
    setModalVisible(false);
  }

  const isContact= () =>{
    navigation.navigate('İletisim'),
    setModalVisible(false);
  }

  const isAppAbout = () =>{
    navigation.navigate('UygulamaHakkında'),
    setModalVisible(false);
  }

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <SafeAreaView/>
        <TouchableOpacity activeOpacity={1} onPress={()=>setModalVisible(!modalVisible)}  style={styles.centeredView}>
         <TouchableOpacity activeOpacity={1} style={[styles.modalView, {backgroundColor:colors.background}]}>     
            <View style={styles.menuItemContainer} >
             <View>
                <MenuHeader modalPress={()=>setModalVisible(!modalVisible)} />
                <View>
                    <MenuItem text={'Uygulama Hakkında'} butonPress={()=>isAppAbout()} icon={'info-circle'}/>
                    <MenuItem text={'Kullanıcı Sözleşmesi'} butonPress={()=>isMembership()} icon={'file'}/>
                    <MenuItem text={'Kişisel Verilerin Korunumu'} butonPress={()=>isConfidentialty()} icon={'user-shield'}/>
                    <MenuItem text={'İletişim'} butonPress={()=>isContact()} icon={'address-book'}/>

                </View>
                <View style={styles.SocialContainer} >
                   <SocialItem url={null} icon={'facebook'}/>
                   <SocialItem url={null} icon={'twitter'}/>
                   <SocialItem url={null} icon={'instagram'} />
                   <SocialItem url={null}  icon={'whatsapp'}/>
                </View>  
            </View>    
            <View>
            <View style={styles.themeSelectContainer} >
              <Text style={[styles.themeText, {color:colors.text}]}>Karanlık Mod {darkMode?'(Açık)': '(Kapalı)'} </Text> 
              <Switch 
                trackColor={{ false:colors.primary, true:'#40916c'}}
                value={darkMode} onValueChange={(val)=>{
                    setDarkMode(!darkMode)
                    AsyncStorage.setItem("useTheme",String(val)); 
                    EventRegister.emit('useThemeDeg', val)
                  }}  
              />
              </View>
            </View>
            </View>
         </TouchableOpacity>
       </TouchableOpacity>      
      </Modal>

      <Pressable style={styles.button}onPress={() => setModalVisible(true)}>
        <Icon name="menu-outline" size={32} color={'#fff'} />
      </Pressable>

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
  },
  button:{
    paddingHorizontal:10
  },
  menuItemContainer:{
    flexDirection:'column', 
    justifyContent:'space-between', 
    height:Dimensions.get('screen').height-100
  },
  themeSelectContainer:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    paddingHorizontal:30, 
    paddingVertical:10
  },
  themeText:{
    fontFamily:'GoogleSans-Regular', 
    fontSize:16, 
   
  },
});


export default MenuModal;