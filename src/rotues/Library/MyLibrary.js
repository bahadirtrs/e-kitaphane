import React, {useEffect, useState, useMemo } from "react"
import { View, Text,StyleSheet,FlatList } from 'react-native'
import RequestManager from "../../utils/requestManager"
import { endpoints } from "../../utils/constants"
import RNSecureStorage from "rn-secure-storage"
import { TouchableOpacity } from "react-native-gesture-handler"
import {logout} from "../../utils/requestManager"
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from "react-native"

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
<>
<SafeAreaView/>
        <FlatList
              keyboardDismissMode="on-drag"
              keyExtractor={(item, index) => "search-result-item-" + index}
              scrollEnabled={true}
              horizontal={false}
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={userInfo}
                renderItem={({ item,index }) => {
                    return (
                        <View style={styles.container} >
                        <Text>{item.product_id}</Text>
                        <Text>{item.payment_type}</Text>
                        <Text>{item.status}</Text>
                    
                      </View>
                    )
                }}
            />
            <TouchableOpacity activeOpacity={0.9} onPress={()=>isLogoutUser()} >
            <Text>Çıkış Yap</Text>
          </TouchableOpacity>
      </>
    )
}
const styles = StyleSheet.create({
    container:{
        width:150,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
})
