import { TouchableOpacity, StyleSheet, Text, View, Dimensions,Alert } from "react-native"
import FastImage from "react-native-fast-image"
import React, {useState} from "react"
import { useNavigation } from "@react-navigation/native"
import { BASE_URL, bookCoverRatio } from "../utils/constants"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons"
import { COLORS } from "../constants/theme"
import { useTheme } from "@react-navigation/native"
import moment from 'moment'
import 'moment/locale/tr'
moment.locale('tr')
const width=(Dimensions.get('screen').width-20)/2.3;
const height=(Dimensions.get('screen').width-20)/2.5 * bookCoverRatio;

export default function LibraryItem({ item, sharedKey }) {
  const {colors}=useTheme()
  const [pageNumber, setPageNumber] = useState(0)
  const [allPageNumber, setAllPageNumber] = useState(0)
  
    useFocusEffect(
      React.useCallback(() => {
        PageNumber()
      },[])
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

    const getSizeControl = () =>{
      if(item?.barcode>2000){
        Alert.alert(
          "Yüksek veri uyarısı",`
          Bu kitabın boyutu ${(item?.barcode/1024).toFixed(2)} MB'dır. WI-FI ağına bağlı değilseniz, bağlanmanızı tavsiye ederiz. Kitap cihazınıza yalnızca bir defa indirilecektir.`,
          [
            { text: "Vazgeç",style: "cancel"},
            { text: "Şimdi İndir", onPress: () => Redirect(), }
          ]
        );
      }else{
        Redirect()
      }
    }

    const Redirect = ()=>{
      push("Reader", {
        id: item?.id, 
        type: "preview", 
        preview: 'pdfUrl', 
        title: item?.title ,
        author:item?.author,
        totalPages:item?.page_count,
        size: item?.barcode,
        image:item?.cover_image
      })
    }


  const { push } = useNavigation()
  return (
    // () => push("Reader", {id: item?.id, type: "preview", preview: 'pdfUrl', title: item?.title });
    // () => push("BookDetail", { sharedKey: sharedKey, item: item , image:item?.cover_image })
    <TouchableOpacity activeOpacity={0.9} style={[styles.container,{backgroundColor:colors.card}]} 
      onPress={() => {
        allPageNumber<2
          ? getSizeControl()
          : Redirect()
      }}
    >
      <View style={styles.bookImage}>
        <View style={styles.bookImageContainer} >
          <TouchableOpacity style={styles.bookDetailButton} 
            onPress={() => push("BookDetail", {sharedKey: sharedKey, item: item , image:item?.cover_image})} 
          >
              <Icon name="book-outline" size={20} color={colors.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.pageNumberContainer}>
           <Text style={styles.pageNumberText}>{pageNumber}/{allPageNumber}</Text>
        </View>
        <View style={{zIndex:0}} >
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
     
      <View style={{width:'95%'}} >
        <View style={{paddingVertical:10, paddingHorizontal:3}}>
          <Text style={[styles.title, {color:colors.text}]} numberOfLines={1}>
            {item?.title} 
          </Text>
          <Text numberOfLines={2} style={[styles.pageSummary, {color:colors.text}]}>
            {item?.summary}
          </Text>
        </View>
        <View style={styles.pageProgramsBar} >
          <View style={styles.pageProgramsBarContainer} >
           <View style={{
              borderRadius:3, 
              maxWidth:'100%',
              backgroundColor:COLORS.programsBar, 
              height:3,
              width:(
                  (allPageNumber>1
                    ? (pageNumber>1
                        ? pageNumber
                        : 1
                      )/(
                        allPageNumber>1
                          ? allPageNumber
                          : 0
                      )
                    : pageNumber==1 && allPageNumber==1 
                      ? 1
                      : 0
                  ) 
              )*100 +'%'}} />
          </View>
          <View style={{width:'30%'}} >
             <Text style={[styles.pageOran,{color:colors.text}]} >
               %{Math.ceil(
                 ((allPageNumber>1
                  ? (pageNumber>1?pageNumber:1)/(allPageNumber>1?allPageNumber:0)
                  : pageNumber==1 && allPageNumber==1 
                    ? 1
                    : 0
                ) 
                )*100
               )}</Text>
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
    borderRadius: 5,
    backgroundColor:'red',
    shadowColor:COLORS.shadow,
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
    fontSize: 13,
    lineHeight: 14,
    color:COLORS.textColor,
    paddingTop:0,
  },
  author: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 13,
    color:COLORS.textColor,
    paddingTop:2
  },
  readButton:{
    marginVertical:10,
    width:'90%',
    backgroundColor:COLORS.primary,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:5,
    borderWidth:0.3,
    borderColor:COLORS.border,
  },
  read: {
    paddingTop: 2,
    textAlign: "center",
    fontFamily:'GoogleSans-Bold',
    fontSize: 12,
    color:COLORS.textColor
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
  bookImageContainer:{ 
    width:'100%',  
    zIndex:1, 
    position:'absolute', 
    flexDirection:'row', 
    justifyContent:'flex-end', 
    alignItems:'flex-end', padding:5
  },
  bookDetailButton:{ 
    flexDirection:'row', 
    backgroundColor:COLORS.backgroundColor,
    padding:6, 
    borderRadius:20, 
    justifyContent:'center', 
    alignItems:'center'
  },
  pageNumberContainer:{ 
    width:'100%',
    zIndex:1,
    bottom:0,
    position:'absolute', 
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    padding:5
  },
  pageNumberText:{
    fontFamily:'GoogleSans-Regular', 
    fontSize:11, 
    color:COLORS.backgroundColor, 
    backgroundColor:'#00000099', 
    borderRadius:5, 
    paddingVertical:2, 
    paddingHorizontal:10
  },
  pageSummary:{
    fontFamily:'GoogleSans-Regular', 
    fontSize:9
  },
  pageProgramsBar:{
    flexDirection:'row', 
    justifyContent:'center',
    alignItems:'center', 
    paddingHorizontal:3
  },
  pageProgramsBarContainer:{
    width:'70%', 
    backgroundColor:'#e1e1e1', 
    height:3, 
    marginVertical:10, 
    borderRadius:3
  },
  pageOran:{
    fontSize:11, 
    fontFamily:'GoogleSans-Regular', 
    paddingLeft:8, 
    textAlign:'right',
    color:COLORS.textColor
  },
  bookCoverImage: {
      width:width,
      height:height,
      borderRadius:5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
  },
})

