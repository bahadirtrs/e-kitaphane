import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import { bookCoverRatio, BASE_URL } from "../utils/constants"
import IconPack from "react-native-vector-icons/Entypo"
import Icon from "react-native-vector-icons/Ionicons"
import { SharedElement } from "react-navigation-shared-element"
import { useNavigation } from "@react-navigation/native"

const BookCover = ({ sharedKey, id, imageURI }) => {
  return (
    <View style={styles.bookCover}>
      <View>
        <FastImage
          style={styles.bookCoverImage}
          source={{
            uri: BASE_URL + "products/cover/" + imageURI,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </View>
  )
}

const BookInfo = ({ sharedKey, id, title, author, summary, totalPages, releaseDate, preview,pageNumber }) => {
  const { push } = useNavigation()
  return (
    <View style={styles.bookInfo}>
      <View style={styles.titleView}>
        <View>
          <View>
            <Text style={styles.bookTitle}>{title}</Text>
          </View>
          <View>
            <Text style={styles.bookAuthor}>{author}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bookSmallDetails}>
        {totalPages ? (
          <View style={styles.bookSmallDetailsItem}>
            <Text style={styles.bookSmallDetailsItemTitle}>Sayfa Sayısı</Text>
            <Text style={styles.bookSmallDetailsItemContent}>{totalPages}</Text>
          </View>
        ) : undefined}
        {releaseDate ? (
          <View style={styles.bookSmallDetailsItem}>
            <Text style={styles.bookSmallDetailsItemTitle}>Yayın Tarihi</Text>
            <Text style={styles.bookSmallDetailsItemContent}>{releaseDate}</Text>
          </View>
        ) : undefined}
      </View>
      <Text style={styles.bookDescription}>{summary}</Text>
      {pageNumber>0
      ? <View style={{flexDirection:'row', alignItems:'center'}} >
          <Icon name="bookmark-outline" size={18} color="#1d3557" />
          {pageNumber==1
          ?<Text style={{fontFamily:'GoogleSans-Regular', color:'#666', paddingVertical:5}}> Bu sayfayı en az bir defa ziyaret ettiniz.</Text>

          :<Text style={{fontFamily:'GoogleSans-Regular', color:'#666', paddingVertical:5}}> En son {pageNumber}. sayfayı kaydettiniz.</Text>

          }
        </View>
      :null
      } 
      {preview ? (
        <Pressable
          onPress={() => push("Reader", { id: id, type: "preview", preview: preview, title: title })}
          style={styles.summaryButtonView}>
          <IconPack name="open-book" color={"#333"} size={24} />
          <Text style={styles.summaryButtonText}>İçeriğe gözat </Text>
        </Pressable>
      ) : undefined}
    </View>
  )
}
const styles = StyleSheet.create({
  bookCover: {
    alignItems: "center",
    paddingVertical: 24,
  },
  bookCoverImage: {
    width: 200,
    height: 200 * bookCoverRatio,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 0,
    borderRadius: 8,
    borderWidth:1,
    borderColor:'#ddd'
  },
  bookInfo: {
    padding: 12,
  },
  titleView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    paddingVertical: 12,
    paddingRight:10,
  },
  bookTitle: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 28,
    lineHeight: 28,
    color: "#1F2937",
    paddingVertical: 2,
  },
  bookAuthor: {
    fontFamily:'GoogleSans-Medium',
    fontSize: 20,
    color: "#4B5563",
  },
  bookSmallDetails: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
    paddingVertical: 12,
  },
  bookSmallDetailsItem: {
    paddingRight: 12,
    flexDirection: "column",
  },
  bookSmallDetailsItemTitle: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 12,
    color: "#6B7280",
  },
  bookSmallDetailsItemContent: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 14,
    color: "#4B5563",
    paddingTop: 4,
  },
  bookDescription: {
    fontFamily:'GoogleSans-Regular',
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    paddingVertical: 8,
  },
  summaryButtonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
  },
  summaryButtonText: {
    fontFamily:'GoogleSans-Bold',
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 20,
    paddingVertical: 8,
    paddingLeft: 12,
  },
})
module.exports = { BookCover: BookCover, BookInfo: BookInfo }
