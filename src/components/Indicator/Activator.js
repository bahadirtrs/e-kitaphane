import React, { Component } from "react";
    import {
      Text,
      View,
      StyleSheet,
      Animated,
      TouchableOpacity
    } from "react-native";

export default class ActivatorActivator extends Component {
  state = {
    rotateValue: new Animated.Value(0)
  };


  componentDidMount() {
    this._start();
  }
  _start = () => {
    Animated.loop(
      Animated.timing(this.state.rotateValue, {
        toValue: 1,
        duration: 800,
        Infinite: true,
        useNativeDriver:false
      })
    ).start();
  };


  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: this.state.rotateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"]
                })
              }
            ],
            height: 40,
            width: 40,
            margin: 5,
            borderWidth: 5,
            borderColor: "#ccc",
            borderBottomColor: "#118ab2",
            borderRadius: 50,
            justifyContent: "flex-start"
          }}
        />
        <Text style={styles.text}>Uygulama başlatılıyor</Text>
        <Animated.View />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
      flex:1,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {},
  btn: {
    backgroundColor: "#480032",
    width: 100,
    height: 40,
    padding: 3,
    justifyContent: "center",
    borderRadius: 6
  },
  text: {
    fontSize: 16,
    color: "#333",
    fontFamily:'GoogleSans-Regular',
    textAlign: "center"
  },
  item1: {
    backgroundColor: "red",
   
  },


  textBtn: {
    color: "#f4f4f4",
    fontWeight: "bold",
    textAlign: "center"
  }
});