import axios from "axios"
import RNSecureStorage from "rn-secure-storage"
import { BASE_URL} from "../utils/constants"
import { View, Text,StyleSheet,Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

  const BuyProduct = async(user_idx,product_id,status,payment_type)=>{
    const date=new Date().toJSON().slice(0, 19).replace('T', ' ')
    const user_id = await RNSecureStorage.get("user_id")
    const platform = Platform.OS=='ios' ? 'APPLE_PAY':'GOOGLE_PAY'
    var message="Sistemde bir hata oluştu"
    var statusMsg=false;
    try {
      let config = {
        headers: {
          Accept: "application/jsonsss",
          Authorization:'Bearer ' +  await RNSecureStorage.get("access_token"),
        }
      }
      let data = { 
        user_id:user_id,
        product_id:product_id,
        reading_started_at:date,
        status:status,//'PURCHASED' RETURNED
        payment_type:platform,//'GOOGLE_PAY' APPLE_PAY
      };
      await axios.post(`${BASE_URL+'api/private/order-create'}`, data, config)
      .then(response =>{
        AsyncStorage.removeItem(JSON.stringify(product_id));
        message=response.data.message,
        statusMsg=true
        }
      );
    } catch (error) {
      message=error.message,
      statusMsg=false
    }
    return {message,statusMsg};
  }

  export default BuyProduct

