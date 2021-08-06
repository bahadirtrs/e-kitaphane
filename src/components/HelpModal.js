import React, { useState } from "react";
import {Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native"
import { Platform } from "react-native";

const HelpModal = ({visible, setVisible}) => {
  let storeName=Platform.select({ios:'iTunes Connect', android:'GooglePlay'})
  const {colors}=useTheme()
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor:colors.background}]}>
            <Text style={{fontSize:32, paddingBottom:15, fontFamily:'GoogleSans-Regular'}} >
              Uyarı!
            </Text>
            <Text style={[styles.modalText,{color:colors.text}]}> 
              E-kitaphane mobil uygulaması üzerinden kitapları yalnızca {storeName} hesabı kullanarak satın alabilirsiniz.
            </Text>
            <Text style={[styles.modalText,{color:colors.text}]}>
              Satın alma işlemi sırasında birincil e-posta adresiniz kullanılır. Lütfen oturum açarken birincil hesabınızı kullanmaya özen gösteriniz.
            </Text>
          
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={setVisible}
            >
              <Text style={styles.textStyle}>Anladım</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:0, 
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor:COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:'GoogleSans-Regular'
  }
});

export default HelpModal;