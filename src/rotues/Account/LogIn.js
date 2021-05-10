import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import React,{useState,useMemo, useEffect} from "react"
import { BASE_URL,endpoints, CLIENT_ID, CLIENT_SECRET} from "../../utils/constants"
import { SafeAreaView } from "react-native"
import { storeTokens } from "../../utils/utils";
import AsyncStorage from '@react-native-community/async-storage';
import TextButton from '../../components/Button/TextButton'
import BeingIndicator from '../../components/Indicator/BeingIndicator'
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'
import UsersWelcome from '../../components/UsersWelcome'
import TextInputCom from '../../components/textInputCom'
import ActiveButton from '../../components/Button/ActiveButton'
import HelpModal from '../../components/HelpModal'
import axios from "axios"
import RequestManager from "../../utils/requestManager"
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

export default function LogIn({navigation}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [buttonClick, setButtonClick] = useState(false)
  const [warning, setWarning] = useState("")
  const [infoColor, setInfoColor] = useState('#e63946')
  const [passwordHide, setPasswordHide] = useState(true)
  const [activity, setActivity] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [userInfo, setUserInfo] = useState([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setWarning('null')
    if(email.length>3 && password.length>5 ){
      setButtonClick(true)
    }else{
      setButtonClick(false)
    }
  }, [email,password])
 
  const isLoginAccount = async()=>{
    setActivity(true)
    try {
      let data = { 
        grant_type: "password",
        username:email,
        password:password,
        client_id:CLIENT_ID,
        client_secret:CLIENT_SECRET,
        scope: "*",
      };
      await axios.post(`${BASE_URL+endpoints.login.path}`, data)
        .then(response => {
          setActivity(false)
          setInfoColor('#43aa8b')
          setWarning('Başarıyla oturum açıldı. Ayarlanıyor')
          setTimeout(() => {
            saveToken(response.data);
          }, 1000);
        });
    } catch (error) {
      if(error){
      setActivity(false)
      setWarning("Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.")}
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
        console.log("token:",access_token)
    });
       
        setInfoColor('#43aa8b')
        setWarning('Giriş bilgileri alınıyor...')
        setTimeout(() => {
          getUserInfo()
          //navigation.replace('Anasayfa');
        }, 500);
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
      console.log("user:",JSON.stringify(user))
      userListNow(user);
    }
    
    const userListNow = (user)=>{
      setFetching(true)
      user
        .then(res => {
          setUserInfo(res)
          setWarning('Giriş bilgileri sisteme kaydediliyor...')
          setTimeout(() => {
            storeUserInfo(res.id,res.first_name,res.last_name,res.email)
            setFetching(false)
            //navigation.replace('Anasayfa');
        }, 500);

        })
        .catch(err => {
          console.log(err)
          setUserInfo(false)
        })
    }
     
      const storeUserInfo = async (id, name,lastname, mail) => {
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

  const isEmailControl = ()=>{
    var n = email?.indexOf("@");
    var m = email?.indexOf(".");
    if(n>0 && m>0 && email?.length>3 )
      return true;
    else
      return false
  }
  const isLogInFormControl = ()=>{
    if(isEmailControl()){
      if(password.length>2){
        isLoginAccount()
      }else{setWarning('Şifreniz en az 6 karakterli olmalıdır.')}
    }else{setWarning('Lüften geçerli yapıda bir email adresi giriniz') }
  }

  return (
    <>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
     <SafeAreaView backgroundColor={'#f1f1f1'} />
      <StatusBar barStyle={'dark-content'}  backgroundColor={'#f1f1f1'} />
      <HeaderBackLayout 
        butonColor={'#1d3557'} 
        butonPress={()=>navigation.goBack()}
        butonPressRight={()=>setHelpVisible(true)}
        pageName={''}
        />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={{justifyContent:'center', alignItems:'center'}} >
          <UsersWelcome warning={warning} 
            infoColor={infoColor} setWarning={()=>setWarning('null')}
            text={'Birbirinden eşsiz kitapları okumak için oturum açın'}
            />
          <TextInputCom
            placeholder={"Mail Adresi"} value={email}
            onChangeText={(text)=>setemail(text)} type={'email'}
          />
          <TextInputCom
            type={'password'} placeholder={"Parola"} 
            value={password} onChangeText={(text)=>setpassword(text)}
            passwordHide={passwordHide} setPasswordHide={()=>setPasswordHide(!passwordHide)}
          />
          <TouchableOpacity style={{justifyContent:'flex-end'}} >
            <View style={{justifyContent:'flex-end', alignItems:'flex-end',  width:Dimensions.get('screen').width*0.85, padding:10}} >
              <Text style={{fontFamily:'GoogleSans-Medium', color:'#555'}} >Şifremi unuttum</Text>
            </View>
          </TouchableOpacity>

          <ActiveButton
          text={'Oturum Aç      '}
            isLogInFormControl={()=>isLogInFormControl()}
            buttonClick={buttonClick}
          />
           <TextButton
            questions={'Henüz hesap oluşturmadınız mı?'}
            redirectText={'Hesap Oluşturun'} buttonPress={()=> navigation.replace('SingIn')}
          />
          <HelpModal visible={helpVisible} setVisible={()=>setHelpVisible(false)}/>
           </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 4,
    flex: 1,
    justifyContent: "space-around"
  },
  

});
