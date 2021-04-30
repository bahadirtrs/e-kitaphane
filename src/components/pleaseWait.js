import React from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

function PleaseWait({ title, showIndicator = true }) {
  return (
    <View style={styles.container}>
      {showIndicator ? <ActivityIndicator size="large" /> : undefined}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff01',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily:'GoogleSans-Regular',
    paddingBottom: 14,
    fontSize:14,
    paddingTop:20
  },
})
export default PleaseWait
