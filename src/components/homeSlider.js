import { Dimensions, Pressable, StyleSheet, View } from "react-native"
import React, { useEffect, useMemo, useRef, useState } from "react"
import FastImage from "react-native-fast-image"
import RequestManager from "../utils/requestManager"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { useNavigation } from "@react-navigation/native"
import Carousel from "react-native-snap-carousel"
import { BASE_URL } from "../utils/constants"

const HomeSlider = ({ request }) => {
  const [fetching, setFetching] = useState(false)
  const [sliders, setSliders] = useState([])
  const sliderRef = useRef()
  const { push } = useNavigation()
  const getSliders = useMemo(() => RequestManager(request), [request])

  useEffect(() => {
    setFetching(true)
    getSliders
      .then(res => {
        setSliders(res)
        setFetching(false)
      })
      .catch(err => {
        setFetching(false)
      })
  }, [getSliders])

  if (!fetching) {
    if (sliders?.length > 0) {
      return (
        <>
          <Carousel
            layoutCardOffset={8}
            layout="stack"
            loop={true}
            autoplay={true}
            autoplayDelay={3500}
            ref={sliderRef}
            data={sliders}
            dotsLength={12}
            sliderWidth={Dimensions.get("window").width}
            itemHeight={Dimensions.get("window").width / 2}
            enableMomentum={true}
            sliderHeight={Dimensions.get("window").width / 2}
            slideStyle={{ padding: 12, borderRadius: 6 }}
            itemStyle={{ borderRadius: 6 }}
            itemWidth={Dimensions.get("window").width}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() =>
                    item?.product ? push("BookDetail", { sharedKey: "slider", item: item?.product }) : undefined
                  }>
                  <View style={styles.sliderImageView}>
                    <FastImage
                      style={styles.sliderImage}
                      source={{
                        uri: BASE_URL + "slider/" + item?.image,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  </View>
                </Pressable>
              )
            }}
          />
        </>
      )
    } else {
      return <View />
    }
  } else {
    return (
      <View style={{ height: "auto", margin: 12 }}>
        <SkeletonPlaceholder>
          <View style={{ width: "100%", height: 200 }} />
        </SkeletonPlaceholder>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sliderImageView: {
    height: Dimensions.get("window").width / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
})

export default HomeSlider
