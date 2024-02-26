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
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../style-sheet'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'

function BusinessCreateScreening({ navigation }) {
  const route = useRoute()
  const business_id = route.params.business_id
  const [loading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQuerySlug, setSearchQuerySlug] = useState('')
  const [data, setData] = useState([])
  const [idNo, setIdNo] = useState('')
  const [err, setErr] = useState(null)
  const [title, setTitle] = useState('')
  const [poster, setPoster] = useState('')
  const [runtime, setRuntime] = useState('100')
  const [certificate, setCertificate] = useState('12')

  useEffect(() => {
    setIsLoading(true)
    fetchData(movieEndpoint)
  }, [searchQuery])

  useEffect(() => {
    fetchRuntime(idNo)
  }, [idNo])

  useEffect(() => {
    fetchCertificate(idNo)
  }, [idNo])

  const movieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=2ff74c9759be7b397da331e5c4e692ee&query=${searchQuerySlug}&include_adult=false&language=en-US&page=1`

  const fetchRuntime = async (filmid) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${filmid}?api_key=2ff74c9759be7b397da331e5c4e692ee`
      )
      const json = await response.json()
      setIsLoading(false)
      json.runtime < 40
        ? setRuntime('100')
        : setRuntime(json.runtime.toString())
    } catch (error) {
      setErr(error)
      console.log(error)
    }
  }

  const fetchCertificate = async (filmid) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${filmid}/release_dates?api_key=2ff74c9759be7b397da331e5c4e692ee`
      )
      const json = await response.json()
      const result = json.results
      result.map((item) => {
        if (item.iso_3166_1 === 'GB') {
          if (item.release_dates.certification !== '') {
            setCertificate(item.release_dates[0].certification)
          }
          if (
            item.release_dates[0].certification === '' ||
            item.release_dates[0].certification === null ||
            item.release_dates[0].certification === undefined
          ) {
            setCertificate('12')
          }
        }
      })
      setIsLoading(false)
    } catch (error) {
      setErr(error)
      console.log(error)
    }
  }

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

  function handlePress(item) {
    setTitle(item.title)
    setPoster(`https://image.tmdb.org/t/p/w500${item.poster_path}`)
    setIdNo(item.id)
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
                  <TouchableOpacity
                    onPress={() => {
                      handlePress(item)
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                      style={{ width: 80, height: 100 }}
                    />
                    <View>
                      <Text>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          ></FlatList>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('BusinessListingPage', {
            business_id,
            title: title,
            poster: poster,
            runtime: runtime,
            certificate: certificate,
          })
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BusinessCreateScreening
