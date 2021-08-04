import React, { useState,useEffect, useMemo } from "react";
import {TouchableOpacity, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios"
import RNSecureStorage from "rn-secure-storage"
import { BASE_URL} from "../utils/constants"
import RequestManager from "../utils/requestManager"
import { endpoints } from "../utils/constants"
import Icon from "react-native-vector-icons/Ionicons"
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { useFocusEffect } from "@react-navigation/native"
import { COLORS } from "../constants/theme"
import { useTheme } from "@react-navigation/native"

const SupportCreateModal = ({visible, setVisible, permisson}) => {
  const {colors}=useTheme()
  const { push } = useNavigation()
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState(true)
  const [userInfo, setUserInfo] = useState([])
  const [fetching, setFetching] = useState(false)
  const [warning, setWarning] =useState("Destek almak istediğiniz konuyu yazınız.")
  const getUserInfo = useMemo(async() =>
    RequestManager({
      method: endpoints.user.method,
      url: endpoints.user.path,
      auth: false,
      headers: {
        Accept: "application/jsonsss",
        Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
      },
    }),
  [],)

  useFocusEffect(
    React.useCallback(() => {
      setResponse(true)
    },[])
  );

  useEffect(() => {
    setFetching(true)
    getUserInfo
      .then(res => {
        setUserInfo(res)
        console.log(res.id)
      })
      .catch(err => {
        console.log(err)
        setUserInfo(false)
      })
  }, [getUserInfo])

    const CreateSupport = async()=>{
      try {
        if(subject.length>5 && message.length>10){
          let config = {
            headers: {
              Accept: "application/jsonsss",
            }
          }
          let data = { 
            subject:subject,
            customer_id:String(userInfo.id),
            customer_first_name:userInfo.first_name,
            customer_last_name:userInfo.last_name,
            customer_email:userInfo.email,
            message:message,
          };
          await axios.post(`${BASE_URL+'api/support-record'}`, data, config)
          .then(response =>{
            let record_number=response.data.recordNumber
            stateManegement()
            push("DestekDetay", {'record_number':record_number, 'subject':subject}) 
            }
          );
        }else{
          setWarning("Lütfen konu ve mesaj alanını biraz detaylandırınız.")
        }
      } catch (error) {
        console.log(error)
        setWarning("Bir sorun oluştu. Lütfen giriş yaptığınızdan emin olunuz.")
      }
    }

    const stateManegement = ()=>{
      setResponse(false)
      setMessage("")
      setSubject("")
    }

    useEffect(() => {
      setWarning("Destek almak istediğiniz konuyu yazınız.")
    }, [subject, message])

  return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor:colors.card}]}>
            {response
            ?<>
              <TouchableOpacity style={styles.closeButton} onPress={setVisible} >
                <Icon name="close-outline" size={30} color={colors.primary} />
              </TouchableOpacity>
            {permisson 
              ? <View style={styles.headerContainer}>
                  <Text style={[styles.title,{color:colors.text}]}>Destek Mesajı Oluştur</Text>
                  <Text style={[styles.description,{
                      color:warning.length<42
                        ?colors.text
                        :'#fff', 
                      backgroundColor:warning.length<44
                        ?colors.background
                        :'#e5383b'
                      }]}>{warning}</Text>
                </View>
              : null
             }
            <View>
          {!permisson 
            ? <View style={[styles.headerContainerErr]} >
                 <Icon name="alert-circle-outline" size={70} color={colors.iconColor} />
                <Text style={[styles.descriptionErr,{color:colors.text}]}>
                  Çok fazla bekleyen destek kaydınız olduğu için yeni kayıt oluşturamazsınız. Lütfen Destek kayıtlarının cevaplanmasını bekleyiniz. 
                </Text>
              </View>
            : 
             <View>
              <TextInput
                style={[styles.textInputSubject,{color:colors.text, borderColor:colors.border}]}
                placeholder={"Konu"}
                placeholderTextColor={colors.text}
                value={subject}
                onChangeText={(text)=>setSubject(text)}
                textAlignVertical='auto'
                keyboardType={'default'}
                autoCapitalize={'none'}
              />
              <TextInput
                style={[styles.textInput,{color:colors.text, borderColor:colors.border}]}
                placeholder={"Mesajınız | max:500"}
                placeholderTextColor={colors.text}
                value={message}
                onChangeText={(text)=>setMessage(text)}
                textAlignVertical='top'
                textAlign='left'
                keyboardType={'default'}
                autoCapitalize={'none'}
                multiline={true}
                numberOfLines={10}
                maxLength={500}
              /> 
              <View style={{justifyContent:'flex-start', alignItems:'flex-start', paddingHorizontal:10, paddingTop:5,}} >
                <Text style={[styles.userInfo,{color:colors.text}]}>İsim Soyisim: {userInfo.first_name} {userInfo.last_name}</Text>
                <Text style={[styles.userInfo,{color:colors.text}]}>Mail adresi: {userInfo.email} </Text>
              </View>
            </View>
              }
            </View>
           {permisson ?
           <View style={styles.buttonContainer} >
           <TouchableOpacity onPress={()=>CreateSupport()} style={styles.button}>
             <Text style={[styles.buttonText, {color:colors.text}]}>Gönder</Text>
           </TouchableOpacity>
         </View>
         :null
           }
            </>
            :
            <View style={[styles.headerContainer, {alignItems:'center', paddingVertical:20, borderBottomWidth:0}]} >
              <Icon name="thumbs-up-outline" size={80} color={'#118ab2'}/>
              <Text style={[styles.title, {textAlign:'center', color:colors.text}]}>Kaydınız başarıyla oluşturuldu</Text>
              <Text style={[styles.description, {textAlign:'center', color:colors.text}]}>İsteğinizi en kısa süre içerisinde inceleneğiz ve sizi bilgilendireceğiz.</Text>
              <TouchableOpacity onPress={setVisible} style={styles.buttonTwo}>
                <Text style={styles.buttonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          }
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    margin: 0,
    borderRadius: 10,
    padding: 6,
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
  closeButton:{
    position:'absolute',
    zIndex:1,
    width:Dimensions.get('screen').width*0.82, 
    justifyContent:'flex-end',
    alignItems:'flex-end',
    top:10,
  },
  headerContainer:{ 
    width:Dimensions.get('screen').width*0.8, 
    justifyContent:'flex-start', 
    alignItems:'flex-start',
    borderBottomWidth:0,
    borderBottomColor:'#ddd',
    marginVertical:5,
  },
  headerContainerErr:{ 
    width:Dimensions.get('screen').width*0.8, 
    justifyContent:'center', 
    alignItems:'center',
    borderBottomWidth:0,
    borderBottomColor:COLORS.borderLine,
    marginVertical:5,
  
  },
  textInput:{ 
    width:Dimensions.get('screen').width*0.8, 
    fontFamily:'GoogleSans-Regular',
    borderWidth:1, 
    borderRadius:3, 
    fontSize:14, 
    height:150,
    margin:5,
    padding:10,
  },
  textInputSubject:{ 
    width:Dimensions.get('screen').width*0.8, 
    height:40,
    fontFamily:'GoogleSans-Regular',
    borderWidth:1, 
    borderRadius:3, 
    fontSize:14, 
    margin:5,
    padding:10,
  },
  title:{
    fontFamily:'GoogleSans-Medium',
    fontSize:20,
    paddingTop:10,
    paddingBottom:3,
    paddingHorizontal:8,
  },
  description:{
    width:Dimensions.get('screen').width*0.8,
    fontFamily:'GoogleSans-Regular',
    paddingBottom:5,
    paddingHorizontal:8,
    textAlign:'left', 
    fontSize:12, 
    paddingTop:5,
  },
  userInfo:{
    fontFamily:'GoogleSans-Regular',
    fontSize:12,
    paddingHorizontal:0,
    color:COLORS.textColor,
    textAlign:'center', 
    fontSize:14,
    paddingVertical:3,
  }, 
  descriptionErr:{
    fontFamily:'GoogleSans-Regular',
    fontSize:12,
    paddingVertical:10,
    paddingHorizontal:20,
    textAlign:'center'
  }, 
  buttonContainer:{
    width:Dimensions.get('screen').width*0.8, 
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  button:{
    width:Dimensions.get('screen').width*0.8, 
    backgroundColor:COLORS.iconColor,
    paddingHorizontal:40,
    paddingVertical:8,
    borderRadius:6,
    marginVertical:10,
  },
  buttonTwo:{
    width:Dimensions.get('screen').width*0.6, 
    backgroundColor:COLORS.iconColor,
    paddingHorizontal:40,
    paddingVertical:8,
    borderRadius:12,
    marginVertical:10,
  },
  buttonText:{
    color:COLORS.textColor,
    fontFamily:'GoogleSans-Medium',
    fontSize:16,
    textAlign:'center',
  },

});

export default SupportCreateModal;