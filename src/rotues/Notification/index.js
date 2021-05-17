import React, {useState, useEffect} from 'react'
import { Button } from 'react-native';
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as RNIap from 'react-native-iap';
import { purchaseUpdatedListener } from 'react-native-iap';
let id= 'product_id2'
const itemSkus = Platform.select({
  ios: [
     
  ],
  android: [
    id,
  ]
});

export default function Notification() {
  const [products, setProducts] = useState([])
  const [user, setUser] = useState({
    name:'Osman',
    subscription:undefined,
  })
  const [showads, setShowads] = useState(true);

  useEffect(() => {
    initIAp()
  }, [])

  const initIAp = async () => {
    try {
        const products = await RNIap.getProducts(itemSkus);
        console.log(JSON.stringify(products))
        alert(JSON.stringify(products))
        setProducts(products)
        console.log(JSON.stringify(products))
    } catch (err) {
      alert(err)
        console.warn(err); // standardized err.code and err.message available
    }


const purcaseUpdateScription = RNIap.purchaseUpdatedListener((purchase)=>{
  const receipt= purchase.transactionReceipt;
  if(receipt){
    RNIap.finishTransaction(purchase);
    setUser((prev)=>({...prev,subscription:purchase.productId}));
  }
})



return() =>{
  purcaseUpdateScription.remove();
}
}

const deneme = async (res) =>{
try {
  const sonuc= await RNIap.requestSubscription(res)
  alert("sonuc: "+JSON.stringify(res))
  if(sonuc){
    alert('anasayfaya yönlendirildin')
  }else{
    alert("satın alma başarısız oldu dostum")
  }
} catch (error) {
  alert(error)
}
}

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >  
      <Text>12HG78</Text>    
      <TouchableOpacity style={{backgroundColor:'#118ab2', padding:15, borderRadius:10, margin:5}}  onPress={()=>deneme('product_id2')} >
        <Text style={{fontFamily:'GoogleSans-Medium', color:'#fff'}}>Tehlikeli Oyunlar Satın al</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#118ab2', padding:15, borderRadius:10,margin:5}}  onPress={()=>deneme('product_id3')} >
        <Text style={{fontFamily:'GoogleSans-Medium', color:'#fff'}}>Korkuyu Beklerken Satın al</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#118ab2', padding:15, borderRadius:10,margin:5}}  onPress={()=>deneme('product_id4')} >
        <Text style={{fontFamily:'GoogleSans-Medium', color:'#fff'}}>Tutunamayanlar Satın al</Text>
      </TouchableOpacity>
    </View>
  )
}

