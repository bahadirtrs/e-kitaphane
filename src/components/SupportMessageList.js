import React from 'react'
import {View, Text,StyleSheet,Dimensions,TouchableOpacity  } from 'react-native'
import Icon  from "react-native-vector-icons/FontAwesome5"
import moment from 'moment'
import 'moment/locale/tr'
moment.locale('tr')

export default function SupportMessageList({item, onPress}) {
  return (
    <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} style={styles.containerHard} onPress={onPress} >
             <View style={styles.containerHardExp} >
                <View style={{ 
                         backgroundColor:
                         item.status==='ANSWERED'
                         ?'#40916c'
                         : item.status==='PENDING'
                             ?'#ffb703'
                             :'#e63946', borderTopLeftRadius:5, borderBottomLeftRadius:5}}>
                        {item.status==='ANSWERED'

                        ?<View style={styles.imageContainer}>
                            <Icon name="headset" size={40} color={"#fff"}/> 
                            <Text style={styles.statusTitle} numberOfLines={1}>
                                <Text style={styles.statusText}>{item.readable_status}</Text>
                            </Text>
                        </View>
                        : item.status==='PENDING'
                            ?<View style={styles.imageContainer}>
                                <Icon name="headset" size={35} color={"#fff"}/> 
                                <Text style={styles.statusTitle} numberOfLines={1}>
                                    <Text style={styles.statusText}>{item.readable_status}</Text> 
                                </Text>
                            </View>
                            :<View style={styles.imageContainer}>
                                <Icon name="headset" size={35} color={"#fff"}/> 
                                <Text style={styles.statusTitle} numberOfLines={1}>
                                    <Text style={styles.statusText}>{item.readable_status}</Text> 
                                </Text>
                            </View>
                        }
                    </View>
                    <View style={{maxWidth:'100%', paddingLeft:10}} >
                        <Text style={styles.title} numberOfLines={1}>{item.subject}</Text>
                            <Text style={styles.date}> 
                                {moment(item.created_at).format('LLL')},
                                {' '}
                                {moment(item.created_at).format('dddd')}
                            </Text>
                            <Text style={styles.date} numberOfLines={1}>
                                Kayıt Numarası:
                            <Text style={{fontFamily:'GoogleSans-Medium'}}>#{item.record_number}</Text> 
                        </Text>

                    </View>
                </View>
                <View style={{width:'20%',  marginRight:10,
                    borderColor:
                        item.status==='ANSWERED'
                        ?'#40916c'
                        : item.status==='PENDING'
                            ?'#ffb703'
                            :'#e63946', 
                    paddingVertical:10, borderRadius:5, paddingHorizontal:5 }} >
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('screen').width, 
        justifyContent:'center', 
        alignItems:'center',
        borderBottomColor:'#ccc',
        borderBottomWidth:0,
    },
    containerHard:{
        elevation:1,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:Dimensions.get('screen').width-20,
        borderRadius:5,
        marginVertical:5,
        paddingRight:10,
        paddingVertical:0,
        shadowColor: "#000",
            shadowOffset: {
            width: 2,
            height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 2,
     
    },

    containerHardExp:{flexDirection:'row', width:'80%', justifyContent:'flex-start', alignItems:'center'},
    imageContainer:{width:80, height:80, justifyContent:'center', alignItems:'center' },
    statusText:{fontFamily:'GoogleSans-Medium', color:'#fff', textAlign:'center'},


    title:{
        fontFamily:'GoogleSans-Medium',
        fontSize:15,
        color:'#333',
        paddingBottom:1
    },
    date:{
        fontFamily:'GoogleSans-Regular',
        fontSize:13,
        color:'#555',
        paddingBottom:1
    },
    statusTitle:{
        fontFamily:'GoogleSans-Regular',
        fontSize:10,
        paddingTop:3,
        color:'#555'
        
    },
    status:{
        fontFamily:'GoogleSans-Medium',
        textAlign:'center',
        fontSize:12,
        color:'#888',
       
    }
})
