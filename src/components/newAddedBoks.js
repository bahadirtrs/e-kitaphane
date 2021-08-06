import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from "react-native"
import FastImage from "react-native-fast-image"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { BASE_URL, bookCoverRatio } from "../utils/constants"
import { numberFormat } from "../utils/utils"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native"
const width=(Dimensions.get('screen').width-20)/4;
const height=(Dimensions.get('screen').width-20)/4 * bookCoverRatio;

export default function NewAddedBooks({ item, sharedKey }) {
  const {colors}=useTheme()
  const { push } = useNavigation()
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container,{borderBottomColor:colors.border}]} 
      onPress={() => push("BookDetail", { sharedKey: sharedKey, item: item , image:item?.cover_image })}
    >
      <View style={styles.bookImage}>
        <View style={{width:'30%'}} >
          <FastImage
            style={[styles.bookCoverImage, {borderColor:colors.border}]}
            source={{
              uri: BASE_URL + "products/cover/" + item?.cover_image,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
      </View>
      <View style={{width:'75%', paddingHorizontal:10, justifyContent:'space-between', height:height, justifyContent:'center'}}>
        <View>
        <View>
          <Text style={[styles.title,{color:colors.text}]} numberOfLines={1}>
            {item?.title}
          </Text>
        </View>
        <View>
          <Text style={[styles.author,{color:colors.text}]}numberOfLines={1}>
            {item?.author}
          </Text>
        </View>
        <View>
        <Text style={[styles.summary,{color:colors.text}]} numberOfLines={4} >
            {item?.summary}
        </Text>
        </View>
        </View>
          <Text  style={[styles.price,{color:colors.text}]} numberOfLines={1}>
            {''} {numberFormat(item?.price)} ₺
          </Text>
      </View>
    </TouchableOpacity>
  )
}
export const NewAddedBooksPlaceHolder = () => {
  return (
    <View style={{ height: "auto", margin:5 }}>
      <SkeletonPlaceholder>
        <View style={{ width:width, height:height, borderRadius:10 }} />
        <View style={{ marginTop: 6, width: width, height: height/10, borderRadius: 4 }} />
        <View style={{ marginTop: 6, width: width/2, height: height/10, borderRadius: 4 }} />
        <View style={{ marginTop: 6, width: width/4, height: height/10, borderRadius: 4 }} />
      </SkeletonPlaceholder>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:(Dimensions.get('screen').width)-20,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    padding:10,
    borderBottomWidth:1,
    
  
  },
  title: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 16,
    lineHeight: 20,
    color:COLORS.textColor,
    paddingTop: 5,
  },
  author: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 14,
    color:COLORS.textColor,
    paddingTop:2
  },
  summary: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 11,
    color:COLORS.textColor,
    paddingTop:2
  },
  price: {
    paddingTop: 2,
    textAlign: "left",
    fontFamily:'GoogleSans-Bold',
    fontSize: 20,
    color:COLORS.textColor,
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
      borderColor:COLORS.border,
      width:width,
      height:height,
      borderRadius: 4,
    
  },
})
