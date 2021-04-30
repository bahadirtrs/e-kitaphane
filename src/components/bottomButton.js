import React from "react"
import { Pressable, Text, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const BottomButton = ({ onPress, title, containerStyle }) => {
  const insets = useSafeAreaInsets()
  return (
    <Pressable
      style={[styles.container, containerStyle, { paddingBottom: Math.max(insets.bottom, 18) }]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: "#1F2937",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily:'GoogleSans-Medium',
    color: "#F3F4F6",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
    fontSize: 18,
  },
})
export default BottomButton
