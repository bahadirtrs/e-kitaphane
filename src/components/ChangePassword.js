import React, { useState } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import TextInputCom from '../components/textInputCom'
import RNSecureStorage from "rn-secure-storage"
import { BASE_URL} from "../utils/constants"
import  Icon  from "react-native-vector-icons/Ionicons"

import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

const ChangePassword = ({visible, setVisible, first_name, last_name, email}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("")
  const [password, setPassword] = useState("")
  const [passwordHide, setPasswordHide] = useState(true)
  const [warning, setWarning] = useState(false)
  const [infoColor, setInfoColor] = useState('#e63946')

  const TermClear = ()=>{
    setNewPassword("")
    setNewPasswordRepeat("")
    setPassword("")
  }
  const updatePassword =async()=>{
    try {
      let config = {
        headers: {
          Accept: "application/jsonsss",
          Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
        }
      }
      let data = { 
        email:email,
        password:password,
        new_password:newPassword,
        new_password_confirmation:newPasswordRepeat,
        first_name:first_name,
        last_name:last_name,
      };
      await axios.post(`${BASE_URL+'api/user'}`, data, config)
      .then(response =>{
        setInfoColor('#43aa8b')
        setWarning("Parolanız başarıyla değiştirildi")
        TermClear()
      });
    }catch (error) {
      setWarning("Parola güncellenemedi! Lütfen bilgilerinizi düzeltin ve tekrar deneyin")
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width:Dimensions.get('window').width*0.76, paddingBottom:5, paddingTop:15, paddingHorizontal:0, marginVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc'}} >
              <Text style={{fontFamily:'GoogleSans-Medium', fontSize:20}} >Parola güncelle</Text>
             <Text style={{fontFamily:'GoogleSans-Regular', fontSize:12,color:'#555'}} >Lütfen mevcut parolanızı ve yeni parolanızı giriniz.</Text>
            </View>
            {warning ?
              <View style={[styles.infoStyle,{backgroundColor:infoColor}]}> 
                <Text style={styles.warningTextStyle}>{warning}</Text>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>setWarning(false)} >
                  <Icon name="close-outline" size={25} color="#fff" />
                </TouchableOpacity>
              </View> 
            :null}
              <TextInputCom
                placeholder={"Mevcut Parola"} value={password}
                onChangeText={(text)=>setPassword(text)} type={'password'}
                passwordHide={passwordHide} setPasswordHide={()=>setPasswordHide(!passwordHide)}
                />
              <TextInputCom
                placeholder={"Yeni Parola"} value={newPassword}
                onChangeText={(text)=>setNewPassword(text)} type={'password'}
                passwordHide={passwordHide} setPasswordHide={()=>setPasswordHide(!passwordHide)}
              />
              <TextInputCom
                placeholder={"Yeni Parola Tekrarı"} value={newPasswordRepeat}
                onChangeText={(text)=>setNewPasswordRepeat(text)} type={'password'}
                passwordHide={passwordHide} setPasswordHide={()=>setPasswordHide(!passwordHide)}
              />
              <View style={{ flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:Dimensions.get('window').width*0.7, paddingVertical:20}} >
                <Pressable style={[styles.button, styles.buttonClose]} onPress={setVisible}>
                  <Text style={styles.textStyle}>İptal</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={()=>updatePassword()}>
                  <Text style={styles.textStyle}>Güncelle</Text>
                </Pressable>
              </View>
           
          </View>
        </View>

      </Modal>
     
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor:'#00000090',
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width:Dimensions.get('window').width*0.9,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0
  },
  button: {
    width:120,
    borderRadius: 5,
    padding: 10,
    elevation: 0,
    marginHorizontal:10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#1d3557",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextTitle: {
    textAlign: "left",
    fontFamily:'GoogleSans-Medium',
    fontSize:16,
    paddingBottom:5,
    marginTop:10
  },

  modalText: {
    color:'#333',
    textAlign: "left",
    fontFamily:'GoogleSans-Regular',
    fontSize:12,
    paddingBottom:5
  },
  infoStyle:{
    width:Dimensions.get('screen').width*0.76, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    padding:10, 
    borderRadius:5, 
    marginVertical:10
  },
  warningTextStyle:{
    fontSize:12,
    color:'#fff', 
    fontFamily:'GoogleSans-Regular'
  },
});

export default ChangePassword;