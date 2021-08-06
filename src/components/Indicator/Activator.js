import React, { Component } from "react";
import { Dimensions } from "react-native";
    import {
      Text,
      View,
      StyleSheet,
      Animated,
      Image
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
        duration: 1300,
        Infinite: true,
        useNativeDriver:false
      })
    ).start();
  };


  render() {
    return (
      <>
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
            height: 120,
            width: 120,
            margin: 5,
            borderWidth: 1.5,
            borderColor: "#bbb",
            borderColor: "#fff",
            borderBottomColor:'#118ab2',
            borderRadius: 60,
            justifyContent: "center",
            position:'absolute',
          }}
        />
        <Image style={{width:40, height:40}}  source={require('../../../assets/books-logo.png')} />
        <Animated.View />
        <Text style={{color:'#fff', fontSize:8, fontFamily:'GoogleSans-Medium', paddingTop:10}} >E-Kitaphane</Text>
      </View>

     
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#1d3557',
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
    paddingTop:0,
    fontSize: 14,
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