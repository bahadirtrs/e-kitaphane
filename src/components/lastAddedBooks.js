import React, { useCallback, useState } from "react"
import { FlatList, Pressable, StyleSheet, View } from "react-native"
import RequestManager from "../utils/requestManager"
import { bookCoverRatio, endpoints } from "../utils/constants"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import FastImage from "react-native-fast-image"

function LastAddedBooks() {
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
      })
      .catch(err => {
        console.log("err", err)
      })
  }, [])

  useFocusEffect(getProducts)

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item, index) => "featured-item-" + index}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                push("BookDetail", {
                  id: item.id,
                })
              }>
              <FastImage
                style={styles.bookCoverImage}
                source={{
                  uri: item?.image?.thumbnail,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Pressable>
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
    shadowColor: "#000",
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
