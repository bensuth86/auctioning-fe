import { useState } from 'react'
import {
  ActivityIndicator,
  TextInput,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native'
import filter from 'lodash.filter'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SeatButton, Button } from '../helpers'
import { styles } from '../style-sheet'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import axios from 'axios'

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
    fetchData(apiEndpoint)
  }, [searchQuery])

  const fetchData = async (url) => {
    try {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
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
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
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
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={[data]}
          keyExtractor={(item) => item['imdbID']}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item['Poster'] }} />
              <View>
                <Text>{item['Title']}</Text>
              </View>
            </View>
          )}
        ></FlatList>
      )}
    </SafeAreaView>
  )
}

export default BusinessCreateScreening
