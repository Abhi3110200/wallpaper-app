import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MasonryList from '@react-native-seoul/masonry-list'
import ImageCard from "./imageCard";
import { getColumnCount, wp } from "../helpers/common";

const ImageGrid = ({ images }) => {
    const columns =getColumnCount();
  return (
    <View style={styles.container}>
        {/* <MasonryFlashList data={images} numColumns={2} renderItem={({item})=> <ImageCard item={item}/>} estimatedItemSize={200}/> */}
        <MasonryList initialNumToRender = {1000} contentContainerStyle={styles.listContainer} data={images} renderItem={({item,index})=> <ImageCard columns={columns} item={item} index={index}/>} numColumns={2} showsVerticalScrollIndicator={false}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        minHeight:3,
        width:wp(100)
    },
    listContainer:{
        paddingHorizontal:wp(4),
    }
});

export default ImageGrid;
