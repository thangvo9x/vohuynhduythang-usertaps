import React, {useState, useRef} from 'react';
import {
  Animated,
  PanResponder,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [valueOfSlide, setValueOfSlide] = useState(0);
  let _value = {x: 0, y: 0};

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: _value.x,
          y: _value.y,
        });
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  pan.addListener((value) => (_value = value));

  return (
    <View
      style={styles.mainView}
      onStartShouldSetResponderCapture={(e) => {
        console.log('coming');
        // Animated.spring(pan, {
        //   toValue: {
        //     x: e.nativeEvent.locationX,
        //     y: e.nativeEvent.locationY,
        //   },
        //   speed: valueOfSlide,
        // }).start(() => {
        //   pan.flattenOffset();
        // });
        // return false;
      }}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          },
        ]}
        {...panResponder.panHandlers}
      />
      <Slider
        style={{
          width: width - 40,
          height: 40,
          position: 'absolute',
          bottom: 60,
          left: 0,
          marginLeft: 20,
        }}
        minimumValue={1}
        maximumValue={30}
        value={valueOfSlide}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'blue',
  },
});

export default App;
