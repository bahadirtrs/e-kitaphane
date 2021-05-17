import React from 'react'
import { View, Text , StyleSheet} from 'react-native'

export default function HelpScreen() {
  return (
    <View style={styles.container} >
      <Text style={styles.helpText}>Yardım sayfası</Text>
      <Text>Size yardım etmek için buradayız</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  helpText: {
    fontFamily:'GoogleSans-Bold',
    fontSize:32,
    color:'#555'

  }
})
