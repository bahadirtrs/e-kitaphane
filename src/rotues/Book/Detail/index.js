import React from "react"
import { Dimensions, ScrollView, StyleSheet, View,Alert } from "react-native"
import { BookCover, BookInfo } from "../../../components/book"
import { BuyButton } from "../../../components/buttons"
import { numberFormat } from "../../../utils/utils"
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { SafeAreaView } from "react-native"

export default function BookDetailScreen({ navigation, route }) {
  const product = route.params.item
  const sharedKey = route.params.sharedKey
  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <SafeAreaView backgroundColor={'#f1f1f1'} />
      <PageHeaderBackLayout 
        butonColor={'#118ab2'} 
        butonPress={()=>navigation.goBack()}
        title={route.params.item.title}
        backgrounColor={'#f1f1f1'}
        />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.bookCoverArea}>
          <BookCover sharedKey={sharedKey} id={product.id} imageURI={product?.cover_image} />
        </View>
        <View style={styles.bookDetails}>
          <BookInfo
            sharedKey={sharedKey}
            id={product?.id}
            title={product?.title}
            author={product?.author}
            summary={product?.summary}
            totalPages={product?.page_count}
            releaseDate={product?.release_date}
            preview={product?.preview_pdf}
          />
        </View>
      </ScrollView>
      <View style={styles.readBuyButtonArea}>
        <BuyButton onPress={() => {Alert.alert("Kitap Satın Alınamadı", "Market hesabı ile bağlantı kurulamıyor." )}} text="Hemen satın al" price={numberFormat(product?.price) + " TL"} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#FFF",
  },
  bookCoverArea: {
    backgroundColor: "#F3F4F6",
  },
  bookDetails: {
    backgroundColor: "#FFF",
    paddingBottom: 72,
    flex: 1,
    minHeight: Dimensions.get("window").height / 1.5,
  },
  readBuyButtonArea: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
})
