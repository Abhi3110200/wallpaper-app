import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Categories from "../../components/categories";
import { apiCall } from "../../api";
import ImageGrid from "../../components/imageGrid";
import {debounce} from 'lodash'

var page=1;

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState(false);
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = false) => {
    // fetch images from api
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([...images,...res.data.hits]);
      }else{
        setImages([...res.data.hits]);
      }
    }
  };

  const clearSearch=()=>{
    setSearch("");
    searchInputRef?.current?.clear();
  }

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page=1;
    let params ={
        page,
    }
    if(cat) params.category = cat;
    fetchImages(params, false);
  };

  const handleSearch = (text)=>{
    setSearch(text);
    if(text.length>2){
        page=1;
        setImages([]);
        setActiveCategory(null);
        fetchImages({page, q:text}, false)
    }

    if(text==""){
        page=1;
        searchInputRef?.current?.clear();
        setImages([]);
        setActiveCategory(null)
        fetchImages({page},false)
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6 name="bars-staggered" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.5)}
            />
          </View>
          <TextInput
            value={search}
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
            placeholder="Search for Photo"
            style={styles.searchInput}
            placeholderTextColor={theme.colors.neutral(0.5)}
          />

          {search && (
            <Pressable onPress={()=>handleSearch("")} style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.5)}
              />
            </Pressable>
          )}
        </View>

        <View>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View>
            {
                images.length>0 && <ImageGrid images={images}/>
            }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: hp(2.5),
    borderRadius: theme.radius.sm,
    width: wp(100),
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  closeIcon: {
    padding: 8,
    backgroundColor: theme.colors.neutral(0.1),
    borderRadius: theme.radius.sm,
  },
});
