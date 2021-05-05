import React, { useCallback,useEffect, useState, useMemo } from "react"
import { TouchableOpacity, FlatList, View,Text,StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
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
import PleaseWait from "../../components/pleaseWait";
import RNSecureStorage from "rn-secure-storage";
import Activator from '../../components/Indicator/Activator'
import getStyles from './styles'

const categoriesIcon = {
  0:'earth-outline',
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
  const styles=getStyles();
  const [categories, setCategories] = useState([])
  const [fetching, setFetching] = useState(false)
  const [token, setToken] = useState(" ")
  
  const hideSplashScreen = useCallback(() => {
    setTimeout(() => {
      SplashScreen.hide()   
    }, 3000);
  },[])

  const Token = async() =>{
    try {
      await RNSecureStorage.get("access_token").then((value) => {
        if(value!=null)
          setToken(value);
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  useFocusEffect(hideSplashScreen)
  const insets = useSafeAreaInsets()
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
    Token()
    setFetching(true)
    getCategories
      .then(res => {
        setCategories(res)
        setTimeout(() => {setFetching(false)}, 1000)
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
      <><SafeAreaView/>
        <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content" />
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingTop:0}} >
            <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 12 }} onPress={null}>
              <Icon name="menu-outline" size={32} color="#333" />
            </TouchableOpacity>
            <Logom/>
            {token==' '
            ?
            <TouchableOpacity activeOpacity={0.9}  style={{ paddingHorizontal: 12 }} onPress={() => navigation.push("LogIn")}>
              <Icon name="person-circle-outline" size={36} color="#555" />
            </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={0.9}  style={{ paddingHorizontal: 12 }} onPress={() => navigation.push("UserInfo")}>
              <Icon name="person-circle-outline" size={36} color="#555" />
            </TouchableOpacity>
            }
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
          <View style={{flexDirection:'row', marginLeft:5}}>
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
                      <TouchableOpacity 
                        onPress={() => navigation.push("BookCategories", { sharedKey: item.slug, item: item })}               
                        style={styles.categoriesView} >
                      <Icon name={categoriesIcon[index]} size={25} color="#333" />
                        <Text style={{textAlign:'center', fontSize:12, fontFamily:'GoogleSans-Regular', color:'#333', padding:5}} >{item.title}</Text>
                      </TouchableOpacity>
                    )
                }}
            />
          </View>
          <BooksList
            categoryID={'1'}
            sharedKey={'Öne Çıkanlar'}
            title={'Öne Çıkanlar'}
            onPress={() => navigation.push("BookCategories",{sharedKey: 'Öne Çıkanlar',item:categories[1], pageName:'Anasayfa'})}               
            request={{
              method: endpoints.products.method,
              url: endpoints.productsByCategory.path + "/" + 2,
              auth: endpoints.products.auth,
              params: {
                limit: 5,
              },
              headers: {
                Accept: "application/json",
              },
            }}
          />
          <BooksList
            categoryID={'4'}
            sharedKey={'edebiyat'}
            title={'Edebiyat'}
            onPress={() => navigation.push("BookCategories",{sharedKey:'Edebiyat',item:categories[2], pageName:'Anasayfa'})}               
            request={{
              method: endpoints.products.method,
              url: endpoints.productsByCategory.path + "/" + 4,
              auth: endpoints.products.auth,
              params: {
                limit: 5,
              },
              headers: {
                Accept: "application/json",
              },
            }}
          />

          { /*<FlatList
            keyboardDismissMode="on-drag"
            keyExtractor={(item, index) => "search-result-item-" + index}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent()}
            data={categories}
            renderItem={({ item }) => {
              if(item.id==2 || item.id==4 || item.id==6 || item.id==8 || item.id==10  ){
                return (
                  <BooksList
                    categoryID={item.id}
                    sharedKey={item.slug}
                    title={item.title}
                    onPress={() => navigation.push("BookCategories", { sharedKey: item.slug, item: item })}               
                    request={{
                      method: endpoints.products.method,
                      url: endpoints.productsByCategory.path + "/" + item.id,
                      auth: endpoints.products.auth,
                      params: {
                        limit: 5,
                      },
                      headers: {
                        Accept: "application/json",
                      },
                    }}
                  />)
              } 
            }}
          /> */}
          </ScrollView>
        </>
    ) 
  }
}
const styles = StyleSheet.create({
  categoriesView:{
    width:90, 
    height:90, 
    backgroundColor:'#fff', 
    margin:5,
    marginLeft:5, 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:8,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
})



