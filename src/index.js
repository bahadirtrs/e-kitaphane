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

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MainStack = createSharedElementStackNavigator()
const RootStack = createStackNavigator()

function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFF",
        },
        useNativeDriver: true,
        gestureEnabled: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}>
      <MainStack.Screen name="Anasayfa" component={Tab} options={{headerShown: false}}/>
      <MainStack.Screen name="Account" component={AccountScreen} />
      <MainStack.Screen name="LogIn" component={LogIn} />
      <MainStack.Screen name="UserInfo" component={UserInfo} />
      <MainStack.Screen name="SingIn" component={SingIn} />

      <MainStack.Screen name="MyLibrary" component={MyLibrary} />
      
      <MainStack.Screen
        name="BookDetail"
        options={{headerShown: false}}
        component={BookDetailScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { item, sharedKey } = route.params
          if (route.name === "BookDetail" && showing) {
            return [
              {
                id: `${sharedKey}.${item.id}.image`,
              },
              {
                id: `${sharedKey}.${item.id}.title`,
                animation: "fade",
                resize: "none",
                align: "center-center",
              },
              {
                id: `${sharedKey}.${item.id}.author`,
                animation: "fade",
                resize: "none",
                align: "center-center",
              },
            ]
          } else if (otherRoute.name !== "Reader") {
            if (sharedKey !== "slider") {
              return [
                {
                  id: `${sharedKey}.${item.id}.image`,
                },
                {
                  id: `${sharedKey}.${item.id}.title`,
                  animation: "fade",
                  resize: "none",
                  align: "center-center",
                },
                {
                  id: `${sharedKey}.${item.id}.author`,
                  animation: "fade",
                  resize: "none",
                  align: "center-center",
                },
              ]
            }
          }
        }}
      />

<MainStack.Screen
        name="BookCategories"
        options={{headerShown: false}}
        component={BookCategories}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { item, sharedKey } = route.params
          if (route.name === "BookCategories" && showing) {
            // Open animation fades in image, title and description
            return [
              {
                id: `${sharedKey}.${item.id}.image`,
              },
              {
                id: `${sharedKey}.${item.id}.title`,
                animation: "fade",
                resize: "none",
                align: "center-center",
              },
              {
                id: `${sharedKey}.${item.id}.author`,
                animation: "fade",
                resize: "none",
                align: "center-center",
              },
            ]
          } else if (otherRoute.name !== "Reader") {
            if (sharedKey !== "slider") {
              // Close animation only fades out image
              return [
                {
                  id: `${sharedKey}.${item.id}.image`,
                },
                {
                  id: `${sharedKey}.${item.id}.title`,
                  animation: "fade",
                  resize: "none",
                  align: "center-center",
                },
                {
                  id: `${sharedKey}.${item.id}.author`,
                  animation: "fade",
                  resize: "none",
                  align: "center-center",
                },
              ]
            }
          }
        }}
      />
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
