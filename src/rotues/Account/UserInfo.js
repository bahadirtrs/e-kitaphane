import React, {useEffect, useState, useMemo } from "react"
import { View, Text,StyleSheet } from 'react-native'
import RequestManager from "../../utils/requestManager"
import { endpoints } from "../../utils/constants"
import RNSecureStorage from "rn-secure-storage"
import { TouchableOpacity } from "react-native-gesture-handler"
import {logout} from "../../utils/requestManager"
import AsyncStorage from '@react-native-community/async-storage';

export default function UserInfo({navigation}) {
    const [userInfo, setUserInfo] = useState([])
    const [fetching, setFetching] = useState(false)
    const getCategories = useMemo(
        async() =>
          RequestManager({
            method: endpoints.orders.method,
            url: endpoints.orders.path,
            auth: false,
            headers: {
              Accept: "application/jsonsss",
              Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
            },
          }),
        [],
      )
      useEffect(() => {
        setFetching(true)
        getCategories
          .then(res => {
            setUserInfo(res)
            console.log(JSON.stringify(userInfo))
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
    return (
      <View style={styles.container} >
        <Text>{userInfo.first_name}</Text>
        <Text>{userInfo.last_name}</Text>
        <Text>{userInfo.email}</Text>
        <Text>{userInfo.password}</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>isLogoutUser()} >
          <Text>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
})
