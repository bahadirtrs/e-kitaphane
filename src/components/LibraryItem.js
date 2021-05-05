import { TouchableOpacity, StyleSheet, Text, View, Dimensions, Touchable } from "react-native"
import FastImage from "react-native-fast-image"
import React, {useState, useEffect, useCallback} from "react"
import { useNavigation } from "@react-navigation/native"
import { BASE_URL, bookCoverRatio } from "../utils/constants"
import { numberFormat } from "../utils/utils"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { SharedElement } from "react-navigation-shared-element"
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const width=(Dimensions.get('screen').width-20)/2.3;
const height=(Dimensions.get('screen').width-20)/2.5 * bookCoverRatio;

export default function LibraryItem({ item, sharedKey }) {
const [pageNumber, setPageNumber] = useState(0)
const [allPageNumber, setAllPageNumber] = useState(0)


useFocusEffect(
  React.useCallback(() => {
    PageNumber()
  }, [])
);

  const PageNumber = async() =>{
    await AsyncStorage.getItem(JSON.stringify(item.id)).then(num =>{
      if(num!==null){
        setPageNumber(num)
      }
    })
  
    await AsyncStorage.getItem(`${item.id}+page`).then(num =>{
      if(num!==null){
        setAllPageNumber(num)
      }
    })
  }

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
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
      </View>
      <View style={{width:'95%' }} >
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center', paddingHorizontal:5}} >
          <View style={{width:'70%', backgroundColor:'#e1e1e1', height:3, marginVertical:10, borderRadius:3}} >
           <View style={{borderRadius:3,
              width:((allPageNumber>1? (pageNumber?pageNumber:1)/ (allPageNumber?allPageNumber:1): pageNumber==1&& allPageNumber==1? 1: 0) )*100 +'%'

              ,backgroundColor:'#118ab2', height:3}} />
          </View>
          <View style={{width:'30%'}} >
             <Text style={{fontSize:11, fontFamily:'GoogleSans-Regular', paddingLeft:8, textAlign:'right'}} >%{Math.ceil(((pageNumber?pageNumber:1)/ (allPageNumber?allPageNumber:1) )*100)}</Text>
          </View>
        </View>
    
      </View>
    </TouchableOpacity>
  )
}
export const CategorysItemPlaceholder = () => {
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
    width:width,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10,
    marginHorizontal:15,
    paddingBottom:0,
    borderRadius: 10,
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontFamily:'GoogleSans-Medium',
    fontSize: 12,
    lineHeight: 16,
    minHeight:40,
    color: "#1F2937",
    paddingTop: 5,
  },
  author: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 13,
    color: "#4B5563",
    paddingTop:2
  },
  readButton:{
  
    marginVertical:10,
    width:'90%',
    backgroundColor:'#1d3557',
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:10,
    borderWidth:0.3,
    borderColor:'#55555599'
  },
  read: {
    paddingTop: 2,
    textAlign: "center",
    fontFamily:'GoogleSans-Bold',
    fontSize: 12,
    color: "#fff",
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
      width:width,
      height:height,
      borderRadius:10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    
  },
})

