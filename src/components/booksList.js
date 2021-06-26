import React, { useEffect, useMemo, useState } from "react"
import { Dimensions } from "react-native"
import { ActivityIndicator } from "react-native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import RequestManager from "../utils/requestManager"
import BooksItem from "./booksItem"
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native"

function BooksList({ sharedKey, title = "", onPress, request, categoryID, columnType }) {
  const {colors}=useTheme()
  const [fetching, setFetching] = useState(false)
  const [products, setProducts] = useState([])
  const getProducts = useMemo(() => RequestManager(request), [request])

  useEffect(() => {
    setFetching(true)
    getProducts
      .then(res => {
        setProducts(res.data)
        setFetching(false)
      })
      .catch(err => {
        setFetching(true)
      })
  }, [getProducts])

  return (
    <View style={[styles.container,{backgroundColor:colors.background, borderBottomColor:colors.border}]}>
      <View style={[styles.cardTitleView]}>
        <Text style={[styles.cardTitle, {color:colors.text}]}>{title}</Text>
        {onPress ? (
          <Text onPress={onPress} style={[styles.cardTitleButton,{color:colors.text}]}>
            Tümü
          </Text>
        ) : undefined}
      </View>
      <FlatList
        horizontal={onPress ? true: false}
        numColumns={onPress ? 0 :3}
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        data={fetching ? [0, 1, 2, 3, 5] : products}
        keyExtractor={(item, index) => "featured-item-" + index}
        renderItem={({ item }) => {
          if (fetching) {
            return <ActivityIndicator />
          }{
            return <BooksItem categoryID={categoryID} sharedKey={sharedKey} item={item} />
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('screen').width,
    justifyContent:'center',
    alignItems:'flex-start',
    paddingVertical: 5,
    borderBottomColor:COLORS.border,
    borderBottomWidth:1,
    backgroundColor:'red'
  },
  cardTitleView: {
    width: "100%",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  
  },
  cardTitle: {
    color:COLORS.textColor,
    fontFamily:'GoogleSans-Bold',
    fontSize: 20,
    paddingVertical: 10,
  },
  cardTitleButton: {
    fontSize: 13,
    fontFamily:'GoogleSans-Bold',
    color:COLORS.textColor
  },
})
export default BooksList;