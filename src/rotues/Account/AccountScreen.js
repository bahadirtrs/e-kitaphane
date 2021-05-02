import React, {useState} from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { View, StyleSheet } from 'react-native'
import TextButton from '../../components/Button/TextButton'
import AccountLayout from '../../components/Layout/AccountLayout'
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'
import WelcomeLogoLayout from '../../components/Layout/WelcomeLogoLayout'
import SubmitButton from '../../components/Button/SubmitButton'
import HelpModal from '../../components/HelpModal'

export default function AccountScreen({navigation}) {
    const [helpVisible, setHelpVisible] = useState(false)
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        })
    }, [navigation])
    return (
        <View style={styles.container} >
            <SafeAreaView/>
            <StatusBar backgroundColor={'#1d3557'} />
            <AccountLayout/>
            <View style={{justifyContent:'space-between', alignItems:'center'}} > 
            <HeaderBackLayout 
                butonColor={'#fff'} 
                butonPress={()=>navigation.goBack()}
                butonPressRight={()=>setHelpVisible(true)}
                pageName={''}
            />
                <WelcomeLogoLayout/>               
                <View style={{flex:2,paddingBottom:20, justifyContent:'center', alignItems:'center'}} >
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
