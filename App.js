import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ImageBackground, Button, TouchableWithoutFeedback, Linking } from 'react-native'
import Sound from "react-native-sound";
import AsyncStorage from "@react-native-async-storage/async-storage"

const App = () => {
  const [count, setCount] = useState(null)
  const [isClick, setIsClick] = useState(false);

  useEffect(async () => {
    const count_s = await AsyncStorage.getItem("key");
    if (count_s) {
      setCount(parseInt(count_s))
    } else {
      await AsyncStorage.setItem('key', "0")
    }
  }, [])
  // let asyncFetch = () => {
  // if(!AsyncStorage.getItem('key')) {
  //   try {
  //     AsyncStorage.setItem('key', 0)
  //     alert("succ");
  //   } catch (e) {
  //     alert("error");
  //   } 
  // }
  //   if (!AsyncStorage.getItem('key')) {
  //     return 0;
  //   }
  //   return AsyncStorage.getItem('key')
  // }

  const onPress = async () => {
    setCount(count + 1);
    await AsyncStorage.setItem('key', count.toString())
  }
  Sound.setCategory('Playback');

  const onPressIn = () => {
    const whoosh = new Sound('sound_pop.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        return;
      }
      whoosh.play((success) => {
        whoosh.release()
      });
    });
    setIsClick(true);
  }

  const onPressOut = () => {
    onPress();
    setIsClick(false);
  }

  return (                 //justifyContent = vertical   alignItems = horizontal
    <View>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} >
        <View style={styles.container}>
          <ImageBackground source={isClick ? require('./asset/3.jpg') : require('./asset/2.jpg')} resizeMode="cover" style={styles.image} >
            <Text style={styles.textHead}>
              POP MENTOS
            </Text>
            <Text style={isClick ? (styles.textCount_active) : (styles.textCount)}>
              {count}
            </Text>
            <View style={styles.btn_div}>
              <Button
                color="#1B262C"
                styles={styles.btn}
                onPress={() => { Linking.openURL('https://www.instagram.com/mr.bean_eiei/') }}
                title="Press Me"
              />
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%', height: '100%',
  },

  textHead: {
    marginTop: 100,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },

  textCount: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 50,
  },
  textCount_active: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 100
  },
  btn_div: {
    flex: 1,
    justifyContent: "flex-end"
  }
})

export default App;
