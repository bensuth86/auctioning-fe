import { useState } from 'react'
import {
  ActivityIndicator,
  TextInput,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import filter from 'lodash.filter'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../style-sheet'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'

function BusinessCreateScreening(navigation) {
  const route = useRoute()
  const business_id = route.params.business_id
  const [loading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQuerySlug, setSearchQuerySlug] = useState('')
  const [data, setData] = useState([])
  const [fullData, setFullData] = useState([])
  const [err, setErr] = useState(null)
  const apiEndpoint = `https://www.omdbapi.com/?apikey=f593767e&t=${searchQuerySlug}`

  const movieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=2ff74c9759be7b397da331e5c4e692ee&query=${searchQuerySlug}&include_adult=false&language=en-US&page=1`

  function slugify(str) {
    return String(str)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  useEffect(() => {
    setIsLoading(true)
    fetchData(movieEndpoint)
  }, [searchQuery])

  const fetchData = async (url) => {
    try {
      const response = await fetch(url)
      const json = await response.json()
      setData(json.results)
      setIsLoading(false)
    } catch (error) {
      setErr(error)
      console.log(error)
    }
  }

  function handleSearch(query) {
    setSearchQuerySlug(slugify(query))
    setSearchQuery(query)
  }

  // if (err) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Error fetching data</Text>
  //     </View>
  //   )
  // }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 2 }}>
      <TextInput
        placeholder="search"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 8,
        }}
      />
      {loading === true ? (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ height: 400 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                    style={{ width: 80, height: 100 }}
                  />
                  <View>
                    <Text>{item.title}</Text>
                  </View>
                </View>
              )
            }}
          ></FlatList>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        // onPress={() =>
        //   navigation.navigate('BusinessCreateScreening', {
        //     business_id,
        //   })
        // }
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BusinessCreateScreening
