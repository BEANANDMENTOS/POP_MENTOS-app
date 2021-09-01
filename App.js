import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, Button, TouchableWithoutFeedback, Linking } from 'react-native'
import Sound from "react-native-sound";


const App = () => {
  const [count, setCount] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const onPress = () => {
    setCount(count + 1);
  }
  Sound.setCategory('Playback');

// const changeIMG = () => {
//   setIsClick(true);
//   setTimeout(() => {
//     onPress();
//     setIsClick(false);
//   }, 100)
// }

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
          <Text style={isClick ? styles.textCount_active : styles.textCount}>
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