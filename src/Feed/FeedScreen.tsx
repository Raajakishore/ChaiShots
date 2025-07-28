import { FlatList, Image, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { FeedCard } from './FeedCard';
import React from 'react';
import { useSelector } from 'react-redux';
import { store } from '../store';

export const FeedScreen = () => {
  const feedData = useSelector((state :any )=>state.imageUrls) ;

  React.useEffect(()=>{

  },[]);

  return (
    <View style={styles.container}>
      <FlatList 
        data = {[1,2]}
          keyExtractor={(_, i) => i.toString()}
        renderItem = {() => {
        
          return (
            <View style={styles.itemStyle}>
      <Image
         source={{
          uri:   'https://picsum.photos/seed/61/300/200',
        }}
        style={styles.tinyLogo}
         resizeMode={'cover'}

      />
          <View style={{flexDirection:"row", justifyContent:"space-between", padding: 12}}>
        <Text>Video 1</Text>
        <Text>01:12</Text>
      </View>

            </View>
          );
        }}
        contentContainerStyle = {{padding: 12}}
      />
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   itemStyle: {
    width:"100%",
    marginVertical: 12,
  },
    tinyLogo: {
    width: "100%",
    height: 234,
    borderRadius:12
  },
});