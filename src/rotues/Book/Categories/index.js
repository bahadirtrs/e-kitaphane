import React from "react"
import { StatusBar, StyleSheet, View} from "react-native"
import { endpoints } from "../../../utils/constants";
import CategoryList from '../../../components/categoryList'
import PageHeaderBackLayout from '../../../components/Layout/PageHeaderBackLayout'
import { SafeAreaView } from "react-native";
import { COLORS } from "../../../constants/theme";
import { useTheme } from "@react-navigation/native"

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

  const {colors}=useTheme()
  const product = route.params.item
  const title = route.params.title
  return (
    <View style={{flex: 1, backgroundColor:colors.backgroundColor}}>
      <SafeAreaView backgroundColor={COLORS.primary} />
      <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
      <PageHeaderBackLayout 
        butonColor={COLORS.textColorLight} 
        butonPress={()=>navigation.goBack()}
        butonPressRight={null}
        title={route.params?.title}
        backgrounColor={COLORS.primary}
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
  scrollView: {
    backgroundColor:COLORS.backgroundColor,
  },
  bookCoverArea: {
    backgroundColor:COLORS.backgroundColor,
  },
  bookDetails: {
    paddingBottom: 0,
    flex: 1,
  },
  readBuyButtonArea: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
  },
})
