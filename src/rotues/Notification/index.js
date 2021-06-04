import React from 'react'
import { SafeAreaView } from 'react-native';
import { View, Text , StyleSheet} from 'react-native';
import LastAddedBooks from '../../components/lastAddedBooks'
import { useTheme } from "@react-navigation/native"

export default function HelpScreen() {
  const {colors}=useTheme()
  return (
    <>
      <SafeAreaView backgroundColor={colors.primary}/>
      <View style={styles.container}>
        <LastAddedBooks/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:0,
    padding:0
  },
})
