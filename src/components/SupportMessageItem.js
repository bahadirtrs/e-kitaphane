import React from 'react'
import { Dimensions } from 'react-native'
import { View, Text,StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/tr'
moment.locale('tr')
export default function SupportMessageItem({item,name}) {
  return (
    <View style={styles.container} >
      {item.sender=='CUSTOMER'
        ? <View style={styles.customerContainerExp} >
            <View style={styles.customerContainerInner} >
              <Text style={styles.customerMessageUserInfo}>
                {name} {'  '}
                <Text style={{fontSize:10, padding:0}} >
                  {moment(item.created_at).startOf('hour'-1).fromNow()}
                </Text>
              </Text>
              <Text style={styles.customerMessageText} >{item.message} </Text>
            </View>
          </View>
        : <View style={styles.systemMessageContainer} >
            <View style={styles.systemMessageContainerExp} >
              <Text style={styles.systemMessageDate}>
                {"Müşteri Temsilcisi"} {'  '}
                <Text style={{fontSize:10}} >
                  {moment(item.created_at).startOf('hour'-1).fromNow()}
                </Text>
              </Text>
              <Text style={styles.systemMessageText} >{item.message} </Text>
            </View>
          </View>
      }
    </View>
    )
}
const styles = StyleSheet.create({
  continer:{
    width:Dimensions.get('screen').width, 
    justifyContent:'center', 
    alignItems:'center', 
    marginBottom:15
  },

  customerContainerExp:{
    width:Dimensions.get('screen').width-20, 
    justifyContent:'center', 
    alignItems:'flex-end', 
    marginVertical:5
  },
  customerContainerInner:{ 
    backgroundColor:'#40916c', 
    borderRadius:13, 
    maxWidth:'80%',
    paddingHorizontal:10,
    justifyContent:'center'
  },
  customerMessageUserInfo:{ 
    fontFamily:'GoogleSans-Medium', 
    paddingTop:10, 
    fontSize:16, 
    color:'#fff', 
    textAlign:'left'
  },
  customerMessageText:{ 
    fontFamily:'GoogleSans-Regular', 
    paddingBottom:10, 
    paddingTop:5, 
    color:'#fff'
  },

  systemMessageContainer:{
    width:Dimensions.get('screen').width-20, 
    justifyContent:'center', 
    alignItems:'flex-start', 
    marginVertical:5
  },
  systemMessageContainerExp:{ 
    backgroundColor:'#919191', 
    borderRadius:13, 
    maxWidth:'80%',
    paddingHorizontal:10
  },
  systemMessageDate:{
    fontFamily:'GoogleSans-Medium', 
    paddingTop:10,  
    fontSize:16, 
    color:'#fff', 
    textAlign:'left'
  },
  systemMessageText:{
    fontFamily:'GoogleSans-Regular', 
    paddingBottom:10, 
    paddingTop:5, 
    color:'#fff'
  },

})
