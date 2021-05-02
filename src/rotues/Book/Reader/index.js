import React,{useState, useEffect, useRef} from "react"
import AsyncStorage from '@react-native-community/async-storage';
import Pdf from "react-native-pdf"
import Icon from "react-native-vector-icons/Ionicons"
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import BeingIndicator from '../../../components/Indicator/BeingIndicator'
import { StyleSheet,View,Text,FlatList,StatusBar,Alert,Animated,Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BASE_URL } from "../../../utils/constants"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Dimensions } from "react-native"
import Activator from '../../../components/Indicator/Activator'
let pageNumber=0;

function getData(number) {
  let data = [];
  for(var i=1; i<number+2; ++i){
    data.push("" + i);
  }
  return data;
}

export default function ReaderScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false})
  }, [navigation])

    const [numberCurrent, setNumberCurrent] = useState(1)
    const [numberofPages, setNumberofPages] = useState(0)
    const [continuePage, setContinuePage] = useState(0)
    const [savePage, setSavePage] = useState(0)
    const [isEnabled, setIsEnabled] = useState(false);
    const [activity, setActivity] = useState(true)
    const [isPageControllerHide, setPageControllerHide] = useState(false)
    const [isZoomActive, setZoomActive] = useState(true)
    const source = { uri: BASE_URL +"api/show-preview/" + route.params.id, cache: true }

  const getItemLayout = (data, index) => (
    {length: 85, offset: (85 * index)-Dimensions.get('screen').width/1.7, index }
  )
  const scrollToItem = (res) => {
    let randomIndex = res;
    flatListRef.scrollToIndex({animated: true, index: randomIndex});
  }
  const NumberOfDelete = async(params,item)=>{
    const pageNum =JSON.stringify(route.params.id)
    if(params=='true'){
      setSavePage(item)
      AsyncStorage.setItem(pageNum, item);
      setNumberCurrent(Number(item))
    }if(params=='false'){
      let pageNum =JSON.stringify(route.params.id)
      await AsyncStorage.removeItem(pageNum);
    }
  }

  const StrongeNumberDelete = async()=>{
    let pageNum =JSON.stringify(route.params.id)
    Alert.alert(
      "Kaydedilen sayfa siliniyor...",'Kaydettiğiniz sayfa silinecek ve bu kitap 1.sayfadan başlatılacaktır. Bu işlemi geri alamazsınız. Onaylıyor musunuz?',
      [
        { text: "Evet",style: "cancel", onPress: () => {
          AsyncStorage.removeItem(pageNum);
          setNumberCurrent(1)
        }  
        },
        { text: "Hayır", onPress: () =>null }
      ]
    );
  }
  const Contiunie =(item,params)=>{
    if(isEnabled){
      setNumberCurrent(Number(item));
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
  console.log(scale)
  if(scale>1.1){
    setZoomActive(false)
  }else{
    setZoomActive(true)
  }
}

  useEffect(() => {
    const pageNum =JSON.stringify(route.params.id)
    const number = JSON.stringify(numberCurrent)
    AsyncStorage.getItem(pageNum).then(item =>{
      if(item!==null){
        pageNumber=item;
        AsyncStorage.getItem('autoSave').then(item =>{
          if(item!==null){
            if(item==='true'){
              Contiunie(pageNumber,route.params.id)
              setIsEnabled(false)
            }else if(item==='false'){
              setIsEnabled(true)
              setNumberCurrent(Number(pageNumber));
            }
          }
        })
      }else{
        AsyncStorage.setItem(pageNum,number ); 
        setSavePage(number)
      }
    })  
  }, [])

  useEffect(() => {
    const pageNum =JSON.stringify(route.params.id)
    const number = JSON.stringify(numberCurrent)
    AsyncStorage.setItem(pageNum, number);
    setSavePage(number)
  }, [isEnabled])

    useEffect(() => {
      if(numberofPages!==0){
        setActivity(false)
      }
    },[numberofPages])
  
  const itemTrue = ()=>{
    const pageNum =JSON.stringify(route.params.id)
    if(isEnabled)
      AsyncStorage.setItem('autoSave', 'true'); 
    else
      AsyncStorage.setItem('autoSave', 'false'); 
      Enable()
  }

  const Enable =()=>{
    setIsEnabled(!isEnabled)
  }

  const PageSave =()=>{
    let pageNum =JSON.stringify(route.params.id)
    let number = JSON.stringify(numberCurrent)
    if(isEnabled){
      Alert.alert('Otomatik kaydeme açık', `Kaldığınız sayfa otomatik olarak kaydediliyor.`,
        [
          { text: "Tamam",style: "cancel", onPress: () => null  },
        ]
        )
    }else{
      AsyncStorage.setItem(pageNum, number); 
      setSavePage(number)
        Alert.alert('Sayfa kaydedildi. ', `Bir sonraki ziyaretinizde ${numberCurrent}.sayfadan devam edebileceksiniz.`,
        [
          { text: "Tamam",style: "cancel", onPress: () => null  },
        ]
        )
    }
     
  }

  const ScreenClick = async ()=>{
    await setPageControllerHide(!isPageControllerHide); 
    if(isPageControllerHide){
      fadeOut()
    }else{
      fadeIn()
    }
    
  }


  const SlideInLeft = useRef(new Animated.Value(0)).current;
  

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(SlideInLeft, {
      toValue: 1,
      duration: 500,
      useNativeDriver:false,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(SlideInLeft, {
      toValue: 0,
      duration: 500,
      useNativeDriver:false,
    }).start();
  };

  return (
    <>
  {activity ?<BeingIndicator title={'Lüften bekleyiniz.Kitap yükleniyor'} />:null}

    <View style={styles.container}> 
      {isPageControllerHide ?
        <SafeAreaView style={{ zIndex:1, position:'absolute', backgroundColor:'#457b9d', paddingBottom:0, paddingTop:5}}>
          <StatusBar barStyle="light-content" backgroundColor={'#457b9d'}/>
          <PageHeaderBackLayout 
            type={'pdf'}
            butonColor={'#fff'} 
            textColor={'#fff'}
            butonPress={()=>navigation.goBack()}
            title={route.params.title}
            backgrounColor={'#457b9d'}
            pageSave={()=>PageSave()}
            deleteNumber={()=>StrongeNumberDelete()}
            />  
        </SafeAreaView>
    :null}
    <Pdf
      source={source}
      page={numberCurrent}
      horizontal={true}
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
          if(page !== 1 && numberCurrent){
            setNumberCurrent(page)
          }
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
              outputRange: [600, 0]
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
              <Icon name="checkbox-outline" size={20} color="#118ab2" />
            </TouchableOpacity>
          : <TouchableOpacity onPress={()=>itemTrue()} >
              <Icon name="square-outline" size={20} color="#555" />
            </TouchableOpacity>
          }
          <Text style={{fontFamily:'GoogleSans-Regular',color:'#555', fontSize:12}}> Kaldığım sayfayı otomatik olarak kaydet </Text>
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
              <TouchableOpacity activeOpacity={0.9} onPress={()=>setNumberCurrent(Number(item))} style={{width:Dimensions.get('screen').width,  backgroundColor:'#fff', width:65, height:90, borderColor: item==numberCurrent?'#118ab2':'#ccc', borderWidth:item==numberCurrent?3:1, marginHorizontal:10, marginVertical:5, borderRadius:5, justifyContent:'center', alignItems:'center'}} >
                <View style={{width:Dimensions.get('screen').width,  zIndex:1, width:65, height:90, backgroundColor:'#118ab201', position:'absolute', justifyContent:'center', alignItems:'center'}}>
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
      <View style={{ position:'absolute', bottom:60, justifyContent:'center', alignItems:'center', width:Dimensions.get('screen').width }} >
         <View style={{ width:100, justifyContent:'center', alignItems:'center', backgroundColor:'#00000050', borderRadius:5}} >
           <Text style={styles.numberCurrentText}> {numberCurrent}/{numberofPages} </Text>
          </View>
        </View>
        <View style={{ position:'absolute', top:50, justifyContent:'center', alignItems:'center', width:Dimensions.get('screen').width }} >
         <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#00000050', borderRadius:5}} >
           <Text style={styles.numberCurrentTextPage} > En son kaydedilen sayfa: {savePage} </Text>
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
    margin:2
     
  }
})


