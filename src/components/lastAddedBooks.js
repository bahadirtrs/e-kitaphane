import React, { useCallback, useState } from "react"
import { FlatList, Pressable, StyleSheet, View,Text } from "react-native"
import RequestManager from "../utils/requestManager"
import { bookCoverRatio, endpoints } from "../utils/constants"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import NewAddedBooks from '../components/newAddedBoks'
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native"
import { Dimensions } from "react-native"
import { SafeAreaView } from "react-native"
import { StatusBar } from "react-native"
import Icon  from "react-native-vector-icons/Ionicons"

function LastAddedBooks() {
  const {colors}=useTheme()
  const { push } = useNavigation()
  const [products, setProducts] = useState([])

  const getProducts = useCallback(() => {
    RequestManager({
      method: endpoints.products.method,
      url: endpoints.products.path,
      params: {
        order: "id:desc",
      },
      auth: endpoints.products.auth,
      headers: {
        Accept: "application/json",
      },
    })
      .then(res => {
        setProducts(res.data)
        console.log( JSON.stringify(res.data))
      })
      .catch(err => {
        console.log("err", err)
      })
  }, [])

  useFocusEffect(getProducts)

  const HeaderListComponent = ()=>{
    return(
      <View style={{ width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center', paddingVertical:20,marginBottom:10, backgroundColor:colors.primary,}} >
        <Icon name="newspaper-outline" size={60} color={colors.textColorLight}/> 
        <Text style={{fontSize:24, color:colors.textColorLight, fontFamily:'GoogleSans-Medium'}} >Son Eklenen Kitaplar</Text>
      </View>
    )
  }

  return (
    <View >
      <SafeAreaView backgroundColor={colors.primary} />
      <StatusBar backgroundColor={colors.primary} />
        <FlatList
          data={products}
          alignItems={'flex-end'}
          style={{width:Dimensions.get('screen').width}}
          ListHeaderComponent={()=>HeaderListComponent()}
          keyExtractor={(item, index) => "featured-item-" + index}
          renderItem={({ item }) => {
            return (
              <View style={{ width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderBottomColor:colors.border, paddingVertical:5}} >
                <NewAddedBooks categoryID={"1"} sharedKey={"sharedKey"} item={item} />
              </View>
            )
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  bookCoverImage: {
    width: 120,
    height: 120 * bookCoverRatio,
    shadowColor:COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 12,
  },
})
export default LastAddedBooks
