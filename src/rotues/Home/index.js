import React, { useCallback,useEffect, useState, useMemo } from "react"
import { TouchableOpacity, FlatList, View,Text,StyleSheet } from "react-native"
import { COLORS } from "../../constants/theme";
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
import getStyles from './styles'
import { useTheme } from "@react-navigation/native"
import MenuModal from '../../navigation/Menu/MenuModal'
import { Dimensions } from "react-native";

// appcenter codepush release-react -a bhdrtrs/ebooks -d Production
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
  const {colors}=useTheme()
  const [categories, setCategories] = useState([])
  const [fetching, setFetching] = useState(true)
  const [menuModal, setMenuModal]=useState(false)
  const [categoryWidth, setCategoryWidth] = useState(90)
  
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        SplashScreen.hide()   
      }, 2800);
    }, [])
  );

{  
  /*
  useEffect(() => {
  //Kategori card boyutunu kategori item length ine göre boyutlama
    let width=90;
    switch (categories.length) {
      case 1:
        width=(Dimensions.get('screen').width-20)
        break;
      case 2:
        width=(Dimensions.get('screen').width-35)/2
        break
      case 3:
        width=(Dimensions.get('screen').width-45)/3
        break
      default:
        width=90
    }
    setCategoryWidth(width)
    return ()=>{true};
  }, [categories]) 
*/
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
      <SafeAreaView backgroundColor={COLORS.primary} />
        <StatusBar backgroundColor={COLORS.primary}  barStyle="light-content" />
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:5, marginBottom:0, backgroundColor:COLORS.primary}} >
            <TouchableOpacity activeOpacity={0.9} style={{ paddingHorizontal: 12 }} onPress={()=>setMenuModal(!menuModal)}>
              <Icon name="menu-outline" size={32} color={COLORS.white} />
            </TouchableOpacity>
            <MenuModal 
            menuModal={menuModal}  
            modalPress={() => {setMenuModal(!menuModal)}} 
            />
            <Logom/>
            <TouchableOpacity activeOpacity={0.9}  style={{ paddingHorizontal: 12 }} onPress={() => navigation.push("Account")}>
              <Icon name="person-circle-outline" size={32} color={COLORS.white} />
            </TouchableOpacity>
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
          <View style={{flexDirection:'row', marginLeft:0, backgroundColor:colors.background}}>
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
                      {index===0?<View style={{width:8}}/>:null}
                      <TouchableOpacity  
                        onPress={() => navigation.push("BookCategories", { title:item.title, item: item })}               
                        style={[styles.categoriesView,{backgroundColor:colors.card, width:categoryWidth}]} >
                      <Icon name={categoriesIcon[index]} size={25} color={colors.text}/>
                        <Text style={{textAlign:'center', fontSize:12, fontFamily:'GoogleSans-Regular', color:colors.text, padding:5}}>{item.title}</Text>
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
            onPress={() => navigation.push("BookCategories",{sharedKey: 'Öne Çıkanlar',item:categories[1], title:categories[1].title})}               
            request={{
              method: endpoints.products.method,
              url: endpoints.productsByCategory.path + "/" + 2,
              auth: endpoints.products.auth,
              params: {
                limit: 8,
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
            onPress={() => navigation.push("BookCategories",{sharedKey: 'Öne Çıkanlar',item:categories[1], title:categories[1].title})}               
            request={{
              method: endpoints.products.method,
              url: endpoints.productsByCategory.path + "/" + 1,
              auth: endpoints.products.auth,
              params: {
                limit: 8,
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
  categoriesView:{
    height:90, 
    backgroundColor:COLORS.white, 
    margin:5,
    marginLeft:5, 
    justifyContent:'center', 
    alignItems:'center', 
    borderRadius:8,
    shadowColor:COLORS.shadow,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
})

