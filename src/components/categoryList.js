import React, { useEffect, useMemo, useState } from "react"
import { Dimensions } from "react-native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import RequestManager from "../utils/requestManager"
import CategorysItem, { CategorysItemPlaceholder } from "./categorysItem"
import SearchBar from '../components/searchBar'
import Icon from "react-native-vector-icons/Ionicons"
import { ActivityIndicator } from "react-native"

function CategoryList({ sharedKey, title, onPress, request, categoryID, columnType }) {
  const [fetching, setFetching] = useState(false)
  const [products, setProducts] = useState([])
  const [term, setTerm] = useState("")
  const [filterData, setFilterData] = useState([])
  const getProducts = useMemo(() => RequestManager(request), [request])

  useEffect(() => {
    setFetching(true)
    getProducts
      .then(res => {
        setProducts(res.data)
        setTimeout(() => {setFetching(false)}, 500)
      })
      .catch(err => {
        setFetching(false)
      })
  }, [getProducts])

  const SearchFilter = (text)=>{
    setTerm(text)
    const newData = products.filter( item =>{
    const ListItem = `${item.title.toLowerCase()}`;
    const ListItemAuthor = `${item.author.toLowerCase()}`;
      return(ListItem.indexOf(text.toLowerCase())> -1 
      || ListItemAuthor.indexOf(text.toLowerCase())> -1);
    })
    setFilterData(newData);
    console.log(newData)
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerExp} >
        <SearchBar
          value={term}
          setTermClick={()=>setTerm("")}
          onChangeText={term => SearchFilter(term)}
          title={title+" kategorisinde ara"}
        />
      </View>
      <View style={{justifyContent:'flex-start', alignItems:'flex-start'}} >
        {products.length>0
          ?<CategoryItems 
            categoryID={categoryID} 
            fetching={false} 
            products={term?.length > 1 ?filterData:products} 
            sharedKey={sharedKey}
          />
          :<Loading/>
        }  
      </View>
    </View>
  )
}
const Loading = () =>{
  return(
    <View style={styles.loadingContainer} >
      <ActivityIndicator size='large' />
    <Text style={styles.loadingText}>Kitaplar yükleniyor...</Text>
    </View>
  )
}

const CategoryItems = ({ products, fetching,categoryID,sharedKey})=>{
  if(products.length>0){
    return(
    <View style={styles.itemContainer} >
        <FlatList
          horizontal={false}
          numColumns={3}
          style={{paddingBottom:300}}
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={fetching ? products : products}
          keyExtractor={(item, index) => "featured-item-" + index}
          renderItem={({item})=> {
            if(fetching){return<CategorysItemPlaceholder />}
            return <CategorysItem categoryID={categoryID} sharedKey={sharedKey} item={item} />
          }}
        />
      </View>
    )
  }else if(products.length==0){
    return(
      <View style={styles.notResultStyleContainer} >
        <View style={{alignItems:'center'}} >
          <Icon name="search-sharp" size={30} color="#ccc" />
          <Text style={styles.notResultText}>Arama sonucunda kitap bulunamadı</Text>       
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:Dimensions.get('screen').width,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginHorizontal: 0,
    borderBottomColor:'#88888810',
    borderBottomWidth:1,
  },
  containerExp:{ 
    width:Dimensions.get('screen').width, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#1d3557', 
    paddingBottom:30
  },
  cardTitleView: {
    width: "100%",
    paddingHorizontal:5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContainer:{ 
    width:Dimensions.get('screen').width, 
    justifyContent:'flex-start', 
    alignItems:'flex-start', 
    paddingBottom:80,
    paddingLeft:Dimensions.get('screen').width*0.03,
  },
  cardTitle: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 20,
    paddingVertical:12,
  },
  cardTitleButton: {
    fontSize: 13,
    fontFamily:'GoogleSans-Bold',
    color: "#555",
  },
  notResultStyleContainer:{ 
    width:Dimensions.get('screen').width-20, 
    flex:1, 
    flexDirection:'row',
    justifyContent:'center', 
    alignItems:'flex-start', 
    paddingTop:30
  },
  notResultText:{
    fontFamily:'GoogleSans-Regular', 
    fontSize:16, 
    color:'#333'
  },
  loadingContainer:{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height*0.7, justifyContent:'center', alignItems:'center', paddingVertical:20},
  loadingText:{fontFamily:'GoogleSans-Regular', fontSize:16,paddingVertical:5, color:'#333'},


})
export default CategoryList;
