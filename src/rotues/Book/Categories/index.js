import React from "react"
import { StatusBar, StyleSheet, View} from "react-native"
import { endpoints } from "../../../utils/constants";
import CategoryList from '../../../components/categoryList'
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native"

export default function BookCategories({ navigation, route }) {
  const {colors}=useTheme()
  const product = route.params.item

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

  return (
    <View style={{flex: 1, backgroundColor:colors.backgroundColor}}>
      <SafeAreaView backgroundColor={colors.primary} />
      <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
      <PageHeaderBackLayout 
        butonColor={colors.textColorLight} 
        butonPress={()=>navigation.goBack()}
        butonPressRight={null}
        title={route.params?.title}
        backgrounColor={colors.primary}
        />
        <View style={[styles.bookDetails,{backgroundColor:colors.background}]}>
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
  bookDetails: {
    flex: 1,
    paddingBottom:0,
  },
})
