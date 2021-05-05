import React from "react"
import "intl"
import "intl/locale-data/jsonp/tr"
import { NavigationContainer } from "@react-navigation/native"
import Provider from "./utils/store"
import {LogIn,SingIn,AccountScreen,UserInfo} from './rotues/Account'
import MyLibrary from './rotues/Library/MyLibrary'
import BookDetailScreen from "./rotues/Book/Detail"
import BookCategories from "./rotues/Book/Categories"
import ReaderScreen from "./rotues/Book/Reader"
import Splashscreen from './rotues/Splashscreen'
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import SearchScreen from "./rotues/Search"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext"
import Tab from './navigation/tabs'
import { StatusBar } from "react-native"

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
    </MainStack.Navigator>
  )
}
const App = () => {
  return (
    <Provider>
      <StatusBar backgroundColor="#FFF" />
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Main">
            <RootStack.Screen name="Main" options={{ headerShown: false }} component={MainStackScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
export default App
