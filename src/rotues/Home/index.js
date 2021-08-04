import React, {useEffect, useState, useMemo } from "react"
import { TouchableOpacity, FlatList, View,Text,StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { StatusBar } from "react-native"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native"
import { endpoints } from "../../utils/constants"
import BooksList from "../../components/booksList"
import HomeSlider from "../../components/homeSlider"
import SplashScreen from "react-native-splash-screen"
import Icon from "react-native-vector-icons/Ionicons"
import Logom from '../../components/logo'
import RequestManager from "../../utils/requestManager"
import NetworkError from '../../components/NetworkError'
import Activator from '../../components/Indicator/Activator'
import { useTheme } from "@react-navigation/native"
import MenuModal from '../../navigation/Menu/MenuModal'
import RNSecureStorage from "rn-secure-storage"
import ProfilePhotoButton from '../../components/Button/ProfilePhotoButton'
let user_image=null;
// appcenter codepush release-react -a bhdrtrs/ebooks -d Production
const categoriesIcon = {
  0:'home-outline',
  1:'bookmark-outline',
  2:'book-outline',
  3:'fitness-outline',
  4:'calendar-outline',
  5:'body-outline',
  6:'rocket-outline',
  7:'film-outline',
  8:'infinite-outline',
  9:'business-outline',
}
export default function HomeScreen({ navigation }){
  const {colors}=useTheme()
  const [categories, setCategories] = useState([])
  const [fetching, setFetching] = useState(true)
  const [categoryWidth, setCategoryWidth] = useState(90)
  
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        SplashScreen.hide()   
      }, 2800);
      getImage()
    }, [])
  );
  
  const getImage =async () =>{
    user_image = await RNSecureStorage.get("photo")
  }
  
  const getCategories = useMemo(() =>
      RequestManager({
        method: endpoints.categories.method,
        url: endpoints.categories.path,
        auth: endpoints.categories.auth,
        headers: {
          Accept: "application/json",
        },
      }),
    [],
  )

  useEffect(() => {
    setFetching(true)
    getCategories
      .then(res => {
        setCategories(res)
        setFetching(false)
      })
      .catch(err => {
        console.log(err)
        setFetching(false)
      })
  }, [getCategories])


  if (fetching) {
    return <Activator title={'Uygulama başlatılıyor...'} />
  }else{
    return (
      <>
      <SafeAreaView backgroundColor={colors.primary} />
        <StatusBar backgroundColor={colors.primary}  barStyle="light-content" />
          <View style={[styles.headerConatiner,{backgroundColor:colors.primary}]} >
            <MenuModal/>
            <Logom/>
            <ProfilePhotoButton/>
          </View>
        <ScrollView>
        <HomeSlider
            request={{
              method: endpoints.sliders.method,
              url: endpoints.sliders.path,
              auth: endpoints.sliders.auth,
              params: {limit:5},
              headers: {
                Accept: "application/json",
              },
            }}
          />
          <View style={[styles.categories,{backgroundColor:colors.background}]}>
            <FlatList
              keyboardDismissMode="on-drag"
              keyExtractor={(item, index) => "search-result-item-" + index}
              scrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={categories}
              renderItem={({ item,index }) => {
                return (
                  <>
                    {index===0?
                    <View style={{width:8}}/>:null}
                    <TouchableOpacity  
                      onPress={() => navigation.push("BookCategories", { title:item.title, item: item })}               
                      style={[styles.categoriesView,{backgroundColor:colors.card, width:categoryWidth}]} >
                        <Icon name={categoriesIcon[index]} size={25} color={colors.text}/>
                        <Text style={[styles.categoriesText,{color:colors.text}]}>{item.title}</Text>
                    </TouchableOpacity>
                  </>
                )
                }}
            />
          </View>
          
         <BooksList
            categoryID={'2'}
            sharedKey={'one-cikanlar'}
            title={'Öne Çıkanlar'}
            onPress={() => {
              navigation.push("BookCategories",{
                sharedKey: 'Öne Çıkanlar',
                item:categories[1], 
                title:categories[1].title}
              )}}               
            request={{
              method: endpoints.products.method,
              url: endpoints.productsByCategory.path + "/" + 2,
              auth: endpoints.products.auth,
              params: {
                limit: 20,
                order: "id:asc",
              },
              headers: {
                Accept: "application/json",
              },
            }}
          />
          <BooksList
            categoryID={'1'}
            sharedKey={'tum-kitaplar'}
            title={'Tüm Kitaplar'}
            onPress={() => {
              navigation.push("BookCategories",{
                sharedKey: 'Öne Çıkanlar',
                item:categories[0], 
                title:categories[0].title}
              )}}               
            request={{
              method: endpoints.products.method,
              url: endpoints.productsByCategory.path + "/" + 1,
              auth: endpoints.products.auth,
              params: {
                limit: 20,
                order: "id:desc",
              },
              headers: {
                Accept: "application/json",
              },
            }}
          />
          </ScrollView>
          <NetworkError/>
      </>
    ) 
  }
}
const styles = StyleSheet.create({
  headerConatiner:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center', 
    paddingVertical:5, 
    marginBottom:0,
  },
  categories:{
    flexDirection:'row', 
    marginLeft:0, 
  },
  categoriesText:{
    textAlign:'center', 
    fontSize:12, 
    fontFamily:'GoogleSans-Regular', 
    padding:5,
  },
  categoriesView:{
    height:90, 
    margin:5,
    marginLeft:5, 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
})

