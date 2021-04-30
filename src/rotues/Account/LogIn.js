import React,{useState,useMemo, useEffect} from "react"
import { BASE_URL,endpoints, CLIENT_ID, CLIENT_SECRET} from "../../utils/constants"
import { SafeAreaView } from "react-native"
import { StyleSheet,StatusBar } from "react-native"
import { View, Dimensions,ScrollView } from "react-native";
import { storeTokens } from "../../utils/utils";
import AsyncStorage from '@react-native-community/async-storage';
import TextButton from '../../components/Button/TextButton'
import BeingIndicator from '../../components/Indicator/BeingIndicator'
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'
import UsersWelcome from '../../components/UsersWelcome'
import TextInputCom from '../../components/textInputCom'
import ActiveButton from '../../components/Button/ActiveButton'
import axios from "axios"

export default function LogIn({navigation}) {
  const [email, setemail] = useState("talut@tasgiran.com")
  const [password, setpassword] = useState("123")
  const [buttonClick, setButtonClick] = useState(false)
  const [warning, setWarning] = useState("null")
  const [infoColor, setInfoColor] = useState('#e63946')
  const [passwordHide, setPasswordHide] = useState(true)
  const [activity, setActivity] = useState(false)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  useEffect(() => {
    setWarning('null')
    if(email.length>3 && password.length>5 ){
      setButtonClick(true)
    }else{
      setButtonClick(false)
    }
  }, [email,password])
 
  const saveToken = async(data) => {
    const { access_token, refresh_token } = data
    await storeTokens(access_token, refresh_token);
    await AsyncStorage.getItem('token').then(token =>{
      if(token!==null){
        AsyncStorage.removeItem("token");
      }
        AsyncStorage.setItem('token', access_token);
    });
        setInfoColor('#43aa8b')
        setWarning('Başarıyla oturum açıldı. Yönlendiriliyorsunuz.')
        setTimeout(() => {
          navigation.replace('Anasayfa');
        }, 4000);
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
          saveToken(response.data);
        });
    } catch (error) {
      if(error){
      setActivity(false)
      setWarning("Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.")}
    }
  }
return (
  <View>
    {activity?<BeingIndicator/>:null}
    <View style={{position:'absolute'}} >
    <StatusBar backgroundColor={'#f1f1f1'}/>
    <SafeAreaView/>
      <HeaderBackLayout 
        butonColor={'#118ab2'} 
        butonPress={()=>navigation.goBack()}
        pageName={''}
        />
        
      <ScrollView>
        <View style={styles.container} >
          <UsersWelcome warning={warning} 
            infoColor={infoColor} setWarning={()=>setWarning('null')}/>
          <TextInputCom
            placeholder={"Mail Adresi"} value={email}
            onChangeText={(text)=>setemail(text)} type={'email'}
          />
          <TextInputCom
            type={'password'} placeholder={"Parola"} 
            value={password} onChangeText={(text)=>setpassword(text)}
            passwordHide={passwordHide} setPasswordHide={()=>setPasswordHide(!passwordHide)}
          />
          <ActiveButton
            isLogInFormControl={()=>isLogInFormControl()}
            buttonClick={buttonClick}
          />
          <TextButton
            questions={'Henüz hesap oluşturmadınız mı?'}
            redirectText={'Hesap Oluşturun'} buttonPress={()=> navigation.replace('SingIn')}
          />
        </View> 
      </ScrollView> 
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container:{
    height:Dimensions.get('screen').height-130,
    width:Dimensions.get('screen').width, 
    justifyContent:'center',
    alignItems:'center'
  },

})
