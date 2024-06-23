import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import theme from '../constants/theme'
import Animated, {FadeInDown} from 'react-native-reanimated'
import { useRouter } from "expo-router";

export default function index() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={require("../assets/welcome.png")} style={styles.bgImage} resizeMode="cover" />

      <Animated.View entering={FadeInDown.duration(600)} style={{flex:1}}>
        <LinearGradient colors={['rgba(255,255,255,0)','rgba(255,255,255,0.5)', "white",'white']} style={styles.gradient} start={{x:0.5 , y:0}}
        end={{x:0.5, y:0.8}}/>

        <View style={styles.contentContainer}>
            <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>
                Pixels
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punchline}>
                Every Pixel Tells a Story
            </Animated.Text>

            <Animated.View entering={FadeInDown.delay(600).springify()}>
                <Pressable onPress={()=>router.push('home')} style={styles.startButton}>
                    <Text style={styles.startText}>Start Explore</Text>
                </Pressable>
            </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width:wp(100),
    height:hp(100),
    position:'absolute'
  },
  container: {
    flex: 1,
  },
  gradient:{
    width:wp(100),
    height:hp(65),
    position:'absolute',
    bottom:0
  },
  contentContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    gap:14
  },
  title:{
    fontSize:hp(7),
    color: 'black',
    fontWeight:'bold'
  },
  punchline:{
    fontSize:hp(3),
    letterSpacing:1,
    marginBottom:10,
    fontWeight:'medium'
  },
  startButton:{
    marginBottom:50,
    backgroundColor:'black',
    padding:15,
    paddingHorizontal:90,
    borderRadius:16,
    borderCurve:'continuous'
  },
  startText:{
    fontSize:hp(3),
    color:'white',
    fontWeight:'meidum',
    letterSpacing:1
  }

});
