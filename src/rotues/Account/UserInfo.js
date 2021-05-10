import React, {useEffect, useState, useMemo } from "react"
import { View, Text,StyleSheet } from 'react-native'
import RequestManager from "../../utils/requestManager"
import { endpoints } from "../../utils/constants"
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage"
import { TouchableOpacity } from "react-native-gesture-handler"
import UserBooksItem, { BooksItemPlaceholder } from "../../components/UserBookItem"
import ChangePassword from '../../components/ChangePassword'
import {logout} from "../../utils/requestManager"
import AsyncStorage from '@react-native-community/async-storage';
import  Icon  from "react-native-vector-icons/Ionicons"
import { Dimensions } from "react-native"
import { SafeAreaView, FlatList } from "react-native"
import { StatusBar } from "react-native"
import moment from 'moment'
import 'moment/locale/tr'
import { ScrollView } from "react-native"
moment.locale('tr')
export default function UserInfo({navigation}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
}, [navigation])

    const [userInfo, setUserInfo] = useState([])
    const [fetching, setFetching] = useState(false)
    const [ownedBooks, setOwnedBooks] = useState("")
    const [changePasswordModal, setChangePasswordModal] = useState(false)
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

    return (
      <>
      <SafeAreaView  backgroundColor={'#1d3557'}  />
      <StatusBar backgroundColor={'#1d3557'} barStyle={'light-content'} />
      <View style={styles.container}>
      
        <View style={styles.headerBackButtonContainer} >
            <TouchableOpacity style={{padding:10}} onPress={()=>navigation.goBack()} >
              <Icon name="chevron-back-outline" size={25} color={"#fff"}/> 
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kullanıcı Bilgileri</Text>
            <TouchableOpacity style={{padding:10}} onPress={null} >
              <Icon name="ellipsis-horizontal-outline" size={25} color={"#fff"}/> 
            </TouchableOpacity>
          </View>
          <ScrollView>
        <View style={styles.headerContainer} >
          <View>
            <Icon name={'person-circle-outline'} size={100} color={'#fff'} />
          </View>
          <Text style={styles.headerName}>
            {userInfo.first_name} 
            {' '}
            {userInfo.last_name}</Text>
        </View>
        <Text></Text>
        <View style={styles.itemTitle} >
          <Text style={styles.itemTitleText}>Kullanıcı Bilgileri</Text>
        </View>
        <View style={styles.itemContainer} >
        <View style={styles.itemArc}>
            <Text style={styles.itemOne}>İsim soyisim: </Text>
            <Text style={styles.itemTwo}>{userInfo.first_name} {userInfo.last_name} </Text>
          </View>
          <View  style={styles.itemArc}>
            <Text style={styles.itemOne}>Mail adresi: </Text>
            <Text style={styles.itemTwo} >{userInfo.email}</Text>
          </View>

          <View  style={styles.itemArc}>
            <Text style={styles.itemOne}>Parola:  </Text>
            <TouchableOpacity activeOpacity={0.4} onPress={()=>setChangePasswordModal(!changePasswordModal)} >
             <Text style={[styles.itemTwo, {fontFamily:'GoogleSans-Medium'}]}>Parolayı güncelle</Text>
            </TouchableOpacity>
          </View>

          <View  style={styles.itemArc}>
            <Text style={styles.itemOne}>Kayıt Tarihi: </Text>
            <Text style={styles.itemTwo}>
              {moment(userInfo.created_at).format('LLL')},
              {' '}
              {moment(userInfo.created_at).format('dddd')}</Text>
          </View>
         

         

        </View>
        <View style={styles.itemTitle}>
          <Text style={styles.itemTitleText}>Satın Alınan Kitaplar</Text>
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
                      ? <View style={{paddingLeft:20,}}>
                          <UserBooksItem sharedKey={"Kitaplar"} item={item}/>
                        </View> 
                      : <UserBooksItem sharedKey={"Kitaplar"} item={item}/>
                      // <Text style={{fontFamily:'GoogleSans-Regular', fontSize:14}} > * {item.title} </Text>
                    )
                }}
            />
          :
          <View style={{width:Dimensions.get('screen').width, flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
            <Icon name="information-circle-outline" size={25} color={"#333"}/> 
            <Text style={{fontFamily:'GoogleSans-Regular', color:'#333'}}> Şuana kadar hiç kitap satın alınmamış</Text>
          </View>
          }
        </View>
        <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center', marginVertical:20}} >
        <TouchableOpacity style={styles.logoutButton}  activeOpacity={0.9} onPress={()=>isLogoutUser()} >
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
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
        alignItems:'center'
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
    headerContainer:{
      justifyContent:'center', 
      alignItems:'center', 
      backgroundColor:'#1d3557', 
      width:Dimensions.get('window').width, 
      paddingVertical:20 
    },
    headerName:{
      fontFamily:'GoogleSans-Medium', 
      fontSize:20, 
      color:'#fff'
    },
    itemTitle:{ 
      width:Dimensions.get('window').width, 
      alignItems:'flex-start', 
      justifyContent:'flex-start', 
      paddingHorizontal:30, 
      paddingBottom:5, 
      paddingTop:10, 
      borderBottomColor:'#ccc', 
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
      backgroundColor:'#1d3557', 
      paddingVertical:10, 
      paddingHorizontal:30, 
      borderRadius:10
    },
    buttonText:{
      color:'#fff', 
      fontFamily:'GoogleSans-Regular'
    }
  })

