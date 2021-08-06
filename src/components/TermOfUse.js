import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const TermOfUse = ({visible, setVisible}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Text>Sözleşmeler</Text>
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
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems:'flex-start',
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
    borderRadius: 5,
    padding: 10,
    elevation: 0
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
  }
});

export default TermOfUse;