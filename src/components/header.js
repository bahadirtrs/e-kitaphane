import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../constants/theme";

function Header({ leftButtonOnPress, title }) {
  const { push } = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <Pressable onPress={() => push("Search")}>
          <Icon name="search-circle-outline" size={36} color={COLORS.textColor} />
        </Pressable>
        <Pressable onPress={() => push("Account")}>
          <Icon name="person-circle-outline" size={36} color={COLORS.textColor} />
        </Pressable>
      </View>
      {title ? (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : undefined}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    flexDirection: "column",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 38,
    paddingVertical: 12,
  },
})
export default Header
