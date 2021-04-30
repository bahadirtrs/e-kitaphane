import React,{useState, useEffect} from "react"
import { StyleSheet,View,Text,FlatList,StatusBar,Alert,Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Pdf from "react-native-pdf"
import { endpoints, BASE_URL } from "../../../utils/constants"
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'


const getList = (pageCount) => {
  const pageList = [];
  for(i=0; i<pageCount; i++){
    pageList.push(i+1);
  }
  return pageList;
}
export default function ReaderScreen({ navigation, route }) {


React.useLayoutEffect(() => {
  navigation.setOptions({
    headerShown: false,
  })
}, [navigation])
  const [numberCurrent, setNumberCurrent] = useState(1)
  const [numberofPages, setNumberofPages] = useState()
  const [continuePage, setContinuePage] = useState(0)
  const [isEnabled, setIsEnabled] = useState(false);
  const source = { uri: BASE_URL +"api/show-preview/" + route.params.id, cache: true }
  console.log(source)

  const NumberOfDelete = async(params,item)=>{
    if(params=='true'){
      setNumberCurrent(Number(item))
    }
    let pageNum =JSON.stringify(route.params.id)
    await AsyncStorage.getItem(pageNum).then(item => {
      if(item!==null){
        AsyncStorage.removeItem(pageNum);
      }
  });
  }

  const Contiunie =(item,params)=>{
    if(isEnabled){
      setNumberCurrent(Number(item));
    }else{
      Alert.alert(
        "Kaldığınız sayfayı unutmadk!",`Bu kitabın ${item} sayfasında kaldınız. Okumaya bu sayfadan devam etmek istermisiniz?`,
        [
          { text: "Devam Et",style: "cancel", onPress: () => NumberOfDelete('true',item)  },
          { text: "Baştan Başla", onPress: () => NumberOfDelete('false',item), }
        ]
      );
    }
    
  }

  useEffect(() => {
    const pageNum =JSON.stringify(route.params.id)
    AsyncStorage.getItem(pageNum).then(item =>{
      if(item!==null){
        console.log(item[0])
        setContinuePage(item)
        Contiunie(item,route.params.id)
      }  })

       
  }, [])


  useEffect(() => {
    const pageNum =JSON.stringify(route.params.id)
    AsyncStorage.getItem(pageNum+'autoSave').then(item =>{
      if(item!==null){
        if(item==='true'){
          setIsEnabled(false)
        }else if(item==='false'){
          setIsEnabled(true)
        }
      }
       })  
  }, [])
  
  const itemTrue = ()=>{
    const pageNum =JSON.stringify(route.params.id)
    
    if(isEnabled)
    AsyncStorage.setItem(pageNum+'autoSave', 'true'); 
    else
    AsyncStorage.setItem(pageNum+'autoSave', 'false'); 
   
      Enable()
 
  }
const Enable =()=>{
  setIsEnabled(!isEnabled)
}
  const PageSave =()=>{
    let pageNum =JSON.stringify(route.params.id)
    let number = JSON.stringify(numberCurrent)
    AsyncStorage.setItem(pageNum, number); 
    Alert.alert('Sayfa Kaydedildi', `Bir sonraki ziyaretinizde ${numberCurrent}.sayfadan devam edebileceksiniz.`)
  }

 
  return (
    <>
    <SafeAreaView style={styles.container}> 
    <StatusBar backgroundColor={'#fff'}/>
    <PageHeaderBackLayout 
        type={'pdf'}
        butonColor={'#118ab2'} 
        butonPress={()=>navigation.goBack()}
        title={route.params.title}
        backgrounColor={'#fff'}
        pageSave={()=>PageSave()}
        />
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>itemTrue()}
        value={isEnabled}
      />
      <Text> Otomatik Kayıt </Text>
      <Pdf
        source={source}
        page={numberCurrent}
        horizontal={true}
        enablePaging={true}
        fitWidth={true}
        cache={true}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`)
          setNumberofPages(numberOfPages)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`)
          if(page !== 1 && numberCurrent){
            setNumberCurrent(page)
          }
          if(isEnabled){
            let pageNum =JSON.stringify(route.params.id)
            let number = JSON.stringify(numberCurrent)
            AsyncStorage.setItem(pageNum, number); 
          }
        }}
        onError={error => {
          console.log(error)
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`)
        }}
        style={styles.pdf}
      />
      <View style={styles.numberCurrent}>
        <Text> {isEnabled? 'true': 'false'} </Text>
        <FlatList
          keyboardDismissMode="on-drag"
          keyExtractor={(item, index) => "search-result-item-" + index}
          scrollEnabled={true}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // scrollToIndex={numberCurrent}
          data={getList(numberofPages)}
            renderItem={({ item,index }) => {
              if(item-1<numberofPages){
                return (  
                <TouchableOpacity onPress={()=>setNumberCurrent(index+1)} style={{  width:40, height:55, borderColor: item==numberCurrent?'#118ab2':'#ccc', borderWidth:item==numberCurrent? 2:1, margin:2,borderRadius:5}} >
                  <View style={{zIndex:1, width:35, height:50, backgroundColor:'#118ab201', position:'absolute', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:'GoogleSans-Regular', color:'#333', fontSize:10}}>{item}</Text>
                  </View>
                </TouchableOpacity>
                )
              }
            }}
        />
        <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%', paddingVertical:10, }} >
          <TouchableOpacity onPress={()=>{setNumberCurrent(numberCurrent>1?numberCurrent-1:numberCurrent)}} >
            <Icon name="chevron-back-outline" size={32} color="#333" />
          </TouchableOpacity>
          <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#118ab2', borderRadius:5}} >
             <Text style={styles.numberCurrentText} > {numberCurrent}/{numberofPages} </Text>
          </View>
          <TouchableOpacity onPress={()=>{setNumberCurrent(numberCurrent<numberofPages?numberCurrent+1:numberCurrent)}} >
            <Icon name="chevron-forward-outline" size={32} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  pdf: {
   flex:9,
    backgroundColor: "#FFF",
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
    minHeight:56,
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
  
    
  },
  numberCurrentText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'500',
    padding:0,
    margin:5
     
  }
})
