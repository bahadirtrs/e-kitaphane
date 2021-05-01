import React,{useState, useEffect} from "react"
import { StyleSheet,View,Text,FlatList,StatusBar,Alert,Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Pdf from "react-native-pdf"
import { endpoints, BASE_URL } from "../../../utils/constants"
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { Dimensions } from "react-native"
import BeingIndicator from '../../../components/Indicator/BeingIndicator'
let pageNumber=0;
const getList = (pageCount) => {
  const pageList = [];
  for(i=0; i<pageCount; i++){
    pageList.push(i+1);
  }return pageList;
}
export default function ReaderScreen({ navigation, route }) {

  React.useLayoutEffect(() => {
  navigation.setOptions({
    headerShown: false,
  })
}, [navigation])
  const [numberCurrent, setNumberCurrent] = useState(1)
  const [numberofPages, setNumberofPages] = useState(0)
  const [continuePage, setContinuePage] = useState(0)
  const [isEnabled, setIsEnabled] = useState(false);
  const [activity, setActivity] = useState(true)
  const [isPageControllerHide, setPageControllerHide] = useState(true)
  const source = { uri: BASE_URL +"api/show-preview/" + route.params.id, cache: true }
  console.log(source)

  const NumberOfDelete = async(params,item)=>{
    if(params=='true'){
      setNumberCurrent(Number(item))
    }
  
      let pageNum =JSON.stringify(route.params.id)
      await AsyncStorage.removeItem(pageNum);
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

       
        pageNumber=item;


      }})  
       
       

  }, [])

    useEffect(() => {
    if(numberofPages>0){
      setActivity(false)
    }
    }, )
  

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
    AsyncStorage.setItem(pageNum, number); 
      Alert.alert('Sayfa Kaydedildi', `Bir sonraki ziyaretinizde ${numberCurrent}.sayfadan devam edebileceksiniz.`)
  }
  return (
    <>
    <View style={styles.container}> 
    {isPageControllerHide ?
    <SafeAreaView  style={{zIndex:1, position:'absolute', backgroundColor:'#fff'}}>
       {activity?<BeingIndicator title={'Lüften bekleyiniz.Kitap yükleniyor'} />:null}
       <StatusBar backgroundColor={'#fff'}/>
        <PageHeaderBackLayout 
          type={'pdf'}
          butonColor={'#118ab2'} 
          butonPress={()=>navigation.goBack()}
          title={route.params.title}
          backgrounColor={'#fff'}
          pageSave={()=>PageSave()}
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
        onPageSingleTap={()=>setPageControllerHide(!isPageControllerHide)}
        onLoadComplete={(numberOfPages, filePath) => {
          setNumberofPages(numberOfPages)
        }}
        onPageChanged={(page, numberOfPages) => {
          if(isEnabled){
            let pageNum =JSON.stringify(route.params.id)
            let number = JSON.stringify(numberCurrent)
            AsyncStorage.setItem(pageNum, number); 
          }
          console.log(`current page: ${page}`)
          if(page !== 1 && numberCurrent){
            setNumberCurrent(page)
            setNumberCurrent(page)
          }
        }}
       
        style={styles.pdf}
      />
     

      {isPageControllerHide ?
      <View style={styles.numberCurrent}>
         <View style={{ position:'absolute', bottom:130,width:100, justifyContent:'center', alignItems:'center', backgroundColor:'#00000050', borderRadius:5}} >
             <Text style={styles.numberCurrentText} > {numberCurrent}/{numberofPages} </Text>
          </View>
        <View style={{ flexDirection:'row', justifyContent:'flex-start',alignItems:'center', padding:5}} >
          { isEnabled
          ?<TouchableOpacity onPress={()=>itemTrue()} >
             <Icon name="checkbox-outline" size={20} color="#118ab2" />
           </TouchableOpacity>
           :<TouchableOpacity onPress={()=>itemTrue()} >
              <Icon name="square-outline" size={20} color="#555" />
            </TouchableOpacity>
          }
          <Text style={{fontFamily:'GoogleSans-Regular',color:'#555', fontSize:12}}> Kaldığım sayfayı otomatik olarak kaydet </Text>
        </View>
<View style={{flexDirection:'row', alignItems:'center'}} >
<TouchableOpacity activeOpacity={0.9} onPress={()=>{setNumberCurrent(numberCurrent>1?numberCurrent-1:numberCurrent)}} >
            <Icon name="chevron-back-outline" size={32} color="#333" />
          </TouchableOpacity>
        
        <FlatList
          keyboardDismissMode="on-drag"
          keyExtractor={(item, index) => "search-result-item-" + index}
          style={{width:200}}
          scrollEnabled={true}
          horizontal={true}
          fitPolicy={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // scrollToIndex={numberCurrent}
          data={getList(numberofPages)}
            renderItem={({ item,index }) => {
              if(item-1<numberofPages){
                return (  
                <TouchableOpacity activeOpacity={0.9} onPress={()=>setNumberCurrent(item)} style={{  width:40, height:55, borderColor: item==numberCurrent?'#118ab2':'#ccc', borderWidth:item==numberCurrent? 2:1, margin:2,borderRadius:5}} >
                  <View style={{zIndex:1, width:35, height:50, backgroundColor:'#118ab201', position:'absolute', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:'GoogleSans-Regular', color:'#333', fontSize:10}}>{item}</Text>
                  </View>
                </TouchableOpacity>
                )
              }
            }}
        />
<TouchableOpacity activeOpacity={0.9} onPress={()=>{setNumberCurrent(numberCurrent<numberofPages?numberCurrent+1:numberCurrent)}} >
            <Icon name="chevron-forward-outline" size={32} color="#333" />
          </TouchableOpacity>

</View>
        <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%', paddingVertical:10, }} >
          
          
         
          
        </View>
      </View>
        :<View style={{ position:'absolute', bottom:50, justifyContent:'center', alignItems:'center', width:Dimensions.get('screen').width }} >
          <View style={{ width:100, justifyContent:'center', alignItems:'center', backgroundColor:'#00000050', borderRadius:5}} >
            <Text style={styles.numberCurrentText} > {numberCurrent}/{numberofPages} </Text>
          </View>
        </View>
        }
    </View>
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
    width:Dimensions.get('screen').width , 
    backgroundColor:'#eee',
    bottom:0,
    position:'absolute',
    minHeight:60,
    paddingTop:5,
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    marginBottom:10
  
    
  },
  numberCurrentText:{
    
    color:'#fff',
    fontSize:16,
    fontWeight:'500',
    padding:0,
    margin:2
     
  }
})
