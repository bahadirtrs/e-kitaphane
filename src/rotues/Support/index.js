import React, {useState, useEffect} from 'react'
import {View, Text, FlatList,StatusBar } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import { BASE_URL} from "../../utils/constants"
import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import  Icon  from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import SupportCreateModal from '../../components/SupportCreateModal'
import SupportMessageList from '../../components/SupportMessageList'
import BeingIndicator from '../../components/Indicator/BeingIndicator';
import RNSecureStorage from "rn-secure-storage"
import axios from "axios"
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Switch } from 'react-native'
import { useTheme } from "@react-navigation/native"
import { EventRegister } from 'react-native-event-listeners'

export default function SupportScreen({navigation,route}) {
    const [supportData, setSupportData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [supportCreateModal, setSupportCreateModal] = useState(false)
    const [response, setResponse] = useState(true)
    const [permisson, setPermisson] = useState(true)
    const [pendingCount, setPendingCount] = useState(0)
    const [darkMode, setDarkMode] = useState(false)
    const {colors}=useTheme()
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
        setPendingCount(count);
      }
     
      useEffect(() => {
        AsyncStorage.getItem("useTheme").then(item =>{
          if(item==="true"){
            setDarkMode(true)
          }else{
            setDarkMode(false)
          }
        })
        return () => {
          true
        }
      }, [])

    return (
        <View style={{backgroundColor:colors.background, height:1000}}>
          {fetching 
        ? <View style={{ zIndex:1, height:Dimensions.get('screen').height, width:Dimensions.get('screen').width, justifyContent:'center',alignItems:'center', position:'absolute'}} >
            <BeingIndicator title={'Yenileniyor'} />
          </View>
        :null
      }
          <SafeAreaView  backgroundColor={colors.primary}  />
          <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
            <View style={{width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:colors.primary, paddingVertical:20, paddingHorizontal:15}} >
              <TouchableOpacity onPress={()=>setSupportCreateModal(!supportCreateModal)} >
                <Icon name="duplicate-outline" size={25} color={colors.primary}/>                 
              </TouchableOpacity>
              <Text style={{fontFamily:'GoogleSans-Medium', fontSize:18, color:colors.textColorLight}}>Destek Mesajları</Text>
              <TouchableOpacity onPress={()=>setSupportCreateModal(!supportCreateModal)} >
                <Icon name="duplicate-outline" size={25} color={colors.textColorLight}/>                 
              </TouchableOpacity>
            </View>
            {supportData.length>0
            ?<View>
              <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center'}} >
               <View style={{
                width:Dimensions.get('screen').width-20, backgroundColor:colors.card, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', margin:10, padding:10, borderRadius:8,
                shadowColor:colors.shadow,
                shadowOffset: {
                width: 2,
                height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 2,
                }}>{pendingCount>0
                  ?<Text style={{fontFamily:'GoogleSans-Regular', color:colors.text}}>Yanıt bekleyen {pendingCount?pendingCount:0} destek talebiniz bulunmaktadır</Text> 
                  :<Text style={{fontFamily:'GoogleSans-Regular', color:colors.text}}>Yanıt bekleyen destek talebiniz bulunmamaktadır</Text> 
                }
                  
                </View>
            </View>
            <FlatList
              keyboardDismissMode="on-drag"
              keyExtractor={(item, index) => "search-result-item-" + index}
              scrollEnabled={true}
              horizontal={false}
              inverted={true}
              style={{minHeight:Dimensions.get('screen').height-280}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              justifyContent={'flex-end'}
              data={supportData}
              renderItem={({ item,index }) => {
                return(
                  <SupportMessageList item={item}  onPress={()=>navigation.push('DestekDetay', {'record_number':item.record_number, 'subject':item.subject, 'item':item})} />
                )
              }}
            />
          </View>
          :
          <View style={{ backgroundColor:colors.background, width:Dimensions.get('screen').width, height:Dimensions.get('screen').height*0.7,justifyContent:'center',alignItems:'center'}} >
            <View style={{width:Dimensions.get('screen').width-100, alignItems:'center', paddingBottom:50}} >
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
        <SafeAreaView backgroundColor={colors.background} />
        </View>
    )
}
