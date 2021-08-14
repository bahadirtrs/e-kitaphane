import React,{useEffect, useState,useMemo} from "react"
import { Dimensions, ScrollView, StyleSheet, View,StatusBar,Text,Image,Alert,SafeAreaView} from "react-native"
import { BookCover, BookInfo, BookDetails } from "../../../components/book"
import { ReadButton } from "../../../components/buttons"
import { numberFormat } from "../../../utils/utils"
import { endpoints,BASE_URL } from "../../../utils/constants"
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from "react-native"
import { useTheme } from "@react-navigation/native"
import {getToken} from '../../../utils/requestManager'
import * as RNIap from 'react-native-iap';
import RNSecureStorage from "rn-secure-storage"
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage';
import BuyProduct from '../../../utils/buyProduct'
import BottomLogInModal from '../../../components/Modals/BottomLogInModal'
import RequestManager from "../../../utils/requestManager"
import Info from '../../../components/Info'

export default function BookDetailScreen({navigation,route}) {
  const {colors}=useTheme()
  const product = route.params.item
  const sharedKey = route.params.sharedKey
  const [infoText, setInfoText] = useState("")
  const [infoModal, setInfoModal] = useState(false)
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
  const [id,setId]=useState('product'+String(route.params.item.id))

  const [products, setProducts] = useState([])
  const [user, setUser] = useState({name:'Jhon',subscription:undefined})

  let itemSkus = Platform.select({
    ios: [],
    android:[
      'product18',
      'product19',
      'product20',
      'product21',
      'product22',
      'product23',
      'product24',
      'product25',
      'product26',
      'product27',
      'product28',
      'product29',
      'product30',
      'product31',
      'product32',
      'product33',
      'product34',
      'product35',
      'product36',
      'product37',
      'product37',
      'product38',
      'product39',
      'product40',
    ]
  });
  
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
        setTimeout(() => {
          setFetching(false)
        }, 1000)
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
  },[])

  const initIAp = async () => {
    try {
        const products = await RNIap.getProducts(itemSkus);
        console.log(JSON.stringify(products))
        //alert(JSON.stringify(products))
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
    if(token!==null){
      const sonuc= await RNIap.requestSubscription(id)
        //alert("Response: "+JSON.stringify(sonuc))
      if(sonuc){
        tokenControlRedirect()
      }else{
        Alert.alert("Hata","Ürün satın alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.")
      }
    }else{
      setlogInVisible(true)
    }
  }catch (error) {
    console.log(error)
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
          getSizeControl()
        }
      }, 5000);

    }else{
      setlogInVisible(true)
      setClosed(false)
      Alert.alert("Kritik hata", "Ödemeniz alındı ve kitabınız kütüphanenizde görünmüyorsa lütfen bizimle iletişime geçiniz.")
    }
  }
  const closeLogInModal = ()=>{
    setlogInVisible(false)
    navigation.push('Account')
  }

  const getSizeControl = () =>{
    if(product?.barcode>3000){
      setInfoText(`Bu kitabın boyutu ${(product?.barcode/1024).toFixed(2)} MB'dır.  Wİ-Fİ ağına bağlı değilseniz, bağlanmanızı tavsiye ederiz. Kitap cihazınıza yalnızca bir defa indirilecektir.`)
      setInfoModal(!infoModal)
    }else{
      Redirect()
    }
  }

  const Redirect = ()=>{
    setInfoModal(false)
    navigation.navigate("Reader", {
      id: product?.id, 
      type: "full", 
      preview: pdfUrl, 
      title: product?.title,
      author:product?.author,
      totalPages:product?.page_count,
      size: product?.barcode,
      image:product?.cover_image
    })
  }

  return (
    <View style={[styles.container, {backgroundColor:colors.primary}]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary}/>
      <SafeAreaView backgroundColor={colors.primary} />
      <View style={styles.headerBackButtonContainer} >
            <TouchableOpacity style={{padding:10}} onPress={()=>navigation.goBack()} >
              <Icon name="chevron-back-outline" size={25} color={colors.textColorLight}/> 
            </TouchableOpacity>
            <Text style={[styles.headerTitle,{color:colors.textColorLight}]}>Kitap Detayları</Text>
            <TouchableOpacity style={{padding:10}} onPress={null} >
              <Icon name="ellipsis-horizontal-outline" size={25} color={colors.textColorLight}/> 
            </TouchableOpacity>
          </View>
      <ScrollView >
      <Image 
        style={styles.imageStyle} 
        source={{uri: BASE_URL + "products/cover/" + product?.cover_image}} 
      />
        <View style={[styles.bookCoverArea,{backgroundColor:colors.primary}]}>
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
        <Info
          title={'Yüksek Veri Uyarısı'}
          text={infoText}
          okPress={() => Redirect()}
          setInfoModal={()=>setInfoModal(!infoModal)}
          infoModal={infoModal}
        />
        </View>
        <View style={[styles.bookDetails,{backgroundColor:colors.background}]}>
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
            size={product?.barcode}
            imageURI={product?.cover_image} 
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
          size={product?.barcode}
          onPress={() => setBookStore()}  //setBookStore()
          text={isBuyButtonText} //
          price={numberFormat(product?.price) + " TL"}  //numberFormat(product?.price) + " TL"
          bookViewPress={()=>{
            allPageNumber<1
              ? getSizeControl()
              : Redirect()
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,  
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
    opacity:0.85
  },
  bookDetails: {
    paddingBottom: 100,
    flex: 1,
  },
  readBuyButtonArea: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
  imageStyle:{ 
    width:Dimensions.get('screen').width, 
    height:'55%', 
    position:'absolute', 
    opacity:0.3, 
    top:0, 
  },
})
