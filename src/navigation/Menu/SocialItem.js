import React, {useCallback} from "react";
import {StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SocialItem(props) {
  const OpenURL= ({url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
        await Linking.openURL(url);
    }, [url]);
    return  (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8} >
        <Icon style={{padding:10,}} name={props.icon} size={25} color="#1d3557" />
      </TouchableOpacity>);
  };
  return (
    <OpenURL url={props.url}></OpenURL>
  );
}
   