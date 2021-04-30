import { Pressable, StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { numberFormat } from "../utils/utils"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { SharedElement } from "react-navigation-shared-element"
import { bookCoverRatio, BASE_URL } from "../utils/constants"
import { TouchableOpacity } from "react-native"

export default function BooksListItem({ item, sharedKey }) {
  const { push } = useNavigation()
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={() => push("BookDetail", { sharedKey: sharedKey, item: item })}>
      <View>
        <FastImage
          style={styles.bookCoverImage}
          source={{
            uri: BASE_URL + "products/cover/" + item?.cover_image,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.infoContainer}>
        <View >
          <Text style={styles.author} numberOfLines={1}>
            {item?.author}
          </Text>
        </View>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
        </View>
        <Text style={styles.price} numberOfLines={1}>
          {numberFormat(item?.price)} TL
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const BooksListItemPlaceholder = () => {
  return (
    <View style={{ width: "100%", height: "auto", borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}>
      <SkeletonPlaceholder>
        <View style={{ width: "90%", paddingHorizontal: 12, paddingVertical: 12, flexDirection: "row" }}>
          <View style={{ width: 60, height: 60 * bookCoverRatio }} />
          <View style={{ width: "90%", paddingHorizontal: 6, flexDirection: "column" }}>
            <View style={{ width: 120, height: 14, borderRadius: 4 }} />
            <View style={{ marginTop: 4, width: "100%", height: 14, borderRadius: 4 }} />
            <View style={{ marginTop: 4, width: "100%", height: 14, borderRadius: 4 }} />
            <View style={{ marginTop: 4, width: 60, height: 14, borderRadius: 4 }} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  infoContainer: {
    flexDirection: "column",
    paddingHorizontal: 6,
    flex: 1,
  },
  title: {
    flexWrap: "wrap",
    fontFamily:'GoogleSans-Bold',
    fontSize: 14,
    lineHeight: 20,
    color: "#1F2937",
    paddingBottom: 6,
  },
  author: {
    fontFamily:'GoogleSans-Medium',
    fontSize: 16,
    color: "#4B5563",
  },
  price: {
    textAlign: "left",
    fontFamily:'GoogleSans-Medium',
    fontSize: 16,
    color: "#4B5563",
  },
  bookCoverImage: {
    borderWidth: 1,
    borderColor: "#8d8d96",
    width: 60,
    height: 60 * bookCoverRatio,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    borderRadius:4,
    marginRight:5
  },
})
