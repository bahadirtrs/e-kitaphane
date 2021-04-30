import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

const BuyButton = ({ text, onPress, price }) => {
  return (
    <Pressable style={({ pressed }) => (pressed ? { opacity: 0.9 } : { opacity: 1 })} onPress={onPress}>
      <View style={[styles.buttonContainer, { backgroundColor: "#3B82F6" }]}>
        <View style={styles.buttonContent}>
          <View style={styles.buttonTextAndIcon}>
            <Icon name="basket" size={24} color="#FFF" />
            <Text style={styles.buyButtonText}>{text}</Text>
          </View>
          <Text style={styles.buyButtonPrice}>{price}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const ReadButton = ({ text, onPress, completePercent = 0 }) => {
  return (
    <Pressable style={({ pressed }) => (pressed ? { opacity: 0.9 } : { opacity: 1 })} onPress={onPress}>
      <View style={[styles.buttonContainer, { backgroundColor: "#10B981" }]}>
        <View style={styles.buttonContent}>
          <View style={styles.buttonTextAndIcon}>
            <Icon name="book" size={24} color="#FFF" />
            <Text style={styles.readButtonText}>{text}</Text>
          </View>
          <View style={styles.readButtonCompleteView}>
            <Text style={styles.readButtonCompleteTitle}>Tamamlanma</Text>
            <Text style={styles.readButtonCompletePercent}>%{completePercent}</Text>
          </View>
        </View>
        <View style={[styles.completePercentView, { width: completePercent + "%" }]} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buyButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#ffffff",
    paddingLeft: 6,
  },
  buyButtonPrice: {
    textAlign: "center",
    fontWeight: "800",
    padding: 14,
    fontSize: 18,
    color: "#FFF",
  },

  buttonContainer: {
    height: 54,
    width: "100%",
    flex: 1,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonTextAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  readButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#FFF",
    paddingLeft: 6,
  },
  readButtonCompleteView: {
    flexDirection: "column",
    padding: 6,
  },
  readButtonCompletePercent: {
    textAlign: "right",
    fontWeight: "800",
    fontSize: 18,
    color: "#FFF",
  },
  readButtonCompleteTitle: {
    fontWeight: "400",
    fontSize: 14,
    color: "#FFF",
  },

  completePercentView: {
    position: "absolute",
    height: 4,
    backgroundColor: "#059669",
    borderBottomLeftRadius: 6,
    bottom: 0,
  },
})
module.exports = { BuyButton: BuyButton, ReadButton: ReadButton }
