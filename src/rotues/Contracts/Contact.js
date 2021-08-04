import React from 'react'
import { StyleSheet, Dimensions, View,SafeAreaView,StatusBar,Pressable,Text,Image } from 'react-native';
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { ScrollView } from 'react-native';
import ProfilePhotoButton from '../../components/Button/ProfilePhotoButton'

export default function Contact({navigation}) {
    const {colors, dark}=useTheme()
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTitle: () => <Text style={{color:'#fff', fontFamily:'GoogleSans-Regular', fontSize:16}} >Bize Ulaşın</Text>,
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
              source={require('../../../assets/maps.png')}
              style={{width:Dimensions.get('screen').width-20, height:(Dimensions.get('screen').width)/1.55, borderRadius:5, borderWidth:0.3}}
            />
          </View>
          <View style={styles.body}>
           <ScrollView>
              <Text style={[styles.bodyTitle, {color:colors.text, paddingTop:20}]}>Vakıf Adresi </Text>
              <Text style={[styles.description, {color:colors.text}]}>
                Küçük Ayasofya Mah. Akburçak Sok. No :11 34122 Sultanahmet, Fatih, İstanbul, Türkiye
              </Text>
              <Text style={[styles.bodyTitle,{color:colors.text}]}>Telefon Numaralarımız</Text>
              <Text style={[styles.description,{color:colors.text}]}>
                +90 (212) 259 27 85
              </Text>
              <Text style={[styles.description,{color:colors.text}]}>
                +90 (212) 458 80 26
              </Text>
              <Text style={[styles.description,{color:colors.text}]}>
                +90 (212) 259 31 01
              </Text>
              <Text style={[styles.bodyTitle, {color:colors.text}]}>Faks Numaramız</Text>
              <Text style={[styles.description,{color:colors.text}]}>
                +90 (212) 458 80 23
              </Text>
              <Text style={[styles.bodyTitle, {color:colors.text}]}>E-posta Adresimiz</Text>
              <Text style={[styles.description,{color:colors.text}]}>
                tkhv@tkhv.org.tr
              </Text>
              <Text style={[styles.bodyTitle, {color:colors.text}]}>Web Sitesi </Text>
              <Text style={[styles.description,{color:colors.text}]}>
                www.tkhv.org.tr
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
    flex:1.4,
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
     fontSize:18,
     fontFamily:'GoogleSans-Regular'
  },
  web:{
    color:'#fff',
    fontSize:14,
    fontFamily:'GoogleSans-Regular'
  },
  bodyTitle:{
    fontFamily:'GoogleSans-Medium',
    fontSize:20,
    paddingVertical:5
  },
  description:{
    width:Dimensions.get('screen').width*0.9,
    fontFamily:'GoogleSans-Regular',
    fontSize:14,
    paddingBottom:10,
    textAlign:'left'
  }
})
