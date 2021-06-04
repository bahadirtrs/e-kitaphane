import React, { useState } from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { COLORS } from "../constants/theme"
import { useTheme } from "@react-navigation/native"

function SearchBar({ onChangeText,setTermClick, value, title }) {
  const [term, setTerm] = useState()
  const {colors}=useTheme()
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={title}
            placeholderTextColor={colors.text}
            style={[styles.textInput,{backgroundColor:colors.background, borderColor:colors.border, color:colors.text}]}
            value={value}
            textAlignVertical={'center'}
            onChangeText={term => {onChangeText(term), setTerm(term)}}
          />
          {term?.length > 2 ? (
            <Pressable style={styles.searchButton} onPress={setTermClick}>
              <Icon name="close-outline" size={28} color={colors.text}/>
            </Pressable>
          ) : (
            <Pressable style={styles.searchButton} onPress={() => {}}>
              <Icon name="search-outline" size={24} color={colors.text} />
            </Pressable>
          )}
        </View>
        {title='Kitaplarda Ara'
        ?undefined
        :<Icon name="options-outline" size={36} color={COLORS.textColor} style={styles.filterButton} />
        }
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 6,
  },
  textInputContainer: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  textInput: {
    fontFamily:'GoogleSans-Regular',
    height:40,
    alignSelf: "center",
    borderWidth:0.5,
    borderColor: COLORS.border,
    padding: 0,
    flex: 1,
    borderRadius: 18,
    paddingLeft: 40,
    fontSize: 14,
    shadowColor:COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.09,
    shadowRadius: 1,
    elevation: 0,
  },
  searchButton: {
    width: 48,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  filterButton: {
    width: 48,
    height: 40,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
})
export default SearchBar
