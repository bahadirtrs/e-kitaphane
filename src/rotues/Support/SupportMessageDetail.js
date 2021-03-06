import React, {useState, useEffect} from 'react'
import { View, Text, FlatList,StatusBar,StyleSheet,TouchableOpacity,TextInput } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import { BASE_URL, CLIENT_ID} from "../../utils/constants"
import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import SupportMessageItem from '../../components/SupportMessageItem'
import Icon from "react-native-vector-icons/Ionicons"
import axios from "axios"
import { KeyboardAvoidingView } from 'react-native'
import { useTheme } from "@react-navigation/native"

export default function SupportMessageDetail({navigation, route}) {
    const {colors}=useTheme()
    const record_number= route.params.record_number
    const subject= route.params.subject
    const item= route.params.item
    const [message, setMessage] = useState([])
    const [messageTerm, setMessageTerm] = useState("")
    
    useFocusEffect(
      React.useCallback(() => {
        getMessageDetail()
      },[])
    );

    const getMessageDetail = async ()=>{
      try{
        let config = {headers:{Accept: "application/jsonsss"}}
        await axios.get(`${BASE_URL+'api/support-record?recordNumber='}`+record_number, config)
          .then(response =>{
            setMessage(response.data)
            console.log(response.data.messages)
          });
      }catch (error) {
        console.log(error)
      }
    }

    const SendMessage = async()=>{
      try {
        let data= { 
          client_id:CLIENT_ID,
          record_number:record_number,
          message:messageTerm,
        };
        await axios.post(`${BASE_URL+'api/send-message'}`, data)
        .then(response =>{
          let record_number=response.data.recordNumber
          getMessageDetail()
          push("DestekDetay", {'record_number':record_number, 'subject':subject}) 
          }
        );
      } catch (error) {
        console.log(error)
      }
    }
    
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container, {backgroundColor:colors.background}]}>
        <SafeAreaView backgroundColor={'#1d3557'} />
        <View style={styles.inner}>
          <View style={{paddingBottom:0}} >
            <View style={styles.headerBackButtonContainer} >
              <TouchableOpacity style={{padding:0}} onPress={()=>navigation.goBack()} >
                <Icon name="chevron-back-outline" size={25} color={colors.textColorLight}/> 
              </TouchableOpacity>
              <Text style={[styles.headerTitle,{color:colors.textColorLight}]}>Destek mesajlar??</Text>
              <TouchableOpacity style={{padding:10}} onPress={null} >
                <Icon name="ellipsis-horizontal-outline" size={25} color={colors.textColorLight}/> 
              </TouchableOpacity>
            </View>
            <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center', padding:5, backgroundColor:colors.card}} >
              <Text style={{fontFamily:'GoogleSans-Medium',textAlign:'center', color:colors.text}} >{subject}</Text>
            </View>
          </View>

            <View style={{paddingTop:0, flex:10}} >
              <FlatList
                keyboardDismissMode="on-drag"
                keyExtractor={(item, index) => "search-result-item-" + index}
                scrollEnabled={true}
                horizontal={false}
                style={{padding:10}}
                data={message.messages}
                renderItem={({ item,index }) => {
                  return (
                    <SupportMessageItem item={item} name={message.full_name} />
                  )
                }}
              />
            </View>
         <View style={{flex:1.2, paddingTop:10}} >
          {message.status!=='ANSWERED'
          ? <View style={[styles.footerContainer, {paddingBottom:Platform.OS === "ios" ? 5 :25, backgroundColor:colors.background}]} >
              <View style={[styles.footerContainerExp,{backgroundColor:colors.card}]}>
                {message.status==='CLOSED'
                  ? <Text style={[styles.pendingFooterText,{color:colors.text}]}>Bu destek kayd?? kapat??lm????t??r. Hala sorun ya????yorsan??z l??tfen yeni bir destek kayd?? olu??turunuz.</Text>
                  : <Text style={[styles.pendingFooterText,{color:colors.text}]}>M????teri Temsilcisi destek kayd??n??z?? cevaplayana kadar, tekrardan mesaj g??nderemezsiniz.</Text> 
                }
              </View>
            </View>
          : <View style={[styles.footerContainer, {paddingBottom:Platform.OS === "ios" ? 5 :30, backgroundColor:colors.background}]} >
              <TextInput
                  style={[styles.textInputSubject,{color:colors.text, borderColor:colors.border}]}
                  placeholder={"Mesaj Yaz"}
                  placeholderTextColor={colors.text}
                  value={messageTerm}
                  onChangeText={(text)=>setMessageTerm(text)}
                  textAlignVertical='auto'
                  keyboardType={'default'}
                  autoCapitalize={'none'}
                  multiline={true}
                />
                <TouchableOpacity onPress={()=>SendMessage()} style={styles.submitButtonContainer} >
                  <Icon name="arrow-up-outline" size={22} color={"#fff"}/> 
                </TouchableOpacity>
              </View>
          }
          </View>
        </View>      
        <SafeAreaView backgroundColor={colors.background} />
      </KeyboardAvoidingView>
    );
  };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:'#f8f8f8'
      },
      inner: {
        flex: 1,
        justifyContent: "space-between"
      },
      header: {
        fontSize: 36,
        marginBottom: 48
      },
    
      btnContainer: {
        backgroundColor: "white",
        marginTop: 12
      },
      headerBackButtonContainer:{
        width:Dimensions.get('window').width,
        backgroundColor:'#1d3557',
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center', 
        paddingHorizontal:10 
      },
    
      headerTitle:{
        fontSize:14, 
        fontFamily:'GoogleSans-Medium', 
        color:'#fff'
      },
    
      textInputSubject:{ 
        width:Dimensions.get('screen').width*0.8, 
        fontFamily:'GoogleSans-Regular',
        borderWidth:1, 
        borderRadius:0, 
        fontSize:14, 
        margin:5,
        padding:10,
      },
      footerContainer:{
        backgroundColor:'#f8f8f8',
        position:'absolute',
        flexDirection:'row',
        width:Dimensions.get('screen').width, 
        justifyContent:'center',
        alignItems:'center',
        bottom:0,
        paddingTop:0,
      }, 
      footerContainerExp:{
        backgroundColor:'#fff',
        position:'absolute',
        flexDirection:'row',
        width:Dimensions.get('screen').width*0.85, 
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        bottom:15,
        paddingTop:5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2
      }, 
      pendingFooterText:{
        textAlign:'center',
        fontFamily:'GoogleSans-Regular',
        color:'#555',
        padding:5,
      },
      submitButtonContainer:{
        justifyContent:'center',
        alignItems:'center',
        height:34,
        width:34,
        backgroundColor:'#40916c',
        borderRadius:20,
      }
    });



{
    /*
    
{
  "id": 9,
  "subject": "Kitap sat??n al??namad??",
  "customer_id": "215",
  "customer_first_name": "Bahad??r",
  "customer_last_name": "T??ra??",
  "customer_email": "bahadirtiras@gmail.com",
  "record_number": "a5RG2VJS",
  "status": "ANSWERED",
  "created_at": "2021-05-09T08:23:39.000000Z",
  "updated_at": "2021-05-09T08:50:28.000000Z",
  "readable_status": "Yan??tland??",
  "full_name": "Bahad??r T??ra??",
  "messages": [
    {
      "id": 16,
      "support_records_id": 9,
      "staff_id": null,
      "message": "D??n sat??n ald??????m Tutusddnamayanlar adl?? kitap hala sistemime d????medi",
      "sender": "CUSTOMER",
      "created_at": "2021-05-09T08:23:39.000000Z",
      "updated_at": "2021-05-09T08:23:39.000000Z"
    },
    {
      "id": 17,
      "support_records_id": 9,
      "staff_id": 1,
      "message": "neden acaba",
      "sender": "SYSTEM",
      "created_at": "2021-05-09T08:25:11.000000Z",
      "updated_at": "2021-05-09T08:25:11.000000Z"
    }
  ]
}

    */

    
}