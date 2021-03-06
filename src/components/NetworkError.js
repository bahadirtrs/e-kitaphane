import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import NetInfo from '@react-native-community/netinfo'
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants/theme"

const NetworkError = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then((data) => {
      if (data.isConnected) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
    });
  }, [modalVisible]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity onPress={()=>setModalVisible('false')} style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon name="information-circle-outline" size={40} color={COLORS.textColor} />
            <View style={{padding:5}} >
                <Text style={styles.modalText}>İnternet Bağlantısı yok</Text>
                <Text style={styles.modalTextTwo}>Lütfen bir ağa bağlanın ve tekrar deneyin</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <SafeAreaView/>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width:Dimensions.get('screen').width,
    flexDirection:'row',
    backgroundColor:COLORS.networkError,
    paddingHorizontal: 35,
    paddingVertical:23,
    
    alignItems:'center',
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
    paddingVertical: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color:COLORS.textColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color:COLORS.textColorLight,
    fontFamily:'GoogleSans-Medium',
    fontSize:16,
    textAlign: "left"
  },
  modalTextTwo: {
    color:COLORS.textColorLight,
    fontFamily:'GoogleSans-Regular',
    fontSize:12,
    textAlign: "left"
  }
});

export default NetworkError;