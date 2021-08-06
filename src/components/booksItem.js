import {StyleSheet, Text, View, Dimensions } from "react-native"
import FastImage from "react-native-fast-image"
import React, {useState, useEffect, useMemo} from "react"
import { useNavigation } from "@react-navigation/native"
import { BASE_URL, bookCoverRatio } from "../utils/constants"
import { numberFormat } from "../utils/utils"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { TouchableOpacity } from "react-native"
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"

import RequestManager from "../utils/requestManager"
import RNSecureStorage from "rn-secure-storage"
import {endpoints} from "../utils/constants"
import { Alert } from "react-native"

export default function BooksItem({ item, sharedKey, getOwnedProducts }) {
  const {colors}=useTheme()
  const { push } = useNavigation()
  const [fetching, setFetching] = useState(false)
  const [userInfo, setUserInfo] = useState(false)

  useEffect(() => {
    setFetching(true)
    getOwnedProducts
      .then(res => { 
        console.log(res)
        let count=0;
        for(let index = 0; index < res.length; index++) {
          if(res[index].id===item.id){count++;}
        }
        if(count>0){
          setUserInfo(true)}
        setTimeout(() => {
          setFetching(false)
        },1000)
      })
      .catch(err => {
        console.log(err),
        setUserInfo(false)
      })
  }, [getOwnedProducts])

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} 
      onPress={() => push("BookDetail", {sharedKey: sharedKey, item: item , image:item?.cover_image })}
    >
      <View style={styles.bookImage}>
        <View>
        <FastImage
          style={[styles.bookCoverImage,{borderColor:colors.border}]}
          source={{
            uri: BASE_URL + "products/cover/" + item?.cover_image,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {userInfo
        ? <TouchableOpacity style={styles.infoContainer} onPress={()=>Alert.alert('Ürün kütüphanede mevcut','Bu kitabı daha önceden satın aldınız.')} >
            <Icon name={'checkmark-done-outline'} size={12} color={colors.primary}/>
          </TouchableOpacity>
      :null
        }
        </View>
      </View>
      <View>
        <View >
          <Text style={[styles.title,{color:colors.text}]} numberOfLines={1}>
            {item?.title}
          </Text>
        </View>
        <View >
          <Text style={[styles.author,{color:colors.text}]}numberOfLines={1}>
            {item?.author}
          </Text>
        </View>
          <Text style={[styles.price,{color:colors.text}]} numberOfLines={1}>
            {numberFormat(item?.price)} ₺
          </Text>
      </View>
    </TouchableOpacity>
  )
}
export const BooksItemPlaceholder = () => {
  const {colors}=useTheme()
  return (
    <View style={{ height: "auto", margin: 12 }}>
      <View>     
      { //<SkeletonPlaceholder backgroundColor={colors.scale} highlightColor={colors.card} ></SkeletonPlaceholder>
      }
        <View style={{ backgroundColor:colors.scale,   width: 130, height: 130 * bookCoverRatio,borderRadius: 8  }} />
        <View style={{ backgroundColor:colors.scale, marginTop: 6, width: 120, height: 24, borderRadius: 4 }} />
        <View style={{ backgroundColor:colors.scale,  marginTop: 6, width: 80, height: 12, borderRadius: 4 }} />
        <View style={{ backgroundColor:colors.scale,  marginTop: 6, width: 30, height: 12, borderRadius: 4 }} />
      </View>   
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('screen').width/3,
    justifyContent:'center',
    alignItems:'flex-start',
    margin:12
  },
  title: {
    fontFamily:'GoogleSans-Medium',
    fontSize: 13,
    lineHeight: 20,
    color:COLORS.textColor,
    paddingTop: 5,
    paddingHorizontal:3
  },
  author: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 12,
    color:COLORS.textColor,
    paddingTop:2,
    paddingHorizontal:3

  },
  price: {
    paddingTop: 2,
    textAlign: "left",
    fontFamily:'GoogleSans-Bold',
    fontSize: 16,
    color:COLORS.textColor,
    paddingHorizontal:3

  },
  bookImage: {
    shadowColor:COLORS.shadow,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bookCoverImage: {
      borderWidth: 1.5,
      width:Dimensions.get('screen').width/3,
      height:Dimensions.get('screen').width/3 * bookCoverRatio,
      borderRadius: 6,
    
  },
  infoContainer:{
    justifyContent:'center', 
    alignItems:'center', 
    height:18, 
    width:18, 
    bottom:5, 
    right:5,
    backgroundColor:'#fff', 
    position:'absolute', 
    borderRadius:15
  }
})
