import { Text, View, StyleSheet, Image, ScrollView, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Detail = ({ navigation, route }) => {

  const [favorite, setFavorite] = useState(false);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('FavoriteKey', JSON.stringify(favorite));
    } catch (error) {
      // Error saving data
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('FavoriteKey');
        if (value !== null) {
          setFavorite(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); //

  useEffect(() => {
    storeData();
  }, [favorite])

  return (
    <ScrollView scrollEnabled={true}>
      <View style={styles.container}>
        
        <Image
          style={styles.image}
          source={{
            uri:
              'https://image.tmdb.org/t/p/original/' +
              route.params.movie.poster_path,
          }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{route.params.movie.title}</Text>
          <View style={styles.row}>
          <Text style={styles.rating}>
            {' '}
            ⭐ {route.params.movie.vote_average}
          </Text>
          </View>
          <Text style={styles.overview}>{route.params.movie.overview}</Text>
          <Pressable style={styles.button} onPress={() => setFavorite(!favorite)}>
            <Text style={styles.textButton}>{favorite ? 'Remove from Favorites': 'Add to Favorites'}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  image: {
    marginTop: 10,
    height: 460,
    width: '95%',
    borderRadius: 7,
  },
  detailsContainer: {
    padding: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 50,
    width: 250,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overview: {
    fontSize: 28,
    color: '#666',
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F9B572',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});
