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
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage"
import axios from "axios"
import RequestManager from "../../utils/requestManager"
import { storeTokens } from "../../utils/utils";
import UsersWelcome from '../../components/UsersWelcome'
import Icon  from "react-native-vector-icons/Ionicons"

import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL,endpoints, CLIENT_ID, CLIENT_SECRET} from "../../utils/constants"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'
GoogleSignin.configure({
    webClientId: '327239986721-1cmas50va13i5oj031jpfcvcne5fi50i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    androidClientId:'327239986721-s0fqjpua0hdv1m8kik5qschq29ies5fp.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
export default function AccountScreen({navigation}) {
    const [token, setToken] = useState(" ")
    const [helpVisible, setHelpVisible] = useState(false)
    const [googleUserInfo, setGoogleUserInfo] = useState([])
    const [warning, setWarning] = useState("null")
    const [infoColor, setInfoColor] = useState('#43aa8b')
    React.useLayoutEffect(() => {
        Token()
        navigation.setOptions({
          headerShown: false,
        })
    }, [navigation])

    const signInGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setGoogleUserInfo(userInfo)
          //alert(JSON.stringify(userInfo))
          console.log(userInfo)
          UserInfoState(userInfo)
          isLoginAccount(userInfo)
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
            // console.log(error)
          }
         alert(JSON.stringify(error))
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
            // setActivity(false),
            setInfoColor('#43aa8b')
            setWarning('Kaydınız Başarıyla oluşturuldu...')
            //setTimeout(() => {
             // isLoginAccount()
           // }, 400);
        } catch (error) {
           // setActivity(false),
         
        
            if(error.message==='Request failed with status code 422'){
            setTimeout(() => {
                isLoginAccount(userInfo)
            }, 400);
            }else{
                setInfoColor('#43aa8b')
                setWarning(error.message)
            }
            
        }
      }

      const isLoginAccount = async(userInfo)=>{
       // setActivity(true)
       //alert('selam')
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
              setWarning('Oturum açılıyor...')
              //alert("oturum açıldı")
              setTimeout(() => {
                //setActivity(false)
                saveToken(response.data);
              }, 500); 
            });
        } catch (error) {
          if(error){
              alert("message"+error)
         // setActivity(false)
         // setWarning("Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.")
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
            //alert("token kaydedildi")
        });
          setWarning('Başarıyla oturum açıldı.')
          getUserInfo()
          setTimeout(() => {
           // storeUserInfo()
            setInfoColor('#43aa8b')
          },500);
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
        setWarning('Kullanıcı Bilgileri getiriliyor')
        setTimeout(() => {
        userListNow(user);
        }, 500);
      }

      const userListNow = (user)=>{
        //setFetching(true)
        user
          .then(res => {
          //  setUserInfo(res)
          // setTimeout(() => {setFetching(false)}, 200)
           // setWarning('Bilgiler sisteme ekleniyor')
            setTimeout(() => {  
              storeUserInfo(res.id,res.first_name,res.last_name,res.email)
            }, 300);
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
            }, 400);
        } catch (e) {
          throw new Error(e)
        }
      }
    


      const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess()
            .then(() => GoogleSignin.signOut())
            .then(() => {
                setGoogleUserInfo(null)
            })
            .done()
          setGoogleUserInfo(null) // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };


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
            <View style={styles.containerExp} > 
                <View style={styles.welcomeContainer} >
                  <WelcomeLogoLayout/>               
                </View>
                <View style={styles.buttonContainer} >
                <UsersWelcome warning={warning} 
                    //text={'Birbirinden eşsiz kitapları okumak için kayıt olun!'}
                    infoColor={infoColor} setWarning={()=>setWarning('null')}/>

              
                <TouchableOpacity onPress={()=>signInGoogle()} style={{ 
                    marginVertical:5,
                    backgroundColor:'#f1f1f1',
                    borderRadius:7,
                    borderColor:'#ccc',
                    width:Dimensions.get('screen').width*0.75,
                    flexDirection:'row', justifyContent:'space-between', alignItems:'center' }} >
                        
                    <View style={{width:Dimensions.get('screen').width*0.13,height:50, backgroundColor:'#D64836',  justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#D64836',  borderTopLeftRadius:7, borderBottomLeftRadius:7 }} >
                        <Icon name="logo-google" size={30} color={"#fff"}/> 
                    </View>
                    <View style={{ width: Dimensions.get('screen').width*0.62, height:50,flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#ccc', borderTopRightRadius:7,borderBottomRightRadius:7, borderLeftWidth:0,   }} >
                      <Text style={{fontFamily:'GoogleSans-Regular'}} >Google ile oturum aç</Text>
                    </View>
                </TouchableOpacity>
             
                <TouchableOpacity onPress={()=>signInGoogle()} style={{ 
                    marginVertical:5,
                    backgroundColor:'#f1f1f1',
                    borderRadius:7,
                    borderColor:'#ccc',
                    width:Dimensions.get('screen').width*0.75,
                    flexDirection:'row', justifyContent:'space-between', alignItems:'center' }} >
                        
                    <View style={{width:Dimensions.get('screen').width*0.13,height:50, backgroundColor:'#1B9DEF',  justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#1B9DEF',  borderTopLeftRadius:7, borderBottomLeftRadius:7 }} >
                    <Icon name="logo-apple-appstore" size={30} color={"#fff"}/> 
                    </View>
                    <View style={{ width: Dimensions.get('screen').width*0.62, height:50,flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#ccc', borderTopRightRadius:7,borderBottomRightRadius:7, borderLeftWidth:0,   }} >
                    <Text style={{fontFamily:'GoogleSans-Regular'}}>Apple ID ile oturum aç</Text>
                    </View>
                </TouchableOpacity>


                <Text> 1155 </Text>
                <TextButton
                questions={'Yardıma ihtiyacınız mı var?'}
                redirectText={'Nasıl kullanacağınızı öğrenin'}
                buttonPress={null}
                />

                
                {  //  <SubmitButton butonPress={()=>navigation.navigate('LogIn')} />
                }
                {
                     /*
                <>
               
                <TextButton
                questions={'Henüz hesap oluşturmadınız mı?'}
                redirectText={'Hesap Oluşturun'}
                buttonPress={()=>signOut()}
                />
                <Text> xName:{googleUserInfo?.user?.name} </Text>
                <Text> xEmail:{googleUserInfo?.user?.email} </Text>
                <Text> xEmail:{googleUserInfo?.user?.id} </Text>
                <Text> xEmail:{googleUserInfo?.user?.photo} </Text>
                </>
                */
                }
                  
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

    activatorContainer:{ 
        backgroundColor:'#1d3557', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    activatorText:{
        fontFamily:'GoogleSans-Regular', 
        color:'#fff', 
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
        alignItems:'center'
    },
})

