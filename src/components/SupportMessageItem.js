import React from 'react'
import { Dimensions } from 'react-native'
import { View, Text } from 'react-native'
import moment from 'moment'
import 'moment/locale/tr'
moment.locale('tr')
export default function SupportMessageItem({item,name}) {
  return (
    <View style={{width:Dimensions.get('screen').width, justifyContent:'center', alignItems:'center', marginBottom:15}} >
      {item.sender=='CUSTOMER'
        ? <View style={{width:Dimensions.get('screen').width-20, justifyContent:'center', alignItems:'flex-end', marginVertical:0 }} >
            <View style={{ backgroundColor:'#40916c', borderRadius:13, maxWidth:'80%',paddingHorizontal:10,justifyContent:'center',  }} >
              <Text style={{ fontFamily:'GoogleSans-Medium', paddingTop:10, fontSize:16, color:'#fff', textAlign:'left'}}>
                {name} {'  '}
                <Text style={{fontSize:10, padding:0}} >
                  {moment(item.created_at).startOf('hour'-1).fromNow()}
                </Text>
              </Text>
              <Text style={{ fontFamily:'GoogleSans-Regular', paddingBottom:10, paddingTop:5, color:'#fff'}} >{item.message} </Text>
            </View>
          </View>
        : <View style={{width:Dimensions.get('screen').width-20, justifyContent:'center', alignItems:'flex-start', marginBottom:0 }} >
            <View style={{ backgroundColor:'#919191', borderRadius:13, maxWidth:'80%',paddingHorizontal:10 }} >
              <Text style={{ fontFamily:'GoogleSans-Medium', paddingTop:10,  fontSize:16, color:'#fff', textAlign:'left'}}>
                {"Müşteri Temsilcisi"} {'  '}
                <Text style={{fontSize:10}} >
                  {moment(item.created_at).startOf('hour'-1).fromNow()}
                </Text>
              </Text>
              <Text style={{ fontFamily:'GoogleSans-Regular', paddingBottom:10, paddingTop:5, color:'#fff'}} >{item.message} </Text>
            </View>
          </View>
      }
    </View>
    )
}
