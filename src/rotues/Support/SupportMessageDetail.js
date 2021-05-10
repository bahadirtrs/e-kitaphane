import React, {useState, useEffect} from 'react'
import { View, Text, FlatList,StatusBar,StyleSheet,TouchableOpacity } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import { BASE_URL} from "../../utils/constants"
import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import SupportMessageItem from '../../components/SupportMessageItem'
import Icon from "react-native-vector-icons/Ionicons"
import axios from "axios"

export default function SupportMessageDetail({navigation, route}) {
    const record_number= route.params.record_number
    const subject= route.params.subject
    const [message, setMessage] = useState([])
    
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
    
    return (
      <View>
        <SafeAreaView  backgroundColor={'#1d3557'}  />
        <StatusBar backgroundColor={'#1d3557'} barStyle={'light-content'} />
        <View style={styles.headerBackButtonContainer} >
          <TouchableOpacity style={{padding:0}} onPress={()=>navigation.goBack()} >
            <Icon name="chevron-back-outline" size={25} color={"#fff"}/> 
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Destek mesajları</Text>
          <TouchableOpacity style={{padding:10}} onPress={null} >
            <Icon name="ellipsis-horizontal-outline" size={25} color={"#fff"}/> 
          </TouchableOpacity>
        </View>
        <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center', padding:10, backgroundColor:'#bbb'}} >
          <Text style={{fontFamily:'GoogleSans-Medium',textAlign:'center', color:'#1d3557'}} >{subject}</Text>
        </View>
        <View style={{paddingTop:20 }} >
          <FlatList
            keyboardDismissMode="on-drag"
            keyExtractor={(item, index) => "search-result-item-" + index}
            scrollEnabled={true}
            horizontal={false}
            style={{minHeight:Dimensions.get('screen').height-100,}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={message.messages}
            renderItem={({ item,index }) => {
              return (
                <SupportMessageItem item={item} name={message.full_name} />
              )
            }}
          />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
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
})


{
    /*
    
{
  "id": 9,
  "subject": "Kitap satın alınamadı",
  "customer_id": "215",
  "customer_first_name": "Bahadır",
  "customer_last_name": "Tıraş",
  "customer_email": "bahadirtiras@gmail.com",
  "record_number": "a5RG2VJS",
  "status": "ANSWERED",
  "created_at": "2021-05-09T08:23:39.000000Z",
  "updated_at": "2021-05-09T08:50:28.000000Z",
  "readable_status": "Yanıtlandı",
  "full_name": "Bahadır Tıraş",
  "messages": [
    {
      "id": 16,
      "support_records_id": 9,
      "staff_id": null,
      "message": "Dün satın aldığım Tutusddnamayanlar adlı kitap hala sistemime düşmedi",
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