import React,{useEffect, useState,useMemo} from "react"
import { Dimensions, ScrollView, StyleSheet, View,Alert,Text } from "react-native"
import { BookCover, BookInfo } from "../../../components/book"
import { BuyButton } from "../../../components/buttons"
import { numberFormat } from "../../../utils/utils"
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { SafeAreaView } from "react-native"
import RNSecureStorage from "rn-secure-storage"
import AsyncStorage from '@react-native-community/async-storage';
import {getToken} from '../../../utils/requestManager'
import BuyProduct from '../../../utils/buyProduct'
import BottomLogInModal from '../../../components/Modals/BottomLogInModal'

export default function BookDetailScreen({ navigation, route }) {
  const product = route.params.item
  const sharedKey = route.params.sharedKey
  const [token, setToken] = useState(null)
  const [islogInModalVisible, setlogInVisible] = useState(false)
  const [isPageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    getToken()
    .then(res => {
      setToken(res)
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const PageNumber = async() =>{
    await AsyncStorage.getItem(JSON.stringify(product.id)).then(num =>{
      if(num!==null){
        setPageNumber(num)
      }
    })
  }
  const tokenControlRedirect = ()=>{
    if(token!==null){
      BuyProduct()
    }else{
      setlogInVisible(true)
    }
  }
  const closeLogInModal = ()=>{
    setlogInVisible(false)
    navigation.push('LogIn')
  }
  return (
    <View style={{flex: 1, backgroundColor: "#F3F4F6"}}>
      <SafeAreaView backgroundColor={'#f1f1f1'} />
      <PageHeaderBackLayout 
        butonColor={'#118ab2'} 
        butonPress={()=>navigation.goBack()}
        title={route.params.item.title}
        backgrounColor={'#f1f1f1'}
        />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.bookCoverArea}>
          <BookCover sharedKey={sharedKey} id={product.id} imageURI={product?.cover_image} />
          <View style={{width:Dimensions.get('screen').width, height:1, backgroundColor:token?'#118ab260':'#e6394660'}} />
        </View>
        <View style={styles.bookDetails}>
          <BookInfo
            pageNumber={isPageNumber}
            sharedKey={sharedKey}
            id={product?.id}
            title={product?.title}
            author={product?.author}
            summary={product?.summary}
            totalPages={product?.page_count}
            releaseDate={product?.release_date}
            preview={product?.preview_pdf}
          />
        </View>
        <BottomLogInModal 
          visible={islogInModalVisible}  
          setVisible={()=> setlogInVisible(false)}
          redirectButton={()=>closeLogInModal()}
          />
      </ScrollView>
      <View style={styles.readBuyButtonArea}>
        <BuyButton 
          onPress={() => tokenControlRedirect()} 
          text="Hemen satın al" 
          price={numberFormat(product?.price) + " TL"} 
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#FFF",
  },
  bookCoverArea: {
    backgroundColor: "#F3F4F6",
  },
  bookDetails: {
    backgroundColor: "#FFF",
    paddingBottom: 72,
    flex: 1,
    minHeight: Dimensions.get("window").height / 1.5,
  },
  readBuyButtonArea: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
})
