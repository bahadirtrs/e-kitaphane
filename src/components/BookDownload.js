import React from 'react'
import { View, Text,StatusBar,TouchableOpacity, Dimensions,StyleSheet } from 'react-native'
import { useTheme } from "@react-navigation/native";
import { BookCoverLoading } from "../components/book"
import {useNavigation} from '@react-navigation/native'

export default function BookDownload(props) {
    const {colors}=useTheme()
    const navigation= useNavigation();
    return (
        <View style={styles.container} >
        <View style={[styles.header, {backgroundColor:colors.primary}]} >
        <StatusBar barStyle={'light-content'} backgroundColor={colors.primary}/>
            <Text style={styles.headerText}>
                {props.type==='full'? 'Kitap cihazınıza indiriliyor': 'Kitap önizlemesi yükleniyor'} 
            </Text>
            <BookCoverLoading 
              sharedKey={props.sharedKey} 
              id={props.id} 
              imageURI={props.imageURI} 
              yukleme={props.yukleme}
            />
            <Text style={styles.bookTitle}> {props.title} </Text>
            <Text style={styles.bookAuthor}> {props.author} </Text>
        </View>
          <View style={{flex:6, paddingTop:20}} >
            <View style={styles.downloadContainer} >
                {props.type==='full'
                ?<>
                    <Text style={[styles.sizeStyle, {color:colors.text}]}>
                        {((props.size*props.yukleme)/1024).toFixed(2)} MB 
                        / 
                        {(props.size/1024).toFixed(2)} MB 
                    </Text>
                    <Text style={[styles.infoStyle, {color:colors.text}]}>{props.info}</Text>
                 </>
                : <Text style={[styles.infoStyle, {color:colors.text}]}>
                    {'Kitap önizlemesi yükleniyor. Lütfen birkaç saniye bekleyiniz.'}
                  </Text>
                }
                <TouchableOpacity style={[styles.cancelButton,{backgroundColor:colors.primary}]} onPress={()=>navigation.goBack()} >
                    <Text style={styles.cancelButtonText}>
                      {'İndirmeyi İptal Et'}
                    </Text>
              </TouchableOpacity>
            </View>
          </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        zIndex:1, 
        position:'absolute', 
        height:Dimensions.get('screen').height, 
        width:Dimensions.get('screen').width, 
        justifyContent:'center',
        alignItems:'center', 
    },
    header:{
        flex:8, 
        width:Dimensions.get('screen').width, 
        justifyContent:'center',
        alignItems:'center', 
        paddingVertical:20
    },
    headerText:{
        fontFamily:'GoogleSans-Medium', 
        fontSize:16,
        color:'#fff', 
        textAlign:'center',
        width:Dimensions.get('screen').width*0.6,
    },
    bookTitle:{
        fontFamily:'GoogleSans-Medium', 
        fontSize:19,
        color:'#fff'
    },
    bookAuthor:{
        fontFamily:'GoogleSans-Regular', 
        fontSize:16,
        color:'#fff'
    },
    downloadContainer:{
        paddingTop:10, 
        justifyContent:'center', 
        alignItems:'center', 
        height:150
    },
    sizeStyle:{
        fontFamily:'GoogleSans-Medium', 
        fontSize:16, 
        paddingBottom:10,
        textAlign:'center', 
    },
    infoStyle:{
        fontFamily:'GoogleSans-Regular', 
        fontSize:14, 
        textAlign:'center',
        width:Dimensions.get('screen').width*0.65
    },
    cancelButton:{ 
      
        width:Dimensions.get('screen').width*0.6, 
        justifyContent:'center',
        alignItems:'center', 
        marginTop:30, 
        padding:5, 
        borderRadius:5
    },
    cancelButtonText:{
        fontFamily:'GoogleSans-Regular', 
        fontSize:16, 
        lineHeight:24, 
        color:'#fff'
    }
})
