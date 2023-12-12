import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image
} from 'react-native';
import { useState, useEffect } from 'react';
import { Card } from 'react-native-elements';

const Home = ({navigation}) => {
  const [dataToSend, setData] = useState('');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mzg2ZjRiZTFlZDMzMTM1NjYzNmY1ZDRjYTA5YzBmOSIsInN1YiI6IjY1NzdhMDUxYmJlMWRkMDBmZTJjMDlmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cx1SCmXzy9fiT_vzIzUh05MD1HGQ2gqtz1KMvgiS-NA'
      }
    };
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        setData(data.results.slice(0,10))})
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Welcome to <Text style={styles.title}>Movie Explorer 🍿</Text>
      </Text>
      <ScrollView scrollEnabled={true} style={styles.containerMovies}>
        <FlatList
          data={dataToSend}
          renderItem={({ item }) => (
            <Card containerStyle={styles.card}>
              <TouchableOpacity onPress={() =>
        navigation.navigate('Detail', {movie: item})}>
                <View style={styles.viewStyle}>
                  <View style={styles.textView}>
                    <Text style={styles.titleMovie}>{item.title}</Text>
                    <Text style={styles.releaseDate}>📅     {item.release_date}</Text>
                  </View>
                  <View style={styles.movieView}>
                    <Image style={styles.image} source={{uri : 'https://image.tmdb.org/t/p/original/' + item.poster_path}} />
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 30,
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 36,
    fontFamily: 'cursive',
    fontWeight: 'bold',
    color: '#F9B572'
  },
  containerMovies: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F9B572',
    height: 200,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  viewStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
  },
  textView: {
    width: '50%',
    height: 200,
    marginBottom: 5,
  },
  titleMovie: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    width: 130,
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    marginLeft: 10,
    marginTop: 10,
    height: 155, 
    width: 130,
    borderRadius: 7,
  },
  releaseDate: {
    marginLeft: 10,
    width: 120,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
