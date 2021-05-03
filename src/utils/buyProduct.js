import axios from "axios"
import RNSecureStorage from "rn-secure-storage"
import { BASE_URL} from "../utils/constants"

  const BuyProduct = async(user_id,product_id,status,payment_type)=>{
    let deneme=''
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
        reading_started_at:'2021-05-02 23:31:16.000000',
        status:status,//'PURCHASED'
        payment_type:payment_type,//'GOOGLE_PAY',
      };
      await axios.post(`${BASE_URL+'api/private/order-create'}`, data, config)
        
    } catch (error) {
    }
    return deneme;
  }

  export default BuyProduct