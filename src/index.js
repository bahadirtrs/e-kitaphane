import React, {useState, useEffect} from "react"
import "intl"
import "intl/locale-data/jsonp/tr"
import { NavigationContainer, DarkTheme, DefaultTheme, useTheme } from "@react-navigation/native"
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Provider from "./utils/store"
import {LogIn,SingIn,AccountScreen,UserInfo} from './rotues/Account'

import {MembershipAgreement,ConfidentialityAgreement, AppAbout, Contact} from './rotues/Contracts'

import MyLibrary from './rotues/Library/MyLibrary'
import BookDetailScreen from "./rotues/Book/Detail"
import BookCategories from "./rotues/Book/Categories"
import ReaderScreen from "./rotues/Book/Reader"
import Support from "./rotues/Support"
import SupportMessageDetail from './rotues/Support/SupportMessageDetail'
import Splashscreen from './rotues/Splashscreen'
import Notification from './rotues/Notification'
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import SearchScreen from "./rotues/Search"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext"
import Tab from './navigation/tabs'
import { StatusBar, View, Text } from "react-native"
import codePush from "react-native-code-push";
import AsyncStorage from '@react-native-community/async-storage';
import {COLORSLIGHT, COLORSDARK} from './constants/theme'
import { EventRegister } from 'react-native-event-listeners'
import { ActivityIndicator } from "react-native"
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL};
//appcenter codepush release-react -a bhdrtrs/ebooks -d Production
export const iosTransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
}
const MainStack = createSharedElementStackNavigator()
const RootStack = createStackNavigator()

function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Anasayfa"
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f1f1f1",
        },
        useNativeDriver: true,
        gestureEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}>
      <MainStack.Screen name="Anasayfa" component={Tab} options={{headerShown: false}}/>
      <MainStack.Screen name="Splashscreen" component={Splashscreen} options={{headerShown: false}}/>
      <MainStack.Screen name="Account" component={AccountScreen} options={{headerShown: false}} />
      <MainStack.Screen name="LogIn" component={LogIn} />
      <MainStack.Screen name="UserInfo" component={UserInfo} options={{headerShown: false}} />
      <MainStack.Screen name="SingIn" component={SingIn} />
      <MainStack.Screen name="MyLibrary" component={MyLibrary} /> 
      <MainStack.Screen name="BookDetail" options={{headerShown: false}} component={BookDetailScreen}/>
      <MainStack.Screen name="BookCategories" options={{headerShown: false}} component={BookCategories}/>
      <MainStack.Screen name="Reader" component={ReaderScreen} />
      <MainStack.Screen name="Search" component={SearchScreen} />
      <MainStack.Screen name="DestekDetay" options={{headerShown: false}}  component={SupportMessageDetail} />
      <MainStack.Screen name="Notification" options={{headerShown: false}}  component={Notification} />
      <MainStack.Screen name="Destek" options={{headerShown: false}} component={Support} />
      <MainStack.Screen name="UyelikSozlesmesi" options={{headerShown: false}} component={MembershipAgreement} />
      <MainStack.Screen name="GizlilikSozlesmesi" options={{headerShown: false}} component={ConfidentialityAgreement} />
      <MainStack.Screen name="UygulamaHakkında" options={{headerShown: false}} component={AppAbout} />
      <MainStack.Screen name="İletisim" options={{headerShown: false}} component={Contact} />
    </MainStack.Navigator>
  )
}
const App = () => {
  const scheme= useColorScheme();
  const [darkApp, setDarkApp] = useState(false)
  const appTheme = darkApp ?  COLORSDARK: COLORSLIGHT;
  const darkStyle = COLORSDARK;
  const lightStyle=COLORSLIGHT;
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    codePush.checkForUpdate()
    .then((update) => {
        if (update) {
          setTimeout(() => {
            setLoading(true)
          }, 1000);
          onButtonPress()
        } 
      });
  },[])

  const onButtonPress =() =>{
    codePush.sync({
        updateDialog: false,
        installMode: codePush.InstallMode.IMMEDIATE
    });
    setTimeout(() => { setLoading(false)}, 1000);
    
}


  useEffect(() => {
    letlistener = EventRegister.addEventListener('useThemeDeg', (data) => {
      if(data===true){
        setDarkApp(true)
      }else{
        setDarkApp(false)
      }
  })
    return () => {
      true
    }
  }, [])

  useEffect(() => {
    AsyncStorage.getItem("useTheme").then(item =>{
      if(item==="true"){
        setDarkApp(true)
      }else{
        setDarkApp(false)
      }
    })
    return () => {true}
  }, [])

  if(loading){
    return(
      <View style={{flex:1,backgroundColor:'#1d3557', justifyContent:'center',alignItems:'center'}}>
        <StatusBar backgroundColor={'#1d3557'} />
        <ActivityIndicator size={'large'} />
        <Text style={{fontFamily:'GoogleSans-Bold', color:'#fff', fontSize:13, padding:10}} >Lütfen birkaç saniye bekleyin.</Text>
        <Text style={{fontFamily:'GoogleSans-Regular', color:'#fff', fontSize:12}} >Uygulama güncelleniyor</Text>
      </View>
    )
  }
 
  return (
    <AppearanceProvider>
    <Provider>
      <SafeAreaProvider>
        <NavigationContainer theme={scheme ==="dark"? darkStyle : appTheme} >
          <RootStack.Navigator initialRouteName="Main">
            <RootStack.Screen name="Main" options={{ headerShown: false }} component={MainStackScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
    </AppearanceProvider>
  )
}
export default codePush(codePushOptions)(App);