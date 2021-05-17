import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { BookCover, BookInfo } from "../../../components/book"
import { BuyButton } from "../../../components/buttons"
import { numberFormat } from "../../../utils/utils"
import { SafeAreaView } from "react-native-safe-area-context"

export default function BookDetailScreen({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const product = route.params.item
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.bookCoverArea}>
        <Text>Selam</Text>       
    </View>
        <View style={styles.bookDetails}>
          <BookInfo
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
        <BuyButton onPress={() => {}} text="Hemen satın al" price={numberFormat(product?.price) + " TL"} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    position: "relative",
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#FFF",
  },
  bookCoverArea: {
    backgroundColor: "#F3F4F6",
  },
  bookDetails: {
    backgroundColor: "#FFF",
    paddingBottom: 72,
  },
  readBuyButtonArea: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
})
