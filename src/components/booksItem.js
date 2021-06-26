import {StyleSheet, Text, View, Dimensions } from "react-native"
import FastImage from "react-native-fast-image"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { BASE_URL, bookCoverRatio } from "../utils/constants"
import { numberFormat } from "../utils/utils"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { TouchableOpacity } from "react-native"
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native"


export default function BooksItem({ item, sharedKey }) {
  const {colors}=useTheme()
  const { push } = useNavigation()
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
  return (
    <View style={{ height: "auto", margin: 12 }}>
      <SkeletonPlaceholder>
        <View style={{ width: 150, height: 150 * bookCoverRatio }} />
        <View style={{ marginTop: 6, width: 120, height: 28, borderRadius: 4 }} />
        <View style={{ marginTop: 6, width: 80, height: 14, borderRadius: 4 }} />
        <View style={{ marginTop: 6, width: 30, height: 14, borderRadius: 4 }} />
      </SkeletonPlaceholder>
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
    fontSize: 15,
    lineHeight: 20,
    color:COLORS.textColor,
    paddingTop: 5,
    paddingHorizontal:3
  },
  author: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 13,
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
})
