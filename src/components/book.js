/*  
|------*--------*-------------*------------*-------*------|
| developer:Bahadır Tıraş                                 |
| email:bahadirtiras@gmail.com                            |
| github:wwww.github.com/bahadirtrs                       |
| website:www.bahadirtiras.com.tr                         |
|------*----------*----------*-------------*--------*-----|
*/

import React from "react";
import {Pressable, StyleSheet, Text, View,Dimensions } from "react-native"
import FastImage from "react-native-fast-image"
import {bookCoverRatio, BASE_URL} from "../utils/constants"
import IconPack from "react-native-vector-icons/Entypo"
import Icon from "react-native-vector-icons/Ionicons"
import {useNavigation} from "@react-navigation/native"
import {COLORS} from "../constants/theme";
import {useTheme} from "@react-navigation/native"
const BookCover = (product) => {
 // sharedKey, id, imageURI 
  return (
    <View style={styles.bookCover}>
      <View>
        <FastImage
          style={styles.bookCoverImage}
          source={{
            uri: BASE_URL + "products/cover/" + product?.imageURI,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </View>
  )
}

const BookDetails = (product)=>{
  const {colors}=useTheme()
 return(
  <View>
    <View style={styles.detailsContainer} >
      <Text style={styles.detailsTitle}>{product?.title} </Text>
      <Text style={styles.detailsAuthor}>{product?.author} </Text>
    </View>
    <View style={styles.detailsBox} >
      <View style={styles.boxContainer} >
          <View style={styles.boxItemContainer} >
            <Text style={[styles.boxItemTitle,{color:colors.textColorLight}]}>Sayfa Sayısı</Text>
            <Text style={[styles.boxItemAns,{color:colors.textColorLight}]}>{product?.page_count}</Text>
          </View>
          <View style={styles.boxItemContainer} >            
            <Text style={[styles.boxItemTitle,{color:colors.textColorLight}]}>Yayın tarihi</Text>
            <Text style={[styles.boxItemAns,{color:colors.textColorLight}]}>{product?.release_date}</Text>
          </View>
          <View style={[styles.boxItemContainer, {borderRightWidth:0}]} >            
            <Text style={[styles.boxItemTitle,{color:colors.textColorLight}]}>Kitabın Dili</Text>
            <Text style={[styles.boxItemAns,{color:colors.textColorLight}]}>{'Türkçe'}</Text>
          </View>
      </View>
    </View>
</View>
 )
}
const BookInfo = (product) => {
  const {colors}=useTheme()
  const { push } = useNavigation()
  return (
    <View style={styles.bookInfo}>
      <View style={styles.titleView}>
        <View>
          <View>
            <Text style={[styles.bookAuthor,{color:colors.text}]}>{'Kitap Hakkında'}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.bookDescription,{color:colors.text}]}>{product?.summary}</Text>
      { product?.pageNumber>0
        ? <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="bookmark-outline" size={18} color={colors.primary}/>
              {product?.pageNumber==1
                ?<Text style={[styles.warning, {color:colors.text}]}>Bu sayfayı en az bir defa ziyaret ettiniz.</Text>
                :<Text style={[styles.warning, {color:colors.text}]}>En son {product?.pageNumber}. sayfayı kaydettiniz.</Text>
              }
          </View>
        :null
      }{!product?.pdfUrl ? 
        product?.pdfData ?
          <Pressable onPress={() => push("Reader", {
              id: product?.id, 
              type: "preview", 
              pdfData: product?.pdfData,
              title: product?.title 

            })}
            style={[styles.summaryButtonView, {borderTopColor:colors.border}]}>
            <IconPack name="open-book" color={colors.text} size={20} />
            <Text style={[styles.summaryButtonText, {color:colors.text}]}>Kitap önizlemesine gözat </Text>
          </Pressable>
        :
          <Pressable
           style={[styles.summaryButtonView, {borderTopColor:colors.border}]}>
            <Icon name="alert-circle-outline" color={colors.text} size={24} />
            <Text style={[styles.summaryButtonText, {color:colors.text}]}>Tanıtım kitabı bulunmamaktadır. </Text>
          </Pressable>
       :  undefined}
    </View>
  )
}
const styles = StyleSheet.create({
  bookCover: {
    alignItems: "center",
    paddingVertical: 24,
  },
  bookCoverImage: {
    width: 170,
    height: 170 * bookCoverRatio,
    shadowColor:COLORS.shadow,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 0,
    borderRadius: 8,
    borderWidth:0.3,
    borderColor:COLORS.border
  },
  bookInfo: {
    padding: 12,
  },

  detailsContainer:{
    width:Dimensions.get('screen').width, 
    justifyContent:'center', 
    alignItems:'center', 
    paddingVertical:5
  },
  detailsTitle:{
    fontFamily:'GoogleSans-Bold', 
    fontSize:24, 
    textAlign:'center', 
    color:COLORS.textColorLight, 
    paddingHorizontal:10
  },
  detailsAuthor:{
    fontFamily:'GoogleSans-Regular', 
    fontSize:16,
    textAlign:'center', 
    color:COLORS.textColorLight
  },
  detailsBox:{
    width:Dimensions.get('screen').width,  
    alignItems:'center'
  },
  boxContainer:{ 
    backgroundColor:'#00000050', 
    flexDirection:'row', 
    justifyContent:'space-around', 
    width:Dimensions.get('screen').width*0.9, 
    marginVertical:20, 
    paddingVertical:15, 
    borderRadius:10
  },
  boxItemContainer:{
    justifyContent:'center', 
    alignItems:'center', 
    borderRightWidth:1, 
    borderRightColor:'#00000050', 
    paddingRight:10, 
    width:'33%' 
  },
  boxItemTitle:{
    fontFamily:'GoogleSans-Bold', 
    fontSize:12
  },
  boxItemAns:{
    fontFamily:'GoogleSans-Regular', 
    paddingTop:5
  },

  titleView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    paddingVertical: 12,
    paddingRight:10,
  },
  bookTitle: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 28,
    lineHeight: 28,
    paddingVertical: 2,
  },
  bookAuthor: {
    fontFamily:'GoogleSans-Medium',
    fontSize: 20,
  },
  bookSmallDetails: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingVertical: 12,
  },
  bookSmallDetailsItem: {
    paddingRight: 12,
    flexDirection: "column",
  },
  bookSmallDetailsItemTitle: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 12,
  },
  bookSmallDetailsItemContent: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 14,
    paddingTop: 4,
  },
  bookDescription: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 13,
    lineHeight: 20,
    paddingVertical: 8,
  },
  summaryButtonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    marginTop:5,
  },
  summaryButtonText: {
    fontFamily:'GoogleSans-Medium',
    fontSize: 15,
    color:COLORS.textColor,
    lineHeight: 20,
    paddingVertical: 8,
    paddingLeft: 6,
  },
})
module.exports = { BookCover: BookCover, BookInfo: BookInfo, BookDetails:BookDetails }
