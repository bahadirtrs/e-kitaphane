import React from "react";
import {Pressable, StyleSheet, Text, View,Dimensions } from "react-native"
import FastImage from "react-native-fast-image"
import {bookCoverRatio, BASE_URL} from "../utils/constants"
import IconPack from "react-native-vector-icons/Entypo"
import Icon from "react-native-vector-icons/Ionicons"
import {useNavigation} from "@react-navigation/native"
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

const BookCoverLoading = (product) => {
  // sharedKey, id, imageURI 
  const {colors}=useTheme()
   return (
     <View style={styles.bookCover}>
       <View>
         <FastImage
           style={[styles.bookCoverImage,{shadowColor:colors.shadow, borderColor:colors.border}]}
           source={{
             uri: BASE_URL + "products/cover/" + product?.imageURI,
             priority: FastImage.priority.normal,
             cache: FastImage.cacheControl.immutable,
           }}
           resizeMode={FastImage.resizeMode.cover}
         />
       </View>
       <View style={[styles.loadingContainer,{height:140 * product.yukleme * bookCoverRatio, }]} >
        <Text style={styles.loadingText}>
           {(product.yukleme*100).toFixed(1)>8 ? (`%${(product.yukleme*100).toFixed(1)}`): null} 
        </Text>
       </View>
     </View>
   )
 }


const BookDetails = (product)=>{
  const {colors}=useTheme()
 return(
  <View>
    <View style={styles.detailsContainer} >
      <Text style={[styles.detailsTitle,{color:colors.textColorLight}]}>{product?.title} </Text>
      <Text style={[styles.detailsAuthor,{color:colors.textColorLight}]}>{product?.author} </Text>
    </View>
    <View style={styles.detailsBox} >
      <View style={styles.boxContainer} >
          <View style={styles.boxItemContainer} >
            <Text style={[styles.boxItemTitle,{color:colors.textColorLight}]}>Sayfa Say??s??</Text>
            <Text style={[styles.boxItemAns,{color:colors.textColorLight}]}>{product?.page_count}</Text>
          </View>
          <View style={styles.boxItemContainer} >            
            <Text style={[styles.boxItemTitle,{color:colors.textColorLight}]}>Yay??n Tarihi</Text>
            <Text style={[styles.boxItemAns,{color:colors.textColorLight}]}>{product?.release_date}</Text>
          </View>
          <View style={[styles.boxItemContainer, {borderRightWidth:0}]} >            
            <Text style={[styles.boxItemTitle,{color:colors.textColorLight}]}>Kitab??n Dili</Text>
            <Text style={[styles.boxItemAns,{color:colors.textColorLight}]}>{'T??rk??e'}</Text>
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
            <Text style={[styles.bookAuthor,{color:colors.text}]}>{'Kitap Hakk??nda'}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.bookDescription,{color:colors.text}]}>{product?.summary}</Text>
      { product?.pageNumber>0
        ? <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="bookmark-outline" size={18} color={colors.primary}/>
              {product?.pageNumber==1
                ?<Text style={[styles.warning, {color:colors.text}]}>Bu sayfay?? en az bir defa ziyaret ettiniz.</Text>
                :<Text style={[styles.warning, {color:colors.text}]}>En son {product?.pageNumber}. sayfay?? kaydettiniz.</Text>
              }
          </View>
        :null
      }{!product?.pdfUrl ? 
        product?.pdfData ?
          <Pressable onPress={() => push("Reader", {
              id: product?.id, 
              type: "preview", 
              pdfData: product?.pdfData,
              title: product?.title,
              author:product?.author,
              totalPages:product?.page_count,
              size:product?.size,
              image:product?.imageURI
            })}
            style={[styles.summaryButtonView, {borderTopColor:colors.border}]}>
            <IconPack name="open-book" color={colors.text} size={20} />
            <Text style={[styles.summaryButtonText, {color:colors.text}]}>Kitap ??nizlemesine g??zat </Text>
          </Pressable>
        :
          <Pressable
           style={[styles.summaryButtonView, {borderTopColor:colors.border}]}>
            <Icon name="alert-circle-outline" color={colors.text} size={24} />
            <Text style={[styles.summaryButtonText, {color:colors.text}]}>Tan??t??m kitab?? bulunmamaktad??r. </Text>
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
    width: 140,
    height: 140 * bookCoverRatio,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 0,
    borderRadius: 8,
    borderWidth:0.3,
    borderRadius:4,
  
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

  loadingContainer:{ 
    position:'absolute', 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'rgba(67, 148, 41, 0.8)', 
    height:140 * bookCoverRatio, 
    width:140, 
    marginTop:24, 
    bottom:24, 
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4
  },
  detailsTitle:{
    fontFamily:'GoogleSans-Bold', 
    fontSize:24, 
    textAlign:'center', 
    paddingHorizontal:10
  },
  detailsAuthor:{
    fontFamily:'GoogleSans-Regular', 
    fontSize:16,
    textAlign:'center', 
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
    lineHeight: 20,
    paddingVertical: 8,
    paddingLeft: 6,
  },
  loadingText:{
    fontFamily:'GoogleSans-Medium', 
    fontSize:16, color:'#fff'
  }
})
module.exports = { BookCover: BookCover, BookInfo: BookInfo, BookDetails:BookDetails, BookCoverLoading:BookCoverLoading }
