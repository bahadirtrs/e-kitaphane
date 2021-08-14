import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"

const Info = (props) => {
    const {colors}=useTheme()
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.infoModal}
        onRequestClose={props.setinfoModal}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor:colors.background, borderColor:colors.border}]}>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                  <Icon name="information-circle-outline" size={25} color={colors.text}/> 
                  <Text style={[styles.title, {color:colors.text}]}> {props.title}</Text>
              </View>
            <Text style={[styles.modalText, {color:colors.text}]}>{props.text}</Text>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'center'}} >
            <Pressable
              style={[styles.button, styles.buttonClose, {backgroundColor:colors.primary}]}
              onPress={props.setInfoModal}
            >
              <Text style={styles.textStyle}>Vazgeç</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen, {backgroundColor:colors.customSupportColor}]}
              onPress={props.okPress}
            >
              <Text style={styles.textStyle}>Şimdi İndir</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width:Dimensions.get('screen').width*0.9,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth:0.5,
   
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal:10,
    width:'45%',
    alignItems:'center'
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left"
  },
  modalText: {
    fontFamily:'GoogleSans-Regular',
    marginBottom: 15,
    textAlign: "left"
  },
  title:{
      fontFamily:'GoogleSans-Medium',
      fontSize:20,
      paddingVertical:10
  }
});

export default Info;