import React from 'react';
import { StyleSheet, Dimensions, View,SafeAreaView,StatusBar,Pressable,Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import ProfilePhotoButton from '../../components/Button/ProfilePhotoButton'

export default function MembershipAgreement({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <Text style={{color:'#fff', fontFamily:'GoogleSans-Regular', fontSize:16}}>Kullanıcı Sözleşmesi</Text>,
      headerStyle: {
        backgroundColor:colors.primary,
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

    const {colors, dark}=useTheme()
    const source = dark ? require('../../../assets/doc/kullaniciSozlesmesi-dark.pdf')
                        : require('../../../assets/doc/kullaniciSozlesmesi.pdf')
    return (
        <View style={styles.container}>
            <SafeAreaView backgroundColor={colors.primary} />
            <StatusBar backgroundColor={colors.primary}  barStyle= {dark?"light-content":'light-content'}/>
            <Pdf source={source} spacing ={0}style={[styles.pdf, {backgroundColor:colors.card}]}/>
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
    }
});