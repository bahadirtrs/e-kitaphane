import React from "react"
import { StatusBar, StyleSheet, View} from "react-native"
import { endpoints } from "../../../utils/constants";
import CategoryList from '../../../components/categoryList'
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { SafeAreaView } from "react-native";

export default function BookCategories({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Kategoriler',
      headerBackTitleVisible: false,
      headerShown: false,
      headerStyle: {
        backgroundColor: "#FFF",
      },
      headerTintColor: "#4B5563",
    })
  }, [navigation, route.params.item])

  const product = route.params.item
  const sharedKey = route.params.sharedKey
  return (
    <View style={{flex: 1, backgroundColor: "#F3F4F6" }}>
      <SafeAreaView backgroundColor={'#fff'} />
      <StatusBar backgroundColor={'#fff'}/>
      <PageHeaderBackLayout 
        butonColor={'#118ab2'} 
        butonPress={()=>navigation.goBack()}
        title={product?.title}
        backgrounColor={'#fff'}
        />
        <View style={styles.bookDetails}>
            <CategoryList
                columnType='categorys'
                sharedKey="featured"
                title={product?.title}
                //onPress={() => {}}
                request={{
                method: endpoints.products.method,
                url: endpoints.productsByCategory.path + "/" + product?.id,
                auth: endpoints.products.auth,
                params: {},
                headers: {
                    Accept: "application/json",
                },
                }}
            />
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
    paddingBottom: 10,
    flex: 1,
  },
  readBuyButtonArea: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
})
