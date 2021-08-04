import React, {useState} from 'react'
import { View, StyleSheet, Text,TouchableOpacity ,Dimensions,StatusBar,SafeAreaView,Alert } from 'react-native'
import TextButton from '../../components/Button/TextButton'
import AccountLayout from '../../components/Layout/AccountLayout'
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'
import WelcomeLogoLayout from '../../components/Layout/WelcomeLogoLayout'
import HelpModal from '../../components/HelpModal'
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage"
import axios from "axios"
import RequestManager from "../../utils/requestManager"
import { storeTokens } from "../../utils/utils";
import Icon  from "react-native-vector-icons/Ionicons"
import BeingIndicator from '../../components/Indicator/BeingIndicator'
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL,endpoints, CLIENT_ID, CLIENT_SECRET} from "../../utils/constants"
import { COLORS } from '../../constants/theme'
import { useTheme } from "@react-navigation/native"

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
        Alert.alert("Merhaba!","Giriş başarıyla yapılacak")
       }else{
        Alert.alert("Uyarı!","Lütfen sözleşmeleri okuyun ve kabul edin.")
       }
      };

      const UserInfoState =async(userInfo)=>{
        await RNSecureStorage.set("photo", userInfo.user.photo, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        await GoogleSignin.revokeAccess();
        CreateAccount(userInfo)
      }

      const CreateAccount = async(userInfo)=>{
      //  setActivity(true) 
      //Hepböylekal
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
            //setWarning('Kaydınız Başarıyla oluşturuldu.')
            //setTimeout(() => {
             // isLoginAccount()
           // }, 400);
        } catch (error) {
           // setActivity(false),
            if(error.message==='Request failed with status code 422'){
              setTimeout(() => {
                  isLoginAccount(userInfo)
              }, 500);
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
          setWarning('Başarıyla oturum açıldı...')
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
            }, 500);
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
                        {"Uygulamada oturum açarak "}
                        <Text onPress={()=>navigation.push("UyelikSozlesmesi")} style={{fontFamily:'GoogleSans-Medium'}}>Kullanıcı Sözleşmesini </Text>
                        ve 
                        <Text onPress={()=>navigation.push("GizlilikSozlesmesi")} style={{fontFamily:'GoogleSans-Medium'}} > Kişisel Verilerin Korunumu Kurallarını </Text>
                         kabul etmiş sayılırsınız.
                      </Text>
                  </View>

             
                <TouchableOpacity onPress={()=>signInGoogle()} style={{ 
                    marginVertical:5,
                    backgroundColor:'#1B9DEF',
                    borderRadius:7,
                    borderColor:'#ccc',
                    width:Dimensions.get('screen').width*0.75,
                    flexDirection:'row', justifyContent:'space-between', alignItems:'center' }} >
                        
                    <View style={{width:Dimensions.get('screen').width*0.13,height:44, backgroundColor:'#1B9DEF',  justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#1B9DEF',  borderTopLeftRadius:7, borderBottomLeftRadius:7 }} >
                    <Icon name="logo-apple-appstore" size={30} color={"#fff"}/> 
                    </View>
                    <View style={{ width: Dimensions.get('screen').width*0.62, height:44,flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#1B9DEF', borderTopRightRadius:7,borderBottomRightRadius:7, borderLeftWidth:0,   }} >
                    <Text style={{fontFamily:'GoogleSans-Medium', color:'#fff'}}>Apple ID ile oturum aç</Text>
                    </View>
                </TouchableOpacity>
                <TextButton
                questions={'Yardıma ihtiyacınız mı var?'}
                redirectText={'Nasıl kullanacağınızı öğrenin'}
                buttonPress={null}
                />
                </View>
            </View>
            <SafeAreaView backgroundColor={'red'} />
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
        alignItems:'center'
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

