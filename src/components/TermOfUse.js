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
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={{fontFamily:'GoogleSans-Medium', textAlign:'center', fontSize:28, color:'#333'}} >Kullanıcı Sözleşmesi</Text>
              <Text style={styles.modalTextTitle}>MADDE 1– TARAFLAR</Text>
              <Text style={styles.modalText}>
                {'İşbu sözleşme ve ekleri (EK-1 Gizlilik Sözleşmesi) “Kavacık Mahallesi, Ertürk Sokak, No:1 K 1 Plaza Kavacık/İstanbul” adresinde mukim “Sodexo Avantaj ve Ödüllendirme Hizmetleri Anonim Şirketi” ve Saray Mahallesi Site Yolu Sokak No:18 Kat:1 34768 Ümraniye/İstanbuladresinde mukim “Sodexo Entegre Hizmet Yönetimi Anonim Şirketi” (bundan böyle "Sodexo" olarak anılacaktır) ile Sodexo mobil uygulamalarından işbu sözleşmede belirtilen koşullar dahilinde yararlanan Kullanıcı ile karşılıklı olarak kabul edilerek yürürlüğe girmiştir.'}
              </Text>
              <Text style={styles.modalTextTitle}>MADDE 2– TANIMLAR </Text>
              <Text style={styles.modalText}>
                {'2.1. İnternet sitesi sodexo.com.tr. adlı internet sitesini ifade etmektedir.'}
              </Text>
              <Text style={styles.modalText}>
                {'2.2. Uygulama : İnternet sitesinden sunulan hizmetleri ifade etmektedir. (Bundan sonra “Uygulama” olarak anılacaktır.'}
              </Text>
              <Text style={styles.modalText}>
                {'2.3. Kullanıcı: Uygulamadan Sodexo tarafından sunulan hizmetlerden işbu sözleşmede belirtilen koşullar dahilinde yararlanan kişileri ifade etmektedir. (Bundan böyle "Kullanıcı” olarak anılacaktır.)'}
              </Text>
              <Text style={styles.modalText}>
                {'2.5. İletişim Kanalları: Anında bild ile bildirim gibi iletişim mecralarını ifade eder'}
              </Text>
              <Text style={styles.modalText}>
                {'2.6. Mesaj: Sodexo’nun, Kullanıcılara pazarlama, araştırma, bilgilendirme vb. amaçlarla göndereceği, Kullanıcıların Sodexo tarafından kendilerine gönderilmesine izin verdikleri mesajları ifade eder'}
              </Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={setVisible}>
                <Text style={styles.textStyle}>Kapat</Text>
              </Pressable>
            </ScrollView>
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