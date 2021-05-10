import React, {useState, useEffect} from 'react'
import {View, Text, FlatList,StatusBar } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import { BASE_URL} from "../../utils/constants"
import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import  Icon  from "react-native-vector-icons/Ionicons"
import  FontAwesome from "react-native-vector-icons/FontAwesome5"
import SupportCreateModal from '../../components/SupportCreateModal'
import SupportMessageList from '../../components/SupportMessageList'
import BeingIndicator from '../../components/Indicator/BeingIndicator';
import RNSecureStorage from "rn-secure-storage"
import axios from "axios"
import { TouchableOpacity } from 'react-native'

export default function SupportScreen({navigation,route}) {
    const [supportData, setSupportData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [supportCreateModal, setSupportCreateModal] = useState(false)
    const [response, setResponse] = useState(true)
    const [permisson, setPermisson] = useState(true)

    useFocusEffect(
      React.useCallback(() => {
        SupportCreate()
      },[])
    );

    const SupportCreate = async()=>{
      setFetching(true)
      try {
        let config = {
          headers: {
            Accept: "application/jsonsss",
            Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
          }
        }
        await axios.get(`${BASE_URL+'api/private/support-records'}`, config)
          .then(response =>{
            setSupportData(response.data)
            setFetching(false)
            SupportControl(response.data)
            console.log(response.data)
            //console.log(response)
          });
        }catch (error) {
          console.log(error)
          setFetching(false)
          setSupportData(false)
        }
      }

      const SupportControl =(res)=>{
        let count=0;
        for (let index = 0; index < res.length; index++) {
          if(res[index].status=='PENDING'){
            count++;
          }
        }
        if(count>3){
          setPermisson(false)
        }else{
          setPermisson(true)
        }
      }

    return (
        <View style={{backgroundColor:'#f1f1f1', height:1000}}>
          {fetching 
        ? <View style={{ zIndex:1, height:Dimensions.get('screen').height, width:Dimensions.get('screen').width, justifyContent:'center',alignItems:'center', position:'absolute'}} >
            <BeingIndicator title={'Yenileniyor'} />
          </View>
        :null
      }
          <SafeAreaView  backgroundColor={'#1d3557'}  />
          <StatusBar backgroundColor={'#1d3557'} barStyle={'light-content'} />
            <View style={{width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#1d3557', paddingVertical:20, paddingHorizontal:15}} >
              <TouchableOpacity onPress={()=>setSupportCreateModal(!supportCreateModal)} >
                <Icon name="duplicate-outline" size={25} color={"#1d3557"}/>                 
              </TouchableOpacity>
              <Text style={{fontFamily:'GoogleSans-Medium', fontSize:18, color:'#fff'}} >Destek Mesajları</Text>
              <TouchableOpacity onPress={()=>setSupportCreateModal(!supportCreateModal)} >
                <Icon name="duplicate-outline" size={25} color={"#fff"}/>                 
              </TouchableOpacity>
            </View>
            {supportData.length>0
            ?<View>
              <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center'}} >
               <View style={{
                width:Dimensions.get('screen').width-20, backgroundColor:'#fff', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', margin:10, padding:10, borderRadius:8,
                shadowColor: "#000",
                shadowOffset: {
                width: 2,
                height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 2,
                }}>
                  <Text style={{fontFamily:'GoogleSans-Regular', color:'#333'}}>Toplam {supportData.length}  {permisson? 'true':'false'} destek talebiniz bulunmaktadır</Text> 
                </View>
            </View>
            <FlatList
              keyboardDismissMode="on-drag"
              keyExtractor={(item, index) => "search-result-item-" + index}
              scrollEnabled={true}
              horizontal={false}
              style={{minHeight:Dimensions.get('screen').height-100,}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={supportData}
              renderItem={({ item,index }) => {
                return(
                  <SupportMessageList item={item}  onPress={()=>navigation.push('DestekDetay', {'record_number':item.record_number, 'subject':item.subject})} />
                )
              }}
            />
          </View>
          :
          <View style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height*0.7,justifyContent:'center',alignItems:'center'}} >
            <View style={{width:Dimensions.get('screen').width-100, alignItems:'center'}} >
              <FontAwesome name="headset" size={60} color={"#118ab2"}/> 
              <Text style={{fontFamily:'GoogleSans-Medium', textAlign:'center', fontSize:20, paddingVertical:10, color:'#333'}} >Destek Oluştur</Text>
              <Text style={{fontFamily:'GoogleSans-Regular', textAlign:'center', color:'#555', fontSize:12}}>Uygulama veya satın alma ile ilgili herhangi bir problem yaşamanız durumunda bizimle iletişime geçebilirsiniz.</Text>
            </View>
          </View>
        }
        <SupportCreateModal
          visible={supportCreateModal}
          setVisible={()=>setSupportCreateModal(!supportCreateModal)}
          response={response}
          setResponse={()=>setResponse(false)}
          permisson={permisson}
        
        />
        </View>
    )
}
