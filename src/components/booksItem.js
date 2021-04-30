import { Pressable, Image, StyleSheet, Text, View, Dimensions } from "react-native"
import FastImage from "react-native-fast-image"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { BASE_URL, bookCoverRatio } from "../utils/constants"
import { numberFormat } from "../utils/utils"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { SharedElement } from "react-navigation-shared-element"
import { TouchableOpacity } from "react-native"

export default function BooksItem({ item, sharedKey }) {
  const { push } = useNavigation()
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={() => push("BookDetail", { sharedKey: sharedKey, item: item , image:item?.cover_image })}>
      <View style={styles.bookImage}>
        <View>
        <FastImage
          style={styles.bookCoverImage}
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
          <Text style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
        </View>
        <View >
          <Text style={styles.author} numberOfLines={1}>
            {item?.author}
          </Text>
        </View>
          <Text style={styles.price} numberOfLines={1}>
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
    fontSize: 14,
    lineHeight: 20,
    height:25,
    color: "#1F2937",
    paddingTop: 5,
  },
  author: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 13,
    color: "#4B5563",
    paddingTop:2
  },
  price: {
    paddingTop: 2,
    textAlign: "left",
    fontFamily:'GoogleSans-Bold',
    fontSize: 16,
    color: "#4B5563",
  },
  bookImage: {
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bookCoverImage: {
      borderWidth: 0.5,
      borderColor: "#8d8d96",
      width:Dimensions.get('screen').width/3,
      height:Dimensions.get('screen').width/3 * bookCoverRatio,
      borderRadius: 8,
    
  },
})
