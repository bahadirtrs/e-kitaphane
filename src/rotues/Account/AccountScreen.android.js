import React, {useState} from 'react'
import { View, StyleSheet, Text,TouchableOpacity ,Dimensions,StatusBar,SafeAreaView,Alert} from 'react-native'
import TextButton from '../../components/Button/TextButton'
import AccountLayout from '../../components/Layout/AccountLayout'
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'
import WelcomeLogoLayout from '../../components/Layout/WelcomeLogoLayout'
import HelpModal from '../../components/HelpModal'
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage"
import axios from "axios"
import RequestManager from "../../utils/requestManager"
import {storeTokens } from "../../utils/utils";
import Icon  from "react-native-vector-icons/Ionicons"
import BeingIndicator from '../../components/Indicator/BeingIndicator'
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL,endpoints, CLIENT_ID, CLIENT_SECRET} from "../../utils/constants"
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {COLORS} from '../../constants/theme'
import { useTheme } from "@react-navigation/native"

GoogleSignin.configure({
  webClientId: '327239986721-1cmas50va13i5oj031jpfcvcne5fi50i.apps.googleusercontent.com',
  androidClientId:'327239986721-s0fqjpua0hdv1m8kik5qschq29ies5fp.apps.googleusercontent.com',
  offlineAccess: true, 
});

export default function AccountScreen({navigation}) {
    const {colors}=useTheme()
    const [token, setToken] = useState(" ")
    const [helpVisible, setHelpVisible] = useState(false)
    const [googleUserInfo, setGoogleUserInfo] = useState([])
    const [warning, setWarning] = useState("")
    const [infoColor, setInfoColor] = useState('#43aa8b')
    const [click, setclick] = useState(false)

    React.useLayoutEffect(() => {
        Token()
        navigation.setOptions({
          headerShown: false,
        })
    }, [navigation])

    const signInGoogle = async () => {
      if(true){

        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setGoogleUserInfo(userInfo)
          console.log(JSON.stringify(userInfo))
          UserInfoState(userInfo)
          CreateAccount(userInfo)
        } catch (error) {
            
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            // console.log(error)
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            // console.log(error)
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            // console.log(error)
          } else {
            //console.log(error)
          }
         Alert.alert("Uyar??!","Giri?? yap??l??rken bir hata olu??tu. L??ften tekrar deneyin.")
        }
      } 
      };

      const UserInfoState =async(userInfo)=>{
        await RNSecureStorage.set("photo", userInfo.user.photo, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await GoogleSignin.revokeAccess();
        CreateAccount(userInfo)
      }

      const CreateAccount = async(userInfo)=>{
      //  setActivity(true) 
        try {
          let data = { 
            first_name:userInfo.user.givenName,
            last_name:userInfo.user.familyName,
            email:userInfo.user.email,
            password:userInfo.user.id,
            password_confirmation:userInfo.user.id,
          };
          await axios.post(`${BASE_URL+endpoints.register.path}`, data)
            .then(response => console.log(response.data.message));
            setInfoColor('#43aa8b')
        } catch (error) {
            if(error.message==='Request failed with status code 422'){
              setTimeout(() => {
                isLoginAccount(userInfo)
              }, 10);
            }else{
                setInfoColor('#43aa8b')
                setWarning(error.message)
            }  
        }
      }

      const isLoginAccount = async(userInfo)=>{
        try {
          let data = { 
            grant_type: "password",
            username:userInfo.user.email,
            password:userInfo.user.id,
            client_id:CLIENT_ID,
            client_secret:CLIENT_SECRET,
            scope: "*",
          };
          await axios.post(`${BASE_URL+endpoints.login.path}`, data)
            .then(response => {
              setWarning('Oturum a????l??yor...')
              //alert("oturum a????ld??")
              setTimeout(() => {
                //setActivity(false)
                saveToken(response.data);
              }, 10); 
            });
        } catch (error) {
          if(error){
         // setActivity(false)
         setWarning("Giri?? yap??lamad??. L??tfen bilgilerinizi kontrol ediniz.")
        }
        }
      }
      
      const saveToken = async(data) => {
        const { access_token, refresh_token } = data
        await storeTokens(access_token, refresh_token);
        await AsyncStorage.getItem('token').then(token =>{
          if(token!==null){
            AsyncStorage.removeItem("token");
          }
            AsyncStorage.setItem('token', access_token);
            //alert("Token kaydedildi")
        });
          setWarning('Bilgiler kaydediliyor...')
          getUserInfo()
          setTimeout(() => {
           // storeUserInfo()
            setInfoColor('#43aa8b')
          },10);
      }

      const getUserInfo = async () =>{
        const user=RequestManager({
          method: endpoints.user.method,
          url: endpoints.user.path,
          auth: false,
          headers: {
            Accept: "application/jsonsss",
            Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
          },
        })
        setWarning('Kullan??c?? Bilgileri getiriliyor')
        setTimeout(() => {
        userListNow(user);
        }, 10);
      }

      const userListNow = (user)=>{
        //setFetching(true)
        user
          .then(res => {
            setTimeout(() => {  
              storeUserInfo(res.id,res.first_name,res.last_name,res.email)
            }, 500);
          })
          .catch(err => {
            console.log(err)
           // setUserInfo(false)
          })
      }


      const storeUserInfo = async (id, name,lastname, mail, photo) => {
        try {
          await RNSecureStorage.set("user_id", JSON.stringify(id), { accessible: ACCESSIBLE.WHEN_UNLOCKED })
          await RNSecureStorage.set("user_name", name, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
          await RNSecureStorage.set("user_lastname", lastname, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
          await RNSecureStorage.set("user_mail", mail, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
            setWarning('Bilgiler sisteme kaydedildi')
            setTimeout(() => {
              navigation.navigate('Anasayfa')
            }, 10);
        } catch (e) {
          throw new Error(e)
        }
      }

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
        <View style={styles.activatorContainer} >
            <Text style={styles.activatorText}>Profil bilgileri getiriliyor.</Text>
        </View>
      )
    }
    return (
        <View style={styles.container} >
           {warning
            ? <View style={styles.activityContainer} >
                <BeingIndicator title={warning} />
              </View>
            : undefined} 
            <SafeAreaView  backgroundColor={COLORS.primary} />
            <StatusBar barStyle={'light-content'}   backgroundColor={COLORS.primary} />
            <AccountLayout/>
            <HeaderBackLayout 
                butonColor={COLORS.textColorLight} 
                bgColor={COLORS.primary}
                butonPress={()=>navigation.goBack()}
                butonPressRight={()=>setHelpVisible(true)}
                pageName={''}
                />
            <View style={styles.containerExp} > 
                <View style={styles.welcomeContainer} >
                  <WelcomeLogoLayout/>               
                </View>
                <View style={styles.buttonContainer} >
                <View style={{width:Dimensions.get('screen').width*0.9, paddingVertical:20, flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                 
                 <Text numberOfLines={3} style={{fontSize:12, color:colors.text, fontFamily:'GoogleSans-Regular', paddingLeft:1, width:(Dimensions.get('screen').width*0.8), textAlign:'center' }}>
                   {"Uygulamada oturum a??arak "}
                   <Text onPress={()=>navigation.push("UyelikSozlesmesi")} style={{fontFamily:'GoogleSans-Medium'}}>Kullan??c?? S??zle??mesini </Text>
                   ve 
                   <Text onPress={()=>navigation.push("GizlilikSozlesmesi")} style={{fontFamily:'GoogleSans-Medium'}} > Ki??isel Verilerin Korunumu Kurallar??n?? </Text>
                    kabul etmi?? olursunuz.
                 </Text>
             </View>

             
                <TouchableOpacity onPress={()=>signInGoogle()} style={{ 
                    marginVertical:5,
                    backgroundColor:'#D64836',
                    borderRadius:7,
                    borderColor:'#ccc',
                    width:Dimensions.get('screen').width*0.75,
                    flexDirection:'row', justifyContent:'space-between', alignItems:'center' }} >  
                    <View style={{width:Dimensions.get('screen').width*0.13,height:44, backgroundColor:'#D64836',  justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#D64836',  borderTopLeftRadius:7, borderBottomLeftRadius:7 }} >
                       <Icon name="logo-google" size={30} color={"#fff"}/> 
                    </View>
                    <View style={{ width: Dimensions.get('screen').width*0.62, height:44,flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#D64836', borderTopRightRadius:7,borderBottomRightRadius:7, borderLeftWidth:0,   }} >
                    <Text style={{fontFamily:'GoogleSans-Medium', color:'#fff'}}>Google ile oturum a??</Text>
                    </View>
                </TouchableOpacity>
                <TextButton
                questions={'Yard??ma ihtiyac??n??z m?? var?'}
                redirectText={'Nas??l kullanaca????n??z?? ????renin'}
                buttonPress={null}
                />
                </View>
            </View>
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
        marginBottom:50,
    },

    activatorContainer:{ 
        backgroundColor:COLORS.primary, 
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1
    },
    activatorText:{
        fontFamily:'GoogleSans-Regular', 
        color:COLORS.textColorLight, 
        fontSize:16
    },
    containerExp:{
        justifyContent:'center', 
        alignItems:'center'
    },
    welcomeContainer:{
        flex:2, 
        justifyContent:'center', 
        alignItems:'center'
    },
    buttonContainer:{
        flex:2, 
        marginBottom:50, 
        justifyContent:'center', 
        alignItems:'center',
    },
    activityContainer:{
      zIndex:1, 
      width:Dimensions.get('screen').width, 
      height:Dimensions.get('screen').height, 
      position:'absolute', 
      justifyContent:'center',
     alignContent:'center'
   },
})

