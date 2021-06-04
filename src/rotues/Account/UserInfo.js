import React, {useEffect, useState, useMemo } from "react"
import {View, Text,StyleSheet,Dimensions, SafeAreaView, FlatList,StatusBar, Image  } from 'react-native'
import RequestManager from "../../utils/requestManager"
import {endpoints } from "../../utils/constants"
import RNSecureStorage from "rn-secure-storage"
import {TouchableOpacity } from "react-native-gesture-handler"
import UserBooksItem from "../../components/UserBookItem"
import ChangePassword from '../../components/ChangePassword'
import {logout} from "../../utils/requestManager"
import AsyncStorage from '@react-native-community/async-storage';
import Icon  from "react-native-vector-icons/Ionicons"
import BeingIndicator from '../../components/Indicator/BeingIndicator'
import moment from 'moment'
import 'moment/locale/tr'
import { ScrollView } from "react-native"
import { COLORS } from "../../constants/theme"
import { Switch } from "react-native"
import { EventRegister } from 'react-native-event-listeners'
import { useTheme } from "@react-navigation/native"
import { useFocusEffect } from "@react-navigation/native"
moment.locale('tr')
let user_image=null;

export default function UserInfo({navigation}) {
    const {colors}=useTheme()
    const [userInfo, setUserInfo] = useState([])
    const [fetching, setFetching] = useState(false)
    const [ownedBooks, setOwnedBooks] = useState("")
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

    const getCategories = useMemo(async() =>
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

      useEffect(() => {
        setFetching(true)
        getCategories
          .then(res => {
            setUserInfo(res)
            getProduct()
            setTimeout(() => {setFetching(false)}, 1000)
          })
          .catch(err => {
            console.log(err)
            setUserInfo(false)
          })
      }, [getCategories])
      
      const isLogoutUser = async () => {
        logout()
        navigation.replace('Anasayfa') 
        await AsyncStorage.removeItem('token');
      }

      const getProduct = async()=>{
        user_image = await RNSecureStorage.get("photo")
        setFetching(true)
        RequestManager({
          method: endpoints.ownedProducts.method,
          url: endpoints.ownedProducts.path,
          auth: false,
          headers: {
            Accept: "application/jsonsss",
            Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
          },
        })
        .then(res => {
          setOwnedBooks(res)
          setFetching(false)
        })
        .catch(err => {
          console.log("err", err)
          setOwnedBooks(false)
          setFetching(false)
        })
      }

    
  useFocusEffect(
    React.useCallback(() => {
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
  );


    return (
      <>
      {fetching
      ?<View style={styles.activityContainer} >
          <BeingIndicator title={'Bilgiler alınıyor...'} />
       </View>
      :null
      }
      <SafeAreaView  backgroundColor={colors.primary}  />
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <View style={styles.headerBackButtonContainer} >
            <TouchableOpacity style={{padding:10}} onPress={()=>navigation.goBack()} >
              <Icon name="chevron-back-outline" size={25} color={colors.textColorLight}/> 
            </TouchableOpacity>
            <Text style={[styles.headerTitle,{color:colors.textColorLight}]}>Kullanıcı Bilgileri</Text>
            <TouchableOpacity style={{padding:10}} onPress={null} >
              <Icon name="ellipsis-horizontal-outline" size={25} color={COLORS.textColorLight}/> 
            </TouchableOpacity>
          </View>
          <ScrollView>
        <View style={styles.headerContainer} >
          <View>
            {user_image
            ? <Image source={{uri: user_image}} style={{width:100, height:100, borderRadius:50}}  />
            : <Icon name={'person-circle-outline'} size={100} color={'#fff'}/>
            }
          </View>
          <Text style={styles.headerName}>
            {userInfo.first_name} 
            {' '}
            {userInfo.last_name}</Text>
        </View>
        <Text></Text>
        <View style={[styles.itemTitle,{borderBottomColor:colors.border}]} >
          <Text style={[styles.itemTitleText,{color:colors.text}]}>Kullanıcı Bilgileri</Text>
        </View>
        <View style={styles.itemContainer} >
        <View style={styles.itemArc}>
            <Text style={[styles.itemOne,{color:colors.text}]}>İsim soyisim: </Text>
            <Text style={[styles.itemTwo,{color:colors.text}]}>{userInfo.first_name} {userInfo.last_name} </Text>
          </View>
          <View  style={styles.itemArc}>
            <Text style={[styles.itemOne,{color:colors.text}]}>Mail adresi: </Text>
            <Text style={[styles.itemTwo,{color:colors.text}]}>{userInfo.email}</Text>
          </View>
{

          <View  style={styles.itemArc}>
            <Text style={[styles.itemOne,{color:colors.text}]}>Parola:</Text>
            <TouchableOpacity activeOpacity={0.4} onPress={()=>setChangePasswordModal(!changePasswordModal)} >
             <Text style={[styles.itemTwo,{fontFamily:'GoogleSans-Medium',color:colors.text}]}>Parolayı güncelle</Text>
            </TouchableOpacity>
          </View>

}
          <View  style={styles.itemArc}>
            <Text style={[styles.itemOne,{color:colors.text}]}>Kayıt Tarihi: </Text>
            <Text style={[styles.itemTwo,{color:colors.text}]}>
              {moment(userInfo.created_at).format('LLL')},
              {' '}
              {moment(userInfo.created_at).format('dddd')}</Text>
          </View>
        </View>
        <View style={[styles.itemTitle,{borderBottomColor:colors.border}]} >
          <Text style={[styles.itemTitleText,{color:colors.text}]}>Satın Alınan Kitaplar</Text>
        </View>
        <View style={styles.listContainer} >
          {ownedBooks.length>0
          ?<FlatList
              keyExtractor={(item, index) => "search-result-item-" + index}
              scrollEnabled={true}
              //inverted={true}
              horizontal={true}
              scrollEnabled={true}
              alignItems={'center'}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={ownedBooks}
                renderItem={({ item,index }) => {
                    return (
                      index==0 
                      ? <View style={{paddingLeft:20}}>
                          <UserBooksItem sharedKey={"Kitaplar"} item={item}/>
                        </View> 
                      : <UserBooksItem sharedKey={"Kitaplar"} item={item}/>
                      // <Text style={{fontFamily:'GoogleSans-Regular', fontSize:14}} > * {item.title} </Text>
                    )
                }}
            />
          :
          <View style={styles.noBookContainer} >
            <Icon name="information-circle-outline" size={25} color={colors.text}/> 
            <Text style={[styles.noBookText,{color:colors.text}]}>
              {'Şuana kadar hiç kitap satın alınmamış.'}
            </Text>
          </View>
          }
        </View>
        
        <View style={styles.logoutButtonContainer} >
          <TouchableOpacity style={styles.logoutButton}  activeOpacity={0.9} onPress={()=>isLogoutUser()} >
            <Text style={styles.buttonText}>
              {'Çıkış Yap'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:30, paddingVertical:10}} >
        <Text style={{fontFamily:'GoogleSans-Regular', fontSize:16, color:colors.text}} >Karanlık Mod {darkMode?'(Açık)': '(Kapalı)'} </Text> 
        <Switch 
          trackColor={{ false:colors.primary, true:'#40916c'}}
          value={darkMode} onValueChange={(val)=>{
              setDarkMode(!darkMode)
              AsyncStorage.setItem("useTheme",String(val)); 
              EventRegister.emit('useThemeDeg', val)
            }}  />
        </View>

        <ChangePassword
          first_name={userInfo.first_name}
          last_name={userInfo.last_name}
          email={userInfo.email}
          visible={changePasswordModal}
          setVisible={()=>setChangePasswordModal(!changePasswordModal)}
        />
        </ScrollView>
      </View>
      </>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    headerBackButtonContainer:{
      width:Dimensions.get('window').width,
      backgroundColor:COLORS.primary,
      flexDirection:'row',
      justifyContent:'space-between', 
      alignItems:'center', 
      paddingHorizontal:10 
    },
    headerTitle:{
      fontSize:14, 
      fontFamily:'GoogleSans-Medium', 
    },
    headerContainer:{
      justifyContent:'center', 
      alignItems:'center', 
      backgroundColor:COLORS.primary,
      width:Dimensions.get('window').width, 
      paddingVertical:20 
    },
    headerName:{
      fontFamily:'GoogleSans-Medium', 
      fontSize:20, 
      color:COLORS.textColorLight
    },
    itemTitle:{ 
      width:Dimensions.get('window').width, 
      alignItems:'flex-start', 
      justifyContent:'flex-start', 
      paddingHorizontal:30, 
      paddingBottom:10, 
      paddingTop:10, 
      borderBottomWidth:1
    },
    itemTitleText:{
      fontSize:18, 
      fontFamily:'GoogleSans-Medium'
    },
    itemContainer:{
      width:Dimensions.get('window').width, 
      justifyContent:'center', 
      alignItems:'flex-start', 
      paddingVertical:10, 
      paddingHorizontal:30
    },
    itemArc:{
      flexDirection:'row', 
      justifyContent:'flex-start',
      alignItems:'center', paddingVertical:3
    },
    itemOneText:{
      fontFamily:'GoogleSans-Medium', 
      fontSize:14
    },
    itemTwo:{
      fontFamily:'GoogleSans-Regular', 
      fontSize:14
    },
    listContainer:{
      width:Dimensions.get('window').width, 
      justifyContent:'center', 
      alignItems:'flex-start', 
      paddingVertical:10, 
      paddingHorizontal:0
    },
    logoutButton:{
      justifyContent:'center',
      alignItems:'center',
      width:300,
      backgroundColor:COLORS.primary,
      paddingVertical:10, 
      paddingHorizontal:30, 
      borderRadius:10
    },
    buttonText:{
      color:COLORS.textColorLight,
      fontFamily:'GoogleSans-Regular'
    },
    noBookContainer:{
      width:Dimensions.get('screen').width, 
      flexDirection:'row', 
      justifyContent:'center', 
      alignItems:'center'
    },
    noBookText:{
      fontFamily:'GoogleSans-Regular', 
      color:COLORS.textColor
    },
    logoutButtonContainer:{
      width:Dimensions.get('screen').width, 
      justifyContent:'center', 
      alignItems:'center', 
      marginVertical:20
    },

    activityContainer:{
       zIndex:1, 
       width:Dimensions.get('screen').width, 
       height:Dimensions.get('screen').height, 
       position:'absolute', 
       justifyContent:'center',
      alignContent:'center'
    },
  })

