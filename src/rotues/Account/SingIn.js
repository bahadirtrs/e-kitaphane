import React,{useState,useMemo, useEffect} from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { BASE_URL,endpoints, CLIENT_ID, CLIENT_SECRET} from "../../utils/constants"
import { storeTokens } from "../../utils/utils";
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from "react-native"
import { TouchableOpacity } from "react-native"
import { Text, View,StyleSheet,StatusBar,Dimensions,ScrollView  } from "react-native"
import axios from "axios"
import TermOfUse from '../../components/TermOfUse'
import PrivacyPolicy from '../../components/PrivacyPolicy'
import TextButton from '../../components/Button/TextButton'
import BeingIndicator from '../../components/Indicator/BeingIndicator'
import HeaderBackLayout from '../../components/Layout/HeaderBackLayout'
import UsersWelcome from '../../components/UsersWelcome'
import ActiveButton from '../../components/Button/ActiveButton'
import TextInputCom from '../../components/textInputCom'
import TwoInputText from '../../components/TwoInputText'
import HelpModal from '../../components/HelpModal'



export default function SingIn({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])
  const [name, setName] = useState("Test")
  const [lastName, setLastName] = useState("Test")
  const [email, setemail] = useState("sbt0013w@gmail.com")
  const [password, setpassword] = useState("12345678")
  const [passwordRepeat, setpasswordRepeat] = useState("12345678")
  const [checkbox, setCheckbox] = useState(true)
  const [buttonClick, setButtonClick] = useState(false)
  const [warning, setWarning] = useState("null")
  const [infoColor, setInfoColor] = useState('#e63946')
  const [termsOfUseVisible, setTermsOfUseVisible] = useState(false)
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false)
  const [passwordHide, setPasswordHide] = useState(true)
  const [activity, setActivity] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)

useEffect(() => {
  setWarning('null')
  if(email.length>3 && name.length>2 && lastName.length>2 && passwordRepeat==password && password.length>5 && checkbox){
    setButtonClick(true)
    
  }else{
    setButtonClick(false)
  }
}, [email,name,lastName,password,passwordRepeat,checkbox])
  const WarningStatus= ()=>{
    setInfoColor('#e63946')
    setWarning('Lütfen gerekli tüm alanları doldurunuz.')
    setTimeout(() => {
      //setWarning('null')
    }, 6000);
  }
  const EmailControl = ()=>{
    var n = email?.indexOf("@");
    var m = email?.indexOf(".");
    if(n>0 && m>0 && email?.length>3 )
      return true;
    else
      return false
  }
  const CreateAccountControl = ()=>{
    if(name?.length>2 && lastName?.length>2){
      if(EmailControl()){
        if(password==passwordRepeat && passwordRepeat.length>5){
          if(checkbox){
            CreateAccount()
          }else{setWarning('Lütfen sözleşmeleri kabul edin')}
        }else{setWarning('Şifre alanını kontrol ediniz.')}
      }else{setWarning('Lüften geçerli bir email adresi giriniz')}
    }else{setWarning('Adı Soyad alanlarını kontrol ediniz.')}
  }
  
  const CreateAccount = async()=>{
    setActivity(true)
    try {
      let data = { 
        first_name:name,
        last_name:lastName,
        email:email,
        password:password,
        password_confirmation:passwordRepeat
      };
      await axios.post(`${BASE_URL+endpoints.register.path}`, data)
        .then(response => console.log(response.data.message));
        setActivity(false),setInfoColor('#43aa8b')
        setWarning('Kaydınız Başarıyla oluşturuldu. Oturum açılıyor')
        setTimeout(() => {
          isLoginAccount()
        }, 3000);
    } catch (error) {
        setActivity(false),setInfoColor('#e63946')
        setWarning(error.message )
    }
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
  
  return (
    <View>
    {activity?<BeingIndicator/>:null}
    <View style={{position:'absolute'}} >
    <SafeAreaView/>
    <StatusBar backgroundColor={'#f1f1f1'}/>
      <HeaderBackLayout 
          butonColor={'#1d3557'} 
          butonPress={()=>navigation.goBack()}
          butonPressRight={()=>setHelpVisible(true)}
          pageName={''}
      />
      <ScrollView>
        <View style={styles.container} >
          <UsersWelcome warning={warning} 
            infoColor={infoColor} setWarning={()=>setWarning('null')}/>
         <TwoInputText
            type={'name'} 
            placeholder={"İsim"} value={name} onChangeText={(text)=>setName(text)}
            placeholderTwo={"Soyisim"} valueTwo={lastName} onChangeTextTwo={(text)=>setLastName(text)}
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
        <TextInputCom
            type={'password'} placeholder={"Parola Tekrarı"} 
            value={passwordRepeat} onChangeText={(text)=>setpasswordRepeat(text)}
            passwordHide={passwordHide} setPasswordHide={()=>setPasswordHide(!passwordHide)}
        />
        <View style={{width:'82%',justifyContent:'flex-start', alignItems:'flex-start', paddingTop:10}} >
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', paddingTop:5}} >
              { checkbox 
              ?<TouchableOpacity activeOpacity={0.9} onPress={()=>setCheckbox(!checkbox)} >
                <Icon name="checkmark-circle-outline" size={30} color="#1d3557" />
              </TouchableOpacity>
              :
              <TouchableOpacity activeOpacity={0.9} onPress={()=>setCheckbox(!checkbox)} >
                <Icon name="ellipse-outline" size={30} color="#333" />
              </TouchableOpacity>

              }
              <View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                  <TouchableOpacity activeOpacity={0.9} onPress={()=>setTermsOfUseVisible(true)}>
                    <Text  style={{fontFamily:'GoogleSans-Medium', color:'#333'}}> Kullanıcı Sözleşmesi  <Text style={{fontFamily:'GoogleSans-Regular'}} >ve</Text> </Text>  
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9} onPress={()=>setPrivacyPolicyVisible(true)}>
                    <Text style={{fontFamily:'GoogleSans-Medium', color:'#333'}}>Gizlilik Politikasını </Text>  
                  </TouchableOpacity>
                </View>
                  <Text style={{fontFamily:'GoogleSans-Regular', color:'#333'}}> okudum ve kabul ediyorum</Text>
              </View>
               
            </View>
        </View>
        <ActiveButton
          isLogInFormControl={()=>CreateAccountControl()}
          buttonClick={buttonClick}
        />
        <TextButton
          questions={'Zaten bir hesabınız mı var?'}
          redirectText={'Oturum Açın'}
          buttonPress={()=> navigation.replace('LogIn')}
       />
       </View>
    </ScrollView> 
    <TermOfUse 
      visible={termsOfUseVisible}  
      setVisible={()=>setTermsOfUseVisible(false)}/>
    <PrivacyPolicy 
      visible={privacyPolicyVisible}  
      setVisible={()=>setPrivacyPolicyVisible(false)}/>
    <HelpModal 
      visible={helpVisible}  
      setVisible={()=>setHelpVisible(false)}
    />
  </View>
  </View>  
  )
}

const styles = StyleSheet.create({

  container:{
    height:Dimensions.get('screen').height-50,
    width:Dimensions.get('screen').width, 
    justifyContent:'center',
    alignItems:'center'
  },
   submitButton:{
    width:'85%',
    marginVertical:20,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'#acb9c9',
    borderRadius:10
   },

   submitButtonEnable:{
    width:'85%',
    marginVertical:20,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'#1d3557',
    borderRadius:10
   },

   activityStyle:{ 
    backgroundColor:'#00000090', 
    justifyContent:'center',
    alignItems:'center', 
    width:100, 
    height:80,
    borderRadius:8,
    shadowColor: "#000",
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 0,

  },

   buttonText:{
     fontSize:16,
      color:'#fff',
      fontFamily:'GoogleSans-Medium',
      textAlign:'center'
   },
    textInput:{
        margin:2,
        paddingHorizontal:15, 
        backgroundColor:'#fff',
        fontSize:16,
        color:'#000',
        marginRight:2,
        fontFamily:'GoogleSans-Regular',
        borderColor:'#ddd',
        borderWidth:1,
        height:40,
        borderRadius:8
    },
    textInputIcon:{
      height:40, 
      width:35, 
      justifyContent:'center', 
      alignItems:'center',
      borderTopStartRadius:5,
      borderBottomStartRadius:5,
      borderWidth:1,
      borderRightWidth:0,
      borderColor:'#ddd',
    },
    welcomeText:{
      fontSize:30,
      fontFamily:'GoogleSans-Medium',
      color:'#333',
      paddingTop:15,
    },

    welcomeTextDescription:{
      fontSize:20,
      fontFamily:'GoogleSans-Bold',
      color:'#555',
      textAlign:'center',
      paddingTop:10
    },
    storeLoginLogo:{
      paddingVertical:0,
      paddingHorizontal:10
    }
})

