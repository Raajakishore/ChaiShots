import { Image, StyleSheet, Text, View } from 'react-native';
import { ImageData } from '../types';
import FastImage from 'react-native-fast-image';
import React from 'react';

export const FeedCard = React.memo(({ item, shouldElevate }: { readonly item: ImageData, readonly shouldElevate: boolean }) => {
  // Animated style for elevation and opacity. This will change based on the `shouldElevate` prop.
  const elevateAnimatedStyle =  {
      opacity: shouldElevate ? 1 : 0.75,
      elevation: shouldElevate ? 10 : 0,
      shadowColor: shouldElevate ? "#000" : "transparent",
      shadowOffset: shouldElevate ? { width: 0, height: 4 } : { width: 0, height: 0 },
      shadowOpacity: shouldElevate ? 1 : 0,
      shadowRadius: shouldElevate ? 5 : 0,      
  }

  return (
    <>
      <View style={[styles.itemStyle, elevateAnimatedStyle]}>
        <FastImage
          // Using FastImage for better performance with caching
          source={{ uri: item.thumbnail, priority: FastImage.priority.high, cache: FastImage.cacheControl.immutable }}
          style={styles.tinyLogo}
          resizeMode={'cover'}
        />
        <Image style={styles.playIcon} source={require("../assets/play.png")} />
      </View>
      <View style={styles.textRow}>
        <Text style={styles.text}>{item.videoTitle}</Text>
        <Text style={styles.text}>{item.duration}</Text>
      </View>
    </>
  );
}, (prev, next) => // Memoization to prevent unnecessary re-renders.
  prev.shouldElevate === next.shouldElevate &&
  prev.item.id === next.item.id
);

const styles = StyleSheet.create({
    itemStyle: {
    width:"100%",
    marginVertical: 12,
  },
    tinyLogo: {
    width: "100%",
    height: 234,
    borderRadius:12
  },
  playIcon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    top: "35%",
    backgroundColor: "white",
    borderRadius: 18,                
    position: 'absolute',
  },
  textRow: {flexDirection:"row", justifyContent:"space-between", padding: 12},
  text: { fontSize: 14 }
});