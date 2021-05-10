import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { TouchableOpacity } from "react-native"

export default function CategoryListItem({ item }) {
  const { push } = useNavigation()
  const childrenCategories = item?.children_categories
  return (
    <TouchableOpacity style={styles.container} 
      onPress={()=>push("BookCategories",{item: item, pageName:'Tüm Kategoriler' })}  activeOpacity={0.9}
    >
      <View style={styles.categoryTitleView}>
        <Text style={styles.categoryTitle} numberOfLines={1}>
          {item?.title}
        </Text>
        {childrenCategories
          ? childrenCategories?.map(child => {
              return <CategoryListItem key={"child-item-" + child.id} item={child} />
            })
          : undefined}
      </View>
    </TouchableOpacity>
  )
}

export const CategoryListItemPlaceholder = () => {
  return (
    <View style={{ width: "100%", height: "auto", borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}>
      <SkeletonPlaceholder>
        <View style={{ width: "90%", paddingHorizontal: 12, paddingVertical: 12, flexDirection: "row" }}>
          <View style={{ width: "90%", height: 20 }} />
        </View>
      </SkeletonPlaceholder>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  categoryTitleView: {
    flexDirection: "column",
    paddingHorizontal: 6,
    flex: 1,
  },
  categoryTitle: {
    flexWrap: "wrap",
    fontFamily:'GoogleSans-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: "#1F2937",
    paddingBottom: 6,
  },
})
