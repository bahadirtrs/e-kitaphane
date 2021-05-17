import React,{useState, useEffect, useMemo, useRef} from "react"
import AsyncStorage from '@react-native-community/async-storage';
import Pdf from "react-native-pdf"
import Icon from "react-native-vector-icons/Ionicons"
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { StyleSheet,View,Text,FlatList,StatusBar,Alert,Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BASE_URL,endpoints } from "../../../utils/constants"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Dimensions } from "react-native"
import RequestManager from "../../../utils/requestManager"
import RNSecureStorage from "rn-secure-storage";
import Activator from '../../../components/Indicator/BeingIndicator'

function getData(number) {
  //sayfa sayısı kadar görünüm oluşturma fonksiyonu
  let data = [];
  for(var i=1; i<number+2; ++i){
    data.push("" + i);
  }
  return data;
}
let pageNumber=0;
export default function ReaderScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false})
  }, [navigation])
    const [numberCurrent, setNumberCurrent] = useState(1)
    const [numberofPages, setNumberofPages] = useState(0)
    const [savePage, setSavePage] = useState(0)
    const [isEnabled, setIsEnabled] = useState(true);
    const [activity, setActivity] = useState(false)
    const [isPageControllerHide, setPageControllerHide] = useState(true)
    const [isZoomActive, setZoomActive] = useState(false)
    const [pdfUrl, setPdfUrl] = useState("")
    const [fetching, setFetching] = useState(false)
    const [previewBook, setPreviewBook] = useState(false)
    const [containuePage, setContainuePage] = useState(0)
    const [statusBarColor, setStatusBarColor] = useState('#1d3557')
    const [pageHorizontal, setPageHorizontal] = useState(true)
    const SlideInLeft = useRef(new Animated.Value(0)).current;
    //const source = { uri: BASE_URL +"api/show-preview/" + route.params.id, cache: true }
    const source = { uri: BASE_URL +pdfUrl, cache: true }
   
  const getShowPDF = useMemo(async() =>
    RequestManager({
      method: endpoints.showPDF.method,
      url: endpoints.showPDF.path +'/' +route.params.id,
      auth: false,
      headers: {
        Accept: "application/jsonsss",
        Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
      },
    }),
  [],)

    useEffect(() => {
      if(numberofPages>0){
        setFetching(false)
        setZoomActive(true)
      }
      setTimeout(() => {
        setPageControllerHide(false)
        fadeIn()
      }, 3000);
    }, [numberofPages])
    
    useEffect(() => {
      getShowPDF
        .then(res => {
          setPdfUrl(res)
          setPreviewBook(true)
          setTimeout(() => {
            setFetching(false)
          }, 1000)
        })
        .catch(err => {
          setFetching(true)
          console.log(err)
          setPdfUrl('api/show-preview/'+route.params.id)
          setPreviewBook(false)
        })
    }, [getShowPDF])


    useEffect(() => {
      // Sayfaya girilince kalınan sayfa kontrolü
      const pageNum =JSON.stringify(route.params.id)
      const number = JSON.stringify(numberCurrent)
      AsyncStorage.getItem(pageNum).then(item =>{
        if(item!==null){
          pageNumber=item;
          AsyncStorage.getItem(`${pageNum}+autoSave`).then(item =>{
            if(item!==null){
              if(item==='false'){
                Contiunie(pageNumber,route.params.id)
                setIsEnabled(false)
              }else if(item==='true'){
                setIsEnabled(true)
                setContainuePage(Number(pageNumber));
              }
            }else{
            }
          })
        }else{
          AsyncStorage.setItem(pageNum,number); 
          AsyncStorage.setItem(`${pageNum}+autoSave`, 'true'); 
          setSavePage(number)
        }
      })  

    },[])

    useEffect(() => {
      const pageNum =JSON.stringify(route.params.id)
      const allPageNumber = JSON.stringify(numberofPages)
      AsyncStorage.getItem(`${pageNum}+page`).then(item =>{
        if(item!==null){
        }else{
          if(numberofPages!==0 && previewBook){
            AsyncStorage.setItem(`${pageNum}+page`,allPageNumber);
          }
        }
      })
    }, [numberofPages]) 

    useEffect(() => {
      // Otomatik kaydetme checkbox değeri değiştiğinde bulunulan sayfayı asyncstronge ye atama
      const pageNum =JSON.stringify(route.params.id)
      const number = JSON.stringify(numberCurrent)
      AsyncStorage.setItem(pageNum, number);
        setSavePage(number)
    },[isEnabled])

    useEffect(() => {
      // PDF yükleyinceye kadar Activator gösterme
      if(numberofPages!==0){
        setActivity(false)
      }
    },[]) //neden
  
    const fadeIn = () => {
      setStatusBarColor('#fff')
      // Alt barın görünme animasyonu
      Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver:false,
      }).start();
    };
  
    const fadeOut = () => {
      setStatusBarColor('#1d3557')
      // Alt barın kaybolma animasyonu
      Animated.timing(SlideInLeft, {
        toValue: 0,
        duration: 500,
        useNativeDriver:false,
      }).start();
    };

  const getItemLayout = (data, index) => (
    // Alt bar sayfa gösteriminin kaydırma boyutu
    {length: 85, offset: (85 * index)-Dimensions.get('screen').width/1.7, index }
  )

  const scrollToItem = (res) => {
    //Alt bar kaydırma animasyonu
    let randomIndex = res;
    flatListRef.scrollToIndex({animated: true, index: randomIndex});
  }

  const NumberOfDelete = async(params,item)=>{
    // Giriş kaldığı sayfadan devam etme
    const pageNum =JSON.stringify(route.params.id)
    if(params=='true'){
      setSavePage(item)
      AsyncStorage.setItem(pageNum, item);
      setContainuePage(Number(item))
      setNumberCurrent(Number(item))
    }if(params=='false'){
      let pageNum =JSON.stringify(route.params.id)
      await AsyncStorage.removeItem(pageNum);
    }
  }

  const StrongeNumberDelete = async()=>{
    // Kaldığı sayfayı AsyncStronge dan temizleme
    let pageNum =JSON.stringify(route.params.id)
    Alert.alert(
      "Kaydedilen sayfa siliniyor...",'Kaydettiğiniz sayfa silinecek ve bu kitap 1.sayfadan başlatılacaktır. Bu işlemi geri alamazsınız. Onaylıyor musunuz?',
      [
        { text: "Evet",style: "cancel", onPress: () => {
          AsyncStorage.removeItem(pageNum);
          setContainuePage(1)
          setNumberCurrent(1)
        }  
        },
        { text: "Hayır", onPress: () =>null }
      ]
    );
  }

  const Contiunie =(item,params)=>{
    //Kalınan sayfayı uygulamaya active etme
    if(!isEnabled){
      setNumberCurrent(Number(item))
      setContainuePage(Number(item));
    }else if(item!=='1'){
      Alert.alert(
        "Kaldığınız sayfayı unutmadık!",`Bu kitabın ${item} sayfasında kaldınız. Okumaya bu sayfadan devam etmek istermisiniz?`,
        [
          { text: "Devam Et",style: "cancel", onPress: () => NumberOfDelete('true',item)  },
          { text: "Baştan Başla", onPress: () => NumberOfDelete('false',item), }
        ]
      );
    }
  }
 
  const ZoomActive = (scale)=>{
    //PDF de zoom yapıldığında ekranı temizleme
    console.log(scale)
    if(scale>1.01){
      setZoomActive(false)
    }else{
      setZoomActive(true)
    }
  }

  const itemTrue = ()=>{
    // Otomatik kayıt etme statusu
    const pageNum =JSON.stringify(route.params.id)
    if(isEnabled){
      AsyncStorage.setItem(`${pageNum}+autoSave`, 'false'); 
      setIsEnabled(false)
    }
    else{
      AsyncStorage.setItem(`${pageNum}+autoSave`, 'true'); 
      setIsEnabled(true)
    }

  }

  const Enable =()=>{
    // otomatik kayıt checkbox statusu
   
  }

  const PageSave =()=>{
    // Kalınan sayfayı manuel kaydetme
    let pageNum =JSON.stringify(route.params.id)
    let number = JSON.stringify(numberCurrent)
    if(isEnabled){
      //Otomatik kaydetme açıksa kullanıcıyı uyarma
      Alert.alert('Otomatik kaydeme açık', `Kaldığınız sayfa otomatik olarak kaydediliyor.`,
        [{ text: "Tamam",style: "cancel", onPress: () => null  },])
    }else{
      //Otomatik kayıt kapalı ise kalınan sayfayı kaydetme
      AsyncStorage.setItem(pageNum, number); 
      setSavePage(number)
      Alert.alert('Sayfa kaydedildi. ', `Bir sonraki ziyaretinizde ${numberCurrent}.sayfadan devam edebileceksiniz.`,
        [{ text: "Tamam",style: "cancel", onPress: () => null  },]
      )
    }
  }
  const ScreenClick = async ()=>{
    //PDF ekranına tıklayınca alt ve üst barı kaybetme
    await setPageControllerHide(!isPageControllerHide); 
    if(!isPageControllerHide){
      fadeOut()
    }else{
      fadeIn()
      
    }
  }

  return (
  <>
    <View style={styles.container}> 
      {isPageControllerHide ?
        <SafeAreaView style={{ zIndex:1, position:'absolute', backgroundColor:'#1d3557', paddingBottom:0, paddingTop:5}}>
          <StatusBar barStyle="light-content" backgroundColor={statusBarColor}/>
          <PageHeaderBackLayout 
            type={'pdf'}
            butonColor={'#fff'} 
            textColor={'#fff'}
            butonPress={()=>navigation.goBack()}
            title={route.params.title}
            backgrounColor={'#1d3557'}
            pageSave={()=>PageSave()}
            deleteNumber={()=>StrongeNumberDelete()}
            setPageHorizontalTrue={()=>setPageHorizontal(!pageHorizontal)}
            pageHorizontal={pageHorizontal}
            />  
        </SafeAreaView>
    :null}
     <StatusBar barStyle="dark-content" backgroundColor={statusBarColor}/>
     {fetching? 
     <View style={{position:'absolute', zIndex:1, height:Dimensions.get('screen').height, width:Dimensions.get('screen').width, justifyContent:'center',alignItems:'center' }} >
      <Activator title='Kitap yükleniyor' />
     </View>
     :null}
      
    <Pdf
      source={source}
      page={containuePage}
      horizontal={pageHorizontal}
      enablePaging={true}
      fitWidth={true}
      cache={true}
      onScaleChanged={(scale)=>ZoomActive(scale)}
      style={styles.pdf}
      onPageSingleTap={()=>ScreenClick()}
      onLoadComplete={(numberOfPages, filePath) => {
        setNumberofPages(numberOfPages)
      }}
      onPageChanged={ (page) => {
          scrollToItem(page)
          setNumberCurrent(page)
        if(isEnabled){
          let pageNum =JSON.stringify(route.params.id)
          let number = JSON.stringify(page)
          AsyncStorage.setItem(pageNum, number); 
          setSavePage(number)
        }
      }}
    />

      
      <Animated.View style={[styles.numberCurrent, {
        transform: [
          {
            translateY: SlideInLeft.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 600]
            })
          }
        ],
        }]}>
        <View style={{  position:'absolute', bottom:175,width:100, justifyContent:'center', alignItems:'center', backgroundColor:'#00000050', borderRadius:5}} >
          <Text style={styles.numberCurrentText} > {numberCurrent}/{numberofPages} </Text>
        </View>

        <View style={{width:Dimensions.get('screen').width, marginBottom:10, backgroundColor:'#eee', flexDirection:'row', justifyContent:'center',alignItems:'center', padding:5}} >
          {isEnabled
          ? <TouchableOpacity onPress={()=>itemTrue()} >
              <Icon name="checkbox-outline" size={20} color="#1d3557" />
            </TouchableOpacity>
          : <TouchableOpacity onPress={()=>itemTrue()} >
              <Icon name="square-outline" size={20} color="#555" />
            </TouchableOpacity>
          }
          <Text style={{fontFamily:'GoogleSans-Regular',color:'#555', fontSize:12}}>Kaldığım sayfayı otomatik olarak kaydet</Text>
        </View>
        <View style={{ width:Dimensions.get('screen').width, flexDirection:'column',justifyContent:'center', alignItems:'center'}} >
          <FlatList
            style={{ width:'100%',}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={(ref) => {flatListRef=ref}}
            keyExtractor={item => item}
            getItemLayout={getItemLayout}
            data={getData(numberofPages)}
            renderItem={({ item, index}) => (
              item-1==numberofPages ? null:
                <TouchableOpacity activeOpacity={0.9} onPress={()=>setContainuePage(Number(item))} style={{width:Dimensions.get('screen').width,  backgroundColor:'#fff', width:65, height:90, borderColor: item==numberCurrent?'#1d3557':'#ccc', borderWidth:item==numberCurrent?3:1, marginHorizontal:10, marginVertical:5, borderRadius:5, justifyContent:'center', alignItems:'center'}} >
                <View style={{width:Dimensions.get('screen').width,  zIndex:1, width:65, height:90, backgroundColor:'#1d355701', position:'absolute', justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontFamily:'GoogleSans-Regular', color:'#333', fontSize:14}}>{item}</Text>
                </View>
              </TouchableOpacity> 
            )}
          />
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%', paddingVertical:10, }} ></View>
      </Animated.View>
      {!isPageControllerHide && isZoomActive
      ? 
      <>
      <View style={{ position:'absolute', bottom:40, justifyContent:'center', alignItems:'center', width:Dimensions.get('screen').width }} >
         <View style={{ width:100, justifyContent:'center', alignItems:'center', backgroundColor:'#00000050', borderRadius:5}} >
           <Text style={styles.numberCurrentText}> {numberCurrent}/{numberofPages} </Text>
          </View>
        </View>
        <View style={{ position:'absolute', top:50, justifyContent:'center', alignItems:'center', width:Dimensions.get('screen').width }} >
         <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#00000050', borderRadius:5}} >
           <Text style={styles.numberCurrentTextPage}> En son kaydedilen sayfa: {savePage} </Text>
          </View>
        </View>
      </>
      : null
      }
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  fadingContainer: {
    height:100,
    width:100,
    padding: 20,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28
  },
  container: {
    backgroundColor: "#eee",
    flex:1,
    zIndex:4,
  },
  pdf: {
   flex:9,
    backgroundColor: "#eee",
    padding: 0,
    margin: 0,
  },
  pdf2: {
    height:50,
    backgroundColor: "#FFF",
    padding: 0,
    margin: 0,
  },
  numberCurrent:{
    width:Dimensions.get('screen').width , 
    backgroundColor:'#eee',
    bottom:0,
    position:'absolute',
    minHeight:10,
    paddingTop:5,
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    marginBottom:0,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
    borderRadius:4,
  },
  numberCurrentText:{
    zIndex:2,
    color:'#fff',
    fontSize:16,
    fontWeight:'500',
    padding:0,
    margin:2
  },
  numberCurrentTextPage:{
    zIndex:2,
    color:'#fff',
    fontSize:12,
    fontWeight:'500',
    padding:0,
    margin:2,
  },
})


