import React, {useState} from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { View, StyleSheet, Text } from 'react-native'
import TextButton from '../../components/Button/TextButton'
import AccountLayout from '../../components/Layout/AccountLayout'
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'
import WelcomeLogoLayout from '../../components/Layout/WelcomeLogoLayout'
import SubmitButton from '../../components/Button/SubmitButton'
import HelpModal from '../../components/HelpModal'
import RNSecureStorage from "rn-secure-storage";

export default function AccountScreen({navigation}) {
    const [token, setToken] = useState(" ")
    const [helpVisible, setHelpVisible] = useState(false)

    React.useLayoutEffect(() => {
        Token()
        navigation.setOptions({
          headerShown: false,
        })
    }, [navigation])


    const Token = async() =>{
        try {
          await RNSecureStorage.get("access_token").then((value) => {
            if(value!=null)
              setToken(value);
              navigation.replace("UserInfo")
          })
        } catch (error) {
            setToken(false)
          console.log(error)
        }
      }

    if(token){
        return(
            <View style={{ backgroundColor:'#1d3557', flex:1, justifyContent:'center',alignItems:'center'}} >
                <Text style={{fontFamily:'GoogleSans-Regular', color:'#fff', fontSize:16}} >Profil bilgileri getiriliyor.</Text>
            </View>
        )
    }
    return (
        <View style={styles.container} >
            <SafeAreaView backgroundColor={'#1d3557'} />
            <StatusBar barStyle={'light-content'}  backgroundColor={'#1d3557'} />
            <AccountLayout/>
            <HeaderBackLayout 
                butonColor={'#fff'} 
                bgColor={'#1d3557'}
                butonPress={()=>navigation.goBack()}
                butonPressRight={()=>setHelpVisible(true)}
                pageName={''}
                />
            <View style={{justifyContent:'center', alignItems:'center',}} > 
                <View style={{flex:2, justifyContent:'center', alignItems:'center'}} >
                  <WelcomeLogoLayout/>               
                </View>
                <View style={{flex:2, marginBottom:50, justifyContent:'center', alignItems:'center'}} >
                    <SubmitButton butonPress={()=>navigation.push('LogIn')} />
                    <TextButton
                        questions={'Henüz hesap oluşturmadınız mı?'}
                        redirectText={'Hesap Oluşturun'}
                        buttonPress={()=> navigation.push('SingIn')}
                    />
                </View>
            </View>
            <SafeAreaView/>
            <HelpModal 
      visible={helpVisible}  
      setVisible={()=>setHelpVisible(false)}
      />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:50
    },
})
