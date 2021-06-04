import React,{useState, useEffect, useMemo} from "react";
import { TouchableOpacity } from "react-native"
import { StyleSheet, Text, View,ActivityIndicator } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import RequestManager from "../utils/requestManager"
import RNSecureStorage from "rn-secure-storage"
import {endpoints} from "../utils/constants"
import { COLORS } from "../constants/theme";

const ReadButton = (data) => {
  const [userInfo, setUserInfo] = useState(false)
  const [fetching, setFetching] = useState(false)
  const completePercent=Math.ceil(((Number(data?.page)/Number(data?.pageAll))*100))

  const getCategories = useMemo(
    async() =>
      RequestManager({
        method: endpoints.ownedProducts.method,
        url: endpoints.ownedProducts.path,
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
      .then(res => { let count=0;
        for(let index = 0; index < res.length; index++) {
          if(res[index].id===data.id){count++;}
        }
        if(count>0){setUserInfo(true)}
        setTimeout(() => {setFetching(false)},1000)
      })
      .catch(err => {console.log(err),setUserInfo(false)})
  }, [getCategories])
  
  if(userInfo){
    return (
      <TouchableOpacity activeOpacity={0.9} style={({ pressed }) => (pressed ? { opacity: 0.9 } : { opacity: 1 })} onPress={data?.bookViewPress}>
        <View style={[styles.buttonContainer, { backgroundColor:COLORS.primary }]}>
          <View style={styles.buttonContent}>
            <View style={styles.buttonTextAndIcon}>
              <Icon name="book" size={24} color={COLORS.textColorLight} />
              <Text style={styles.readButtonText}> 
                {data?.pageAll>0
                  ? data?.pageAll===data?.page 
                    ?'Kitabı Tekrar Oku' 
                    :'Okumaya Devam Et'
                  :  'Okumaya Başla'
                } 
              </Text>
            </View>
            <View style={styles.readButtonCompleteView}>
              <Text style={styles.readButtonCompletePercent}>
                {data.pageAll>0 
                  ? data.page+'/'+data.pageAll
                  :' ' 
                } 
              </Text>
            </View>
          </View>
          <View style={[styles.completePercentView, { 
            width: Number(data?.page)!==1 && Number(data?.pageAll)!==1 
              ? completePercent+5 + "%"
              : 0   
            }]} />
        </View>
      </TouchableOpacity>
    )
  }else{
    return (
      <TouchableOpacity activeOpacity={0.9} style={({ pressed }) => (pressed ? { opacity: 0.9 } : { opacity: 1 })} onPress={  data?.closed?null : data?.buyStatus? data?.bookViewPress :data?.onPress}>
        <View style={[styles.buttonContainer, { backgroundColor:COLORS.primary }]}>
          <View style={styles.buttonContent}>
            <View style={styles.buttonTextAndIcon}>
              {data.loading
                ? <ActivityIndicator color={COLORS.textColorLight} />
                : <Icon name={data?.buyStatus?'book':"basket"} size={24} color={COLORS.textColorLight} />
              }
              <Text style={styles.readButtonText}>{data.text}</Text>
            </View>
            <View style={styles.readButtonCompleteView}>
              <Text style={styles.readButtonCompletePercent}> {data?.buyStatus?null:data.price}</Text>
            </View>
          </View>
          <View style={[styles.completePercentView, {width:0}]} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buyButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color:COLORS.textColorLight,
    paddingLeft: 6,
  },
  buyButtonPrice: {
    textAlign: "center",
    fontFamily:'GoogleSans-Bold',
    padding: 14,
    fontSize: 18,
    color: COLORS.textColorLight
  },

  buttonContainer: {
    height: 54,
    width: "100%",
    flex: 1,
    borderRadius: 10,
    shadowColor:COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonTextAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  readButtonText: {
    textAlign: "center",
    fontFamily:'GoogleSans-Medium',
    fontSize: 14,
    color:COLORS.textColorLight,
    paddingLeft: 6,
  },
  readButtonCompleteView: {
    flexDirection: "column",
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    height:54,
  },
  readButtonCompletePercent: {
    textAlign: "right",
    fontFamily:'GoogleSans-Medium',
    fontSize: 16,
    color:COLORS.textColorLight,
    paddingHorizontal:5,
  },
  readButtonCompleteTitle: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 12,
    color:COLORS.textColorLight,
  },

  completePercentView: {
    position: "absolute",
    height:6,
    backgroundColor: "#ffffff60",
    borderRadius:10,
    borderTopLeftRadius: 0,
    bottom: 0,
  },
})
module.exports = {  ReadButton: ReadButton }
