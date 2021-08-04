import React from 'react';
import { StyleSheet, Dimensions, View,SafeAreaView,StatusBar,Pressable,Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import ProfilePhotoButton from '../../components/Button/ProfilePhotoButton'

const LeftIcon = ({buttonClick})=>{
  return(
    <Pressable style={{ paddingHorizontal: 12 }} onPress={buttonClick}>
      <Icon name="chevron-back-outline" size={30} color={'#fff'}/> 
    </Pressable>
  )
}

export default function ConfidentialityAgreement({navigation}) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTitle: () => <Text style={styles.titleStyle}>Kişisel Verilerin Korunumu</Text>,
          headerStyle: {backgroundColor:colors.primary},
          headerTintColor: "#4B5563",
          headerLeft: () =>  <LeftIcon buttonClick={() => navigation.goBack()}/>,
          headerRight: () => <ProfilePhotoButton/>,
        })
      }, [navigation])

    const {colors, dark}=useTheme()
    const source = dark 
      ? require('../../../assets/doc/kisiselVeriler-dark.pdf')
      : require('../../../assets/doc/kisiselVeriler.pdf')

    return (
      <View style={styles.container}>
          <SafeAreaView backgroundColor={colors.primary} />
          <StatusBar backgroundColor={colors.primary}  barStyle= {dark?"light-content":'light-content'}/>
          <Pdf source={source} spacing ={0} style={[styles.pdf, {backgroundColor:colors.card}]}/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        shadowRadius: 0,
        shadowOffset: {height:0},
        elevation:0,
    },
    titleStyle:{
      color:'#fff', 
      fontFamily:'GoogleSans-Regular', 
      fontSize:16
    }
});