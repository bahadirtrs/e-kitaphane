import React, { useEffect, useMemo, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SearchBar from "../../components/searchBar"
import RequestManager from "../../utils/requestManager"
import { endpoints } from "../../utils/constants"
import BooksListItem, { BooksListItemPlaceholder } from "../../components/booksListItem"
import CategoryListItem from "../../components/categoryListItem"
import PleaseWait from "../../components/pleaseWait"
import Icon from "react-native-vector-icons/Ionicons"
import { StatusBar } from "react-native"
import { SafeAreaView } from "react-native"
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'


export default function SearchScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])
  const [term, setTerm] = useState("")
  const [productsFetching, setProductsFetching] = useState(false)
  const [categoriesFetching, setCategoriesFetching] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filterData, setFilterData] = useState([])
  const insets = useSafeAreaInsets()
  const getProducts = useMemo(
    () =>
      RequestManager({
        method: endpoints.products.method,
        url: endpoints.productsByCategory.path + "/" + 1,
        auth: endpoints.products.auth,
        params: {},
        headers: {
          Accept: "application/json",
        },
      }),
    [],
  )

  const getCategories = useMemo(
    () =>
      RequestManager({
        method: endpoints.categories.method,
        url: endpoints.categories.path,
        auth: endpoints.categories.auth,
        headers: {
          Accept: "application/json",
        },
      }),
    [],
  )

  useEffect(() => {
    if (term?.length > 2) {
      setProductsFetching(true)
      getProducts
        .then(res => {
          setProducts(res.data)
          SearchFilter(term)
          setTimeout(() => {
            setProductsFetching(false)
          }, 500)
        })
        .catch(err => {
          setProductsFetching(false)
        })
    }
  }, [getProducts, term])

  const SearchFilter = (text)=>{
    const newData = products.filter( item =>{
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
    setCategoriesFetching(true)
    getCategories
      .then(res => {
        setCategories(res)
        setTimeout(() => {
          setCategoriesFetching(false)
        }, 500)
      })
      .catch(err => {
        console.log(err)
        setCategoriesFetching(false)
      })
  }, [getCategories])

  return (
    <View style={styles.container}>
      <SafeAreaView backgroundColor={'#1d3557'} />
      <StatusBar backgroundColor='#1d3557' barStyle='light-content' />
       <View style={{ justifyContent:'center', alignItems:'center', paddingVertical:30,backgroundColor:'#1d3557'}}>
          <Text style={{color:'#fff', fontFamily:'GoogleSans-Medium', fontSize:24, paddingBottom:10}}> Kitap Ara</Text>
          <SearchBar
            value={term}
            setTermClick={()=>setTerm("")}
            onChangeText={term => {setTerm(term)}}
            title={'Yazarlar veya kitaplar arasında ara'}
          />
       </View>
        
      {term?.length > 2 ? <SearchResults fetching={productsFetching} products={filterData} /> : undefined}
      {!(term?.length > 2) ? <Categories fetching={categoriesFetching} categories={categories} /> : undefined}
   { /*   <BottomButton onPress={() => navigation.goBack()} title="Kapat" /> */ }
    </View>
  )
}

const SearchResults = ({ products, fetching }) => {
  if(products.length>0){
    return (
      <FlatList
        keyboardDismissMode="on-drag"
        keyExtractor={(item, index) => "search-result-item-" + index}
        data={products}
        renderItem={({ item }) => {
          if (fetching) {
            return <BooksListItemPlaceholder />
          }
          return <BooksListItem sharedKey="search_result" item={item} />
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

const Categories = ({ categories, fetching }) => {
  if (fetching) {
    return <PleaseWait title={"Kategoriler yükleniyor..."}/>
  } else {
    return (
      <FlatList
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View>
            <Text style={styles.flatListHeaderTitle}>KATEGORİLER</Text>
          </View>
        }
        keyExtractor={(item, index) => "search-result-item-" + index}
        data={categories}
        renderItem={({ item }) => {
          return <CategoryListItem item={item} />
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal:0
  },
  flatListHeaderTitle: {
    padding: 12,
    letterSpacing: 0.3,
    fontFamily:'GoogleSans-Bold',
    fontSize: 22,
  },
})
