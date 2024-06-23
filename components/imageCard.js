import { Pressable, StyleSheet,  Text, View } from 'react-native'
import React from 'react'
import {Image} from 'expo-image'
import { getImageSize, wp } from '../helpers/common'
import { theme } from '../constants/theme'

const ImageCard=({item,index, columns})=> {

    const isLastInRow = ()=>{
        return (index+1) % columns===0;
    }
    const getImageHeight = ()=>{
        let {imageHeight: height, imageWidth:width}= item;
        return {height: getImageSize(height,width)};
    }
  return (
    <Pressable style={[styles.wrapper, !isLastInRow() && styles.spacing]}>
        <Image source={item?.webformatURL} style={[styles.images, getImageHeight()]} transition={100}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    images:{
        width:'100%',
        height:300
    },
    wrapper:{
        overflow:'hidden',
        borderRadius:theme.radius.xl,
        borderCurve:'continuous',
        marginBottom:wp(2),
        backgroundColor:theme.colors.grayBG
    },
    spacing:{
        marginRight:wp(2)
    }
    
})

export default ImageCard