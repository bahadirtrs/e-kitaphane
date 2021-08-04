import React from 'react'
import { StyleSheet, Dimensions, View,SafeAreaView,StatusBar,Pressable,Text,Image} from 'react-native';
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { ScrollView } from 'react-native';
import ProfilePhotoButton from '../../components/Button/ProfilePhotoButton'

export default function AppAboutAppAbout({navigation}) {
    const {colors, dark}=useTheme()

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTitle: () => <Text style={{color:'#fff', fontFamily:'GoogleSans-Regular', fontSize:16}} >Uygulama Hakkında</Text>,
        headerStyle: {
          backgroundColor:colors.primary,
          shadowRadius: 0,
          shadowOffset: {height:0},
          elevation:0,
        },
        headerTintColor: "#4B5563",
        headerLeft: () => (
          <Pressable style={{ paddingHorizontal: 12 }} onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" size={30} color={'#fff'}/> 
          </Pressable>
        ),
        headerRight: () => (
          <ProfilePhotoButton/>
        ),
      })
    }, [navigation])
      
    return (
        <View style={styles.container} >
            <SafeAreaView backgroundColor={colors.primary} />
            <StatusBar backgroundColor={colors.primary}  barStyle= {dark?"light-content":'light-content'}/>
          <View style={[styles.header, {backgroundColor:colors.primary}]} >
            <Image
              source={require('../../../assets/books-logo.png')}
              style={{width:75, height:75}}
            />
            <Text style={styles.title}>E-kitaphane</Text>
            <Text style={styles.info}>Sürüm v2.0 Beta</Text>
            <Text style={styles.web}>www.ekitaphane.com.tr</Text>
          </View>
          <View style={styles.body}>
           <ScrollView>
              <Text style={[styles.bodyTitle, {color:colors.text}]}>E-kitaphane nedir? </Text>
              <Text style={[styles.description, {color:colors.text}]}>
                E-Kitaphane Mobil uygulaması Türk Kültürüne Hizmet Vakfı tarafından basılı yayın olarak 
                üretilen kitapların akıllı cihazlarda okunmasına olanak sağlayan bir e-kitap uygulamasıdır.
              </Text>
              <Text style={[styles.description, {color:colors.text}]}>
                E-Kitaphane Mobil uygulaması içerisinde yalnızca Türk Kültürüne Hizmet Vakfı'na ait kitaplar bulunur ve kullanıcı 
                bu kitapları satın alarak kolayca okuyabilir.
              </Text>
              <Text style={[styles.description, {color:colors.text}]}>
              Kitaplar cihazın bağlı olduğu Store üzrerinden alındığı için kullanıcının satın aldığı 
              kitapların kaybedilme ihtimalı bulunmamaktadır. Kullanıcı istediği cihazdan mail adresini girerek
              satın aldığı kitaplara ulaşabilmektedir.
              </Text>
              <Text style={[styles.description, {color:colors.text}]}>
                Yayın Tarihi: 12 Ocak 2022
              </Text>
              <Text style={[styles.description, {color:colors.text}]}>
                Uygulama Boyutu: 13,7 MB
              </Text>
              <Text style={[styles.description, {color:colors.text}]}>
                Platform: React-Native, JavaScript
              </Text>
              </ScrollView>
          </View>       
        </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  header:{
    flex:1,
    width:Dimensions.get('screen').width,
    backgroundColor:'red',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  body:{
    flex:1.6,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:0,
  },
  title:{
    color:'#fff',
     fontSize:22,
     fontFamily:'GoogleSans-Medium',
     paddingTop:20
  },
  info:{
    color:'#fff',
     fontSize:14,
     fontFamily:'GoogleSans-Regular'
  },
  web:{
    color:'#fff',
    fontSize:14,
    fontFamily:'GoogleSans-Regular'
  },
  bodyTitle:{
    fontFamily:'GoogleSans-Medium',
    fontSize:22,
    paddingVertical:15
  },
  description:{
    width:Dimensions.get('screen').width*0.9,
    fontFamily:'GoogleSans-Regular',
    fontSize:14,
    paddingBottom:10,
    textAlign:'left'
  }
})
