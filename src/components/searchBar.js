import React, { useState } from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

function SearchBar({ onChangeText,setTermClick, value, title }) {
  const [term, setTerm] = useState()
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={title}
            placeholderTextColor={'#aaa'}
            style={styles.textInput}
            value={value}
            onChangeText={term => {onChangeText(term), setTerm(term)}}
          />
          {term?.length > 2 ? (
            <Pressable style={styles.searchButton} onPress={setTermClick}>
              <Icon name="close-outline" size={28} color="#888" />
            </Pressable>
          ) : (
            <Pressable style={styles.searchButton} onPress={() => {}}>
              <Icon name="search-outline" size={24} color="#888" />
            </Pressable>
          )}
        </View>
        {title='Kitaplarda Ara'
        ?undefined
        :<Icon name="options-outline" size={36} color="#6B7280" style={styles.filterButton} />
        }
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
    height:40,
    alignSelf: "flex-start",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    flex: 1,
    borderRadius: 8,
    paddingLeft: 40,
    fontSize: 14,
    shadowColor: "#333",
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
