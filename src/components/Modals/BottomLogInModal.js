import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import SubmitButton from '../Button/SubmitButton'
import {useNavigation} from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons"


const BottomLogInModal = ({visible, setVisible, redirectButton}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation =useNavigation();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButtonContainer} onPress={setVisible} >
               <Icon name="close-outline" size={30} color="#1d3557" />
            </TouchableOpacity>
            <View style={styles.bodyContainer} >
               <Icon name="information-circle-outline" size={50} color="#1d3557" />
               <Text style={styles.modalText}>Bu kitabı satın alabilmeniz için oturum açmanız gerekmektedir.</Text>
            </View>
            <SubmitButton title='' butonPress={redirectButton} />
           
           
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent:"flex-end",
    alignItems: "center",
    marginTop: 2,
    bottom:-20,
  },
  modalView: {
    width:Dimensions.get('screen').width,
    margin: 20,
    backgroundColor: "white",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    padding: 35,
    paddingTop:0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButtonContainer:{ 
    width:Dimensions.get('screen').width, 
    justifyContent:'flex-end', 
    alignItems:'flex-end', padding:5
  },
  bodyContainer:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    paddingBottom:20
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
    width:Dimensions.get('screen').width-130,
    color:'#555',
    fontFamily:'GoogleSans-Regular',
    fontSize:13,
    textAlign: "left",
    paddingLeft:5,
  },
});

export default BottomLogInModal;