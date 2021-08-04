import React, {useEffect} from 'react'
import { TouchableOpacity,Image} from 'react-native'
import RNSecureStorage from "rn-secure-storage"
import { useTheme } from "@react-navigation/native"
import {useNavigation} from '@react-navigation/native'
import Icon from "react-native-vector-icons/Ionicons"

let user_image=null;

export default function ProfilePhotoButton() {
    const {colors}=useTheme()
    const navigation=useNavigation();

    useEffect(() => {
        getImage()
    }, [])

    const getImage =async () =>{
        user_image = await RNSecureStorage.get("photo")
    }
    
    return (
        <TouchableOpacity activeOpacity={0.9}  style={{ paddingHorizontal: 12 }} onPress={() => navigation.push("Account")}>
            {user_image
            ? <Image source={{uri: user_image}} style={{width:28, height:28, borderRadius:50}}  />
            : <Icon name={'person-circle-outline'} size={30} color={'#fff'}/>
            }
        </TouchableOpacity>
    )
}
