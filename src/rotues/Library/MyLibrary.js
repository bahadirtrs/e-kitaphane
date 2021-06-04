import React, {useState, useEffect,useCallback } from "react"
import { View, Text,StyleSheet,FlatList, StatusBar,SafeAreaView,Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons"

import {BooksListItemPlaceholder} from "../../components/booksListItem"
import SearchBar from "../../components/searchBar"
import BeingIndicator from '../../components/Indicator/BeingIndicator';
import LibraryItem from '../../components/LibraryItem'

import { endpoints } from "../../utils/constants"
import RNSecureStorage from "rn-secure-storage"
import RequestManager from "../../utils/requestManager"
import { ScrollView } from "react-native";
import SubmitButton from '../../components/Button/SubmitButton'
import { useTheme } from "@react-navigation/native"

export default function UserInfo({navigation}) {
  const {colors}=useTheme()
  const [userInfo, setUserInfo] = useState([])
  const [fetching, setFetching] = useState(false)
  const [term, setTerm] = useState("")
  const [filterData, setFilterData] = useState([])
  const [token, setToken] = useState(" ")

  useFocusEffect(
    React.useCallback(() => {
      Token()
    }, [])
  );


  const Token = async() =>{
    try {
      await RNSecureStorage.get("access_token").then((value) => {
        if(value!=null)
          setToken(value);
          getProduct()
      })
    } catch (error) {
        setToken(false)
      console.log(error)
    }
  }
  const getProduct = async()=>{
    setFetching(true)
    RequestManager({
      method: endpoints.ownedProducts.method,
      url: endpoints.ownedProducts.path,
      auth: false,
      headers: {
        Accept: "application/jsonsss",
        Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
      },
    })
    .then(res => {
      dateToASC(res) 
      setFetching(false)
    })
    .catch(err => {
      console.log("err", err)
      setUserInfo(false)
      setFetching(false)
    })
  }

  const dateToASC = async (res)  =>{
    var ownedBooks= [];
    for (let index =0; index < res.length; index++) {
      ownedBooks.push(res[(res.length-index)-1]);
    }
    setUserInfo(ownedBooks) 
  }


  const SearchFilter = (text)=>{
    const newData = userInfo.filter( item =>{
    const ListItem = `${item.title.toLowerCase()}`;
    const ListItemAuthor = `${item.author.toLowerCase()}`;
      return(
      ListItem.indexOf(text.toLowerCase())> -1 
      || 
      ListItemAuthor.indexOf(text.toLowerCase())> -1 
      )
      ;
    })
    setFilterData(newData);
    console.log(newData)
  }

  useEffect(() => {
    if(term?.length > 2 && token) {
      SearchFilter(term)
    }
  },[term])



  const HeaderComponent = ()=>{
    return(
      <View style={{paddingHorizontal:13, paddingTop:15}} >
        <Text style={{fontFamily:'GoogleSans-Medium', fontSize:20, color:colors.text}}>Satın aldıklarınız</Text>
      </View>
    )
  }

    return (
    <ScrollView style={{ flex:1,padding:0, backgroundColor:colors.background}} >
      {fetching
        ? <View style={{ zIndex:1, height:Dimensions.get('screen').height, width:Dimensions.get('screen').width, justifyContent:'center',alignItems:'center', position:'absolute'}} >
            <BeingIndicator title={'Yenileniyor'} />
          </View>
        :null
      }
      <SafeAreaView  backgroundColor={colors.primary}  />
      <StatusBar backgroundColor={colors.primary}  barStyle={'light-content'} />
      <View style={{ justifyContent:'center', alignItems:'center', paddingVertical:30,backgroundColor:colors.primary }}>
        <Icon name="library-outline" size={70} color={colors.textColorLight} />
        <Text style={{color:colors.textColorLight, fontFamily:'GoogleSans-Medium', fontSize:24, paddingBottom:10}}> Kütüphanem</Text>
        <SearchBar
          value={term}
          setTermClick={()=>setTerm("")}
          onChangeText={term => {setTerm(term)}}
          title={'Yazarlar veya kitaplar arasında ara'}
        />
       </View>
      {term?.length  > 2 && token ? <SearchResults fetching={false} products={filterData} /> : undefined}
      {!(term?.length > 2) 
        ? token
          ? userInfo.length>0
            ? <View style={{justifyContent:'flex-start', alignItems:'flex-start'}} >
                <FlatList
                  keyboardDismissMode="on-drag"
                  keyExtractor={(item, index) => "search-result-item-" + index}
                  scrollEnabled={true}
                  //inverted={true}
                  ListHeaderComponent={()=>HeaderComponent()}
                  horizontal={false}
                  scrollEnabled={true}
                  numColumns={2}
                  alignItems={'center'}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={userInfo}
                  renderItem={({item}) => {
                    return (
                        <LibraryItem categoryID={'1'} sharedKey={"sharedKey"} item={item} />
                    )
                  }}
                />
              </View>
            :<NoItem type={'item'} butonPress={()=>navigation.navigation('Ansayfa')}  />
          : <NoItem type={'account'} butonPress={()=>navigation.push('LogIn')}/>
        :null
      }
      </ScrollView>
    )
}

const NoItem = ({type,butonPress})=>{
  const {colors}=useTheme()
  return(
    <View style={{ height:Dimensions.get('window').height*0.6, justifyContent:'center', alignItems:'center'}} >
      <Icon name="book-outline" size={70} color="#118ab2" />
      <Text style={{fontFamily:'GoogleSans-Medium', textAlign:'center', fontSize:20, width:'80%', color:colors.text, paddingBottom:5 }}>Burada hiç kitap yok!</Text>
      {type=='account' 
        ?<Text style={{fontFamily:'GoogleSans-Regular', textAlign:'center', fontSize:12, width:'70%', color:colors.text }}>Oturum açarak satın aldığınız kitaplara bu sayfadan kolayca erişebilirsiniz.</Text>
        :<Text style={{fontFamily:'GoogleSans-Regular', textAlign:'center', fontSize:12, width:'70%', color:colors.text }}>Bir kitap satın aldığınızda burada görünür ve kolayca erişip okuyabilirsiniz.</Text>
      }
      <Text></Text>
      { type=='account'      
        ? <SubmitButton butonPress={butonPress} />
        : null
      }
    </View>
  )
}


const SearchResults = ({ products, fetching }) => {
  const {colors}=useTheme()
  const HeaderComponent = ()=>{
    return(
     <View style={{paddingHorizontal:13, paddingTop:15}} >
       <Text style={{fontFamily:'GoogleSans-Medium', fontSize:22, color:colors.text}} >Arama Sonuçları</Text>
     </View>
    )
  }
  if(products.length>0){
    return (
      <FlatList
        keyboardDismissMode="on-drag"
        keyExtractor={(item, index) => "search-result-item-" + index}
        data={products}
        numColumns={2}
        scrollEnabled={false}
        ListHeaderComponent={()=>HeaderComponent()}
        horizontal={false}
        renderItem={({ item }) => {
          if (fetching) {
            return <BooksListItemPlaceholder />
          }
          return(
          <View style={{padding:0}} >
            <LibraryItem categoryID={'1'} sharedKey={"sharedKey"} item={item} />
          </View>
          )
        }}
      />
    )
  }else{
    return (
      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', paddingTop:30}} >
        <Icon name="search-sharp" size={60} color="#ccc" />
        <Text style={{fontFamily:'GoogleSans-Regular', fontSize:16, color:colors.text}} >Kitap veya yazar bulunamadı...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        width:150,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
})

