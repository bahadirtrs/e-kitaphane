import React, { useEffect, useMemo, useState } from "react"
import { Dimensions } from "react-native"
import { ActivityIndicator } from "react-native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import RequestManager from "../utils/requestManager"
import BooksItem from "./booksItem"

function BooksList({ sharedKey, title = "", onPress, request, categoryID, columnType }) {
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
    <View style={styles.container}>
      <View style={styles.cardTitleView}>
        <Text style={styles.cardTitle}>{title}</Text>
        {onPress ? (
          <Text onPress={onPress} style={styles.cardTitleButton}>
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
    borderBottomColor:'#88888820',
    borderBottomWidth:1,
    backgroundColor:'#f1f1f1'
  },
  cardTitleView: {
    width: "100%",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 20,
    paddingVertical: 10,
  },
  cardTitleButton: {
    fontSize: 13,
    fontFamily:'GoogleSans-Bold',
    color: "#555",
  },
})
export default BooksList;