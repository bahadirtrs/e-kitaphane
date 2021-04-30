import React, { useEffect, useMemo, useState } from "react"
import { Dimensions } from "react-native"
import { FlatList, StyleSheet, Text, View } from "react-native"
import RequestManager from "../utils/requestManager"
import BooksItem, { BooksItemPlaceholder } from "./booksItem"
import CategorysItem, { CategorysItemPlaceholder } from "./categorysItem"

function BooksList({ sharedKey, title = "", onPress, request, categoryID, columnType }) {
  const [fetching, setFetching] = useState(false)
  const [products, setProducts] = useState([])
  const getProducts = useMemo(() => RequestManager(request), [request])

  useEffect(() => {
    setFetching(true)
    getProducts
      .then(res => {
        setProducts(res.data)
        setTimeout(() => {
          setFetching(false)
        }, 500)
      })
      .catch(err => {
        setFetching(false)
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
            if(columnType=='categorys'){
              return <CategorysItemPlaceholder />
            }else{
              return <BooksItemPlaceholder />
            }

          }
          if(columnType=='categorys'){
            return <CategorysItem categoryID={categoryID} sharedKey={sharedKey} item={item} />
          }else{
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
    borderBottomColor:'#88888810',
    borderBottomWidth:1
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
