import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions, Button, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
const COLORS = ['deepskyblue','fuchsia', 'lightblue '];
export default class BookPageView extends Component {
  
  getItemLayout = (data, index) => (
    { length: 50, offset: 50 * index, index }
  )
  
  getColor(index) {
    const mod = index%3;
    return COLORS[mod];
  }
  
  scrollToIndex = () => {
    let randomIndex = Math.floor(Math.random(Date.now()) * this.props.data.length);
    this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
  }
  
  scrollToItem = () => {
    let randomIndex = Math.floor(Math.random(Date.now()) * this.props.data.length);
    this.flatListRef.scrollToIndex({animated: true, index: "" + randomIndex});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width:'100%'  }}
          horizontal={true}
          ref={(ref) => { this.flatListRef = ref; }}
          keyExtractor={item => item}
          getItemLayout={this.getItemLayout}
          initialScrollIndex={1}
          initialNumToRender={1}
          renderItem={({ item, index}) => (
              <View style={{width:50,height:60, borderWidth:1, margin:3 }}>
                <Text>{item}</Text>
              </View>
            )}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      width:'100%'
  },
  header: {
    paddingTop: 0,
    backgroundColor: 'darkturquoise', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  width: width,
  height: 50,
  flex: 1,
  borderWidth: 1,
};
