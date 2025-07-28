import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { FeedCard } from './FeedCard';
import React, { act } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../reducer/thunk';
import { AppDispatch } from '../store';
import { ImageData } from '../types';
import { resetPage } from '../reducer/reducer';

export const FeedScreen = () => {
  const { imageUrls : feedData, hasMore, page, isLoading }= useSelector((state :any )=>state.images) ;
  const dispatch = useDispatch<AppDispatch>();
  const [scrollY, setScrollY] = React.useState(0.1);

  // Effects
  React.useEffect(()=>{    
    dispatch(fetchNextPage({ page: 0, perPage: 10 }));
    dispatch(resetPage()); // set initial page to 0
  },[]);

  // Handlers
  const fetchMore = React.useCallback(() => {
    if (isLoading || !hasMore) return;
      if (hasMore) {
        dispatch(fetchNextPage({ page, perPage: 10 }));
      }

  }, [hasMore, dispatch, page]);

  // Callbacks
  const renderItem = React.useCallback(({ item, index }: { item: ImageData, index: number }) => (
    <FeedCard 
      item={item} 
      shouldElevate={index < scrollY && index + 1 >= scrollY} // Elevate the card if it is in the middle of the screen.
    />
  ), [scrollY]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
      </View>
      <FlatList 
        data = {feedData}
        keyExtractor={(item) => item.id}
        renderItem = {renderItem}
        contentContainerStyle = {{ padding: 12 }}
        onEndReached={fetchMore} // Trigger fetchMore when the end is reached
        onEndReachedThreshold={0.5} 
        onScroll={({ nativeEvent }) => {
          setScrollY((nativeEvent.contentOffset.y/300) + 1);
        }}
      />
      
      <ActivityIndicator 
        animating={isLoading}
        size="large"
        color="black"
        style = {styles.activityIndicator}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
});