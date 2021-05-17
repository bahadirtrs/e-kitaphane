import React,{useEffect, useState,useMemo, useCallback} from "react"
import { Dimensions, ScrollView, StyleSheet, View,StatusBar,Text,Image} from "react-native"
import { BookCover, BookInfo, BookDetails } from "../../../components/book"
import { ReadButton } from "../../../components/buttons"
import { numberFormat } from "../../../utils/utils"
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { SafeAreaView } from "react-native"
import RNSecureStorage from "rn-secure-storage"
import AsyncStorage from '@react-native-community/async-storage';
import {getToken} from '../../../utils/requestManager'
import BuyProduct from '../../../utils/buyProduct'
import BottomLogInModal from '../../../components/Modals/BottomLogInModal'
import RequestManager from "../../../utils/requestManager"
import { endpoints,BASE_URL } from "../../../utils/constants"
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import * as RNIap from 'react-native-iap';

export default function BookDetailScreen({ navigation, route }) {
  const product = route.params.item
  const sharedKey = route.params.sharedKey
  const [token, setToken] = useState(null)
  const [islogInModalVisible, setlogInVisible] = useState(false)
  const [isPageNumber, setPageNumber] = useState(0)
  const [allPageNumber, setAllPageNumber] = useState(0)
  const [isBuyButtonText, setBuyButtonText] = useState("Hemen satın al")
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState([])
  const [buyStatus, setBuyStatus] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [closed, setClosed] = useState(false)
  
  let itemSkus = Platform.select({
    ios: [],
    android: [
      'product1',
      'product2',
      'product3',
      'product5',
      'product6',
      'product7',
      'product8',
    ]
  });

  let id='product'+route.params.item.id; 
  const [products, setProducts] = useState([])
  const [user, setUser] = useState({name:'Osman',subscription:undefined})
  const [showads, setShowads] = useState(true);
  
  useFocusEffect(
    React.useCallback(() => {
      PageNumber()
      getToken()
    }, [])
  );
 
  const getCategories = useMemo(async() =>
  RequestManager({
    method: endpoints.showPDF.method,
    url: endpoints.showPDF.path +'/' +product?.id,
    auth: false,
    headers: {
      Accept: "application/jsonsss",
      Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
    },
  }),
[],)

  useEffect(() => {
    setFetching(true)
    getCategories
      .then(res => {
        setPdfUrl(res)
        setTimeout(() => {setFetching(false)}, 1000)
      })
      .catch(err => {
        console.log(err)
        setPdfUrl(false)
      })
  }, [getCategories])

  useEffect(() => {
    getToken()
    .then(res => {
      setToken(res),
      PageNumber()
      console.log(res)
    })
    .catch(err => {console.log(err)})
  }, [])

  const PageNumber = async() =>{
    await AsyncStorage.getItem(JSON.stringify(product.id)).then(num =>{
      if(num!==null){
        setPageNumber(num)
      }
    })
  
    await AsyncStorage.getItem(`${product.id}+page`).then(num =>{
      if(num!==null){
        setAllPageNumber(num)
      }
    })
  }

  useEffect(() => {
    initIAp()
  }, [])

  const initIAp = async () => {
    try {
        const products = await RNIap.getProducts(itemSkus);
        console.log(JSON.stringify(products))
       // alert(JSON.stringify(products))
        setProducts(products)
        console.log(JSON.stringify(products))
    } catch (err) {
        alert(err)
        console.warn(err); 
    }
    const purcaseUpdateScription = RNIap.purchaseUpdatedListener((purchase)=>{
      const receipt= purchase.transactionReceipt;
        if(receipt){
          RNIap.finishTransaction(purchase);
          setUser((prev)=>({...prev,subscription:purchase.productId}));
        }
    })
    return() =>{
      purcaseUpdateScription.remove();
    }
}

const setBookStore = async () =>{
  try {
    const sonuc= await RNIap.requestSubscription(id)
      alert("Sonuç: "+JSON.stringify(sonuc))
    if(sonuc){
      tokenControlRedirect()
    }else{alert("Ürün satın alınırken bir hata oluştu...")}
  }catch (error) {
    alert(error)
  }
}

  const tokenControlRedirect = async ()=>{
    setClosed(true)
    if(token!==null){
      const resultMessage= await BuyProduct(1,product.id,'PURCHASED', 'GOOGLE_PAY')
      setLoading(true)
      setBuyButtonText("Kitap satın alınıyor...")
      setTimeout(() => {
        setBuyButtonText(resultMessage.message)
        setLoading(false)
      }, 3000);
      setTimeout(() => {
        if(resultMessage.statusMsg){
        setBuyButtonText("Kitabı Oku")
        setBuyStatus(true)
        setClosed(false)
        navigation.navigate("Reader", {id: product?.id, type: "preview", preview: pdfUrl, title: product?.title });
      }
      }, 5000);
    }else{
      setlogInVisible(true)
      setClosed(false)
    }
  }
  const closeLogInModal = ()=>{
    setlogInVisible(false)
    navigation.push('LogIn')
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#1d3557'}/>
      <SafeAreaView/>
      <View style={styles.headerBackButtonContainer} >
            <TouchableOpacity style={{padding:10}} onPress={()=>navigation.goBack()} >
              <Icon name="chevron-back-outline" size={25} color={"#fff"}/> 
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kitap Detayları</Text>
            <TouchableOpacity style={{padding:10}} onPress={null} >
              <Icon name="ellipsis-horizontal-outline" size={25} color={"#fff"}/> 
            </TouchableOpacity>
          </View>
      <ScrollView >
      <Image 
        style={styles.imageStyle} 
        source={{uri: BASE_URL + "products/cover/" + product?.cover_image}} 
      />
        <View style={styles.bookCoverArea}>
          <BookCover 
            sharedKey={sharedKey} 
            id={product.id} 
            imageURI={product?.cover_image} 
          />
          <BookDetails
            author={product?.author}
            release_date={product?.release_date}
            title={product?.title}
            page_count={product?.page_count}
          />
        </View>
        <Text>{route.params.item.id}--yeni-----{id}</Text>
        <View style={styles.bookDetails}>
          <BookInfo
            pdfUrl={pdfUrl}
            pageNumber={isPageNumber}
            sharedKey={sharedKey}
            id={product?.id}
            title={product?.title}
            author={product?.author}
            summary={product?.summary}
            totalPages={product?.page_count}
            releaseDate={product?.release_date}
            preview={"api/show-preview/" + product?.id}
            pdfData={product?.preview_pdf}
          />
        </View>
       
        <BottomLogInModal 
          visible={islogInModalVisible}  
          setVisible={()=> setlogInVisible(false)}
          redirectButton={()=>closeLogInModal()}
        />
      </ScrollView>
      <View style={styles.readBuyButtonArea}>
        <ReadButton 
          closed={closed}
          allPageNumber={allPageNumber}
          buyStatus={buyStatus}
          page={isPageNumber}
          pageAll={allPageNumber}
          id={product?.id}
          loading={loading}
          onPress={() => setBookStore()} 
          text={isBuyButtonText}
          price={numberFormat(product?.price) + " TL"} 
          bookViewPress={
            () => navigation.navigate("Reader", {
              id: product?.id, 
              type: "preview", 
              preview: pdfUrl, 
              title: product?.title 
            })
          }
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,  
    backgroundColor: "#1d3557" 
  },
  headerBackButtonContainer:{
    flexDirection:'row',
    justifyContent:'space-between', 
    alignItems:'center', 
    paddingHorizontal:10,
    paddingVertical:0
  },
  headerTitle:{
    fontSize:14, 
    fontFamily:'GoogleSans-Medium', 
    color:'#fff'
  },
  scrollView: {
    backgroundColor: "#FFF",
  },
  bookCoverArea: {
    paddingTop:0,
    backgroundColor: "#1d3557",
    opacity:0.85
  },
  bookDetails: {
    backgroundColor: "#FFF",
    paddingBottom: 96,
    flex: 1,
  },
  readBuyButtonArea: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
  imageStyle:{ 
    opacity:0.3, 
    position:'absolute', 
    top:0, 
    width:Dimensions.get('screen').width, 
    height:'55%', 
    backgroundColor:'#000' 
  },
})
