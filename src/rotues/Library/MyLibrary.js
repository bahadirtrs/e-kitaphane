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
import AsyncStorage from '@react-native-community/async-storage';
import RequestManager from "../../utils/requestManager"
import {logout} from "../../utils/requestManager"


export default function UserInfo({navigation}) {
  const [userInfo, setUserInfo] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [term, setTerm] = useState("")
  const [filterData, setFilterData] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      getProduct()
    }, [])
  );

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
      setUserInfo(res)
      setFetching(false)
    })
    .catch(err => {
      console.log("err", err)
      setFetching(false)
    })
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
    if(term?.length > 2) {
      SearchFilter(term)
    }
  },[term])

  const isLogoutUser = async () => {
    logout()
    navigation.replace('Anasayfa') 
    await AsyncStorage.removeItem('token');
  }

  const HeaderComponent = ()=>{
    return(
      <View style={{paddingHorizontal:13, paddingTop:15}} >
        <Text style={{fontFamily:'GoogleSans-Medium', fontSize:20}} >Satın Aldığınız Kitaplar</Text>
      </View>
    )
  }

  if(userInfo===false){
    return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
        <Text style={{fontFamily:'GoogleSans-Regular', textAlign:'center', fontSize:14, width:'80%' }} >Kütüphanenizi görüntüleyebilmeniz çin giriş yapmanız gerekmektedir.</Text>
    </View>
    )
  } 

    return (
    <View style={{ flex:1,padding:0, justifyContent:'center'}} >
      {fetching
        ? <View style={{ zIndex:1, height:Dimensions.get('screen').height, width:Dimensions.get('screen').width,  position:'absolute'}} >
            <BeingIndicator title={'Yenileniyor'} />
          </View>
        :null
      }
      <SafeAreaView  backgroundColor={'#1d3557'}  />
      <StatusBar backgroundColor={'#1d3557'} barStyle={'light-content'} />
      <View style={{ justifyContent:'center', alignItems:'center', paddingVertical:30,backgroundColor:'#1d3557'}}>
        <Text style={{color:'#fff', fontFamily:'GoogleSans-Medium', fontSize:24, paddingBottom:10}}> Kütüphanede Ara</Text>
        <SearchBar
          value={term}
          setTermClick={()=>setTerm("")}
          onChangeText={term => {setTerm(term)}}
          title={'Yazarlar veya kitaplar arasında ara'}
        />
       </View>
      {term?.length > 2 ? <SearchResults fetching={false} products={filterData} /> : undefined}
      {!(term?.length > 2) 
      
      ? <FlatList
          keyboardDismissMode="on-drag"
          keyExtractor={(item, index) => "search-result-item-" + index}
          scrollEnabled={true}
          ListHeaderComponent={()=>HeaderComponent()}
          horizontal={false}
          numColumns={2}
          alignItems={'center'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={userInfo}
            renderItem={({ item,index }) => {
                return (
                  <LibraryItem categoryID={'1'} sharedKey={"sharedKey"} item={item} />
                )
            }}
        />
      : undefined}
      </View>
    )
}

const SearchResults = ({ products, fetching }) => {
  const HeaderComponent = ()=>{
    return(
     <View style={{paddingHorizontal:13, paddingTop:15}} >
       <Text style={{fontFamily:'GoogleSans-Medium', fontSize:22}} >Satın aldığınız Kitaplar</Text>
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
        <Text style={{fontFamily:'GoogleSans-Regular', fontSize:16, color:'#333'}} >Kitap veya yazar bulunamadı...</Text>
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

