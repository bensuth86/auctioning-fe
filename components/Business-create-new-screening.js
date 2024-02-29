import { useState } from 'react'
import {
  ActivityIndicator,
  TextInput,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Snackbar } from 'react-native-paper'
import { styles } from '../style-sheet'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { Button } from '../helpers'

function BusinessCreateScreening({ navigation }) {
  const route = useRoute()
  const business_id = route.params.business_id
  const [loading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQuerySlug, setSearchQuerySlug] = useState('')
  const [data, setData] = useState([])
  const [idNo, setIdNo] = useState('')
  const [title, setTitle] = useState('')
  const [poster, setPoster] = useState('')
  const [runtime, setRuntime] = useState('100')
  const [certificate, setCertificate] = useState('12')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [resultMsg, setResultMsg] = useState('')
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(null)

  const movieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=2ff74c9759be7b397da331e5c4e692ee&query=${searchQuerySlug}&include_adult=false&language=en-US&region=gb&sort_by=popularity.desc&primary_release_year=${year}&page=1`

  useEffect(() => {
    setIsLoading(true)
    setVisible(false)
    fetchData(movieEndpoint)
  }, [searchQuery, year])

  useEffect(() => {
    setVisible(false)
    fetchRuntime(idNo)
    fetchCertificate(idNo)
  }, [idNo])

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
      if (searchQuery !== '') {
        setVisible(true)
        setSnackbarMessage(
          'Error fetching data. Please check your network connection...'
        )
      }
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
      if (searchQuery !== '') {
        setVisible(true)
        setSnackbarMessage(
          'Error fetching data. Please check your network connection...'
        )
      }
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
      setData(json.results.slice(0, 8))
      !data.length && setResultMsg('No films for that search.')
      setIsLoading(false)
    } catch (error) {
      if (searchQuery !== '') {
        setVisible(true)
        setSnackbarMessage(
          'Error fetching data. Please check your network connection...'
        )
      }
    }
  }

  function handlePress(item) {
    setTitle(item.title)
    setPoster(`https://image.tmdb.org/t/p/w500${item.poster_path}`)
    setIdNo(item.id)
    Keyboard.dismiss()
  }

  function handleSearch(query) {
    setSearchQuerySlug(slugify(query))
    setSearchQuery(query)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 0,
        backgroundColor: '#2b1d41',
        margin: 0,
        height: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: '#2b1d41',
          height: '30%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          minHeight: 180,
        }}
      >
        <Text
          style={{
            fontFamily: 'Comfortaa-Regular',
            fontSize: 20,
            textAlign: 'center',
            color: '#f5f5f5',
          }}
        >
          Search for a film to list:
        </Text>
        <TextInput
          placeholder="search"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
          selectionColor={'rgba(43, 29, 65, 0.1)'}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: '#f5f5f5',
            height: 40,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
            width: '80%',
            fontWeight: 'normal',
            fontFamily: 'Comfortaa-Light',
          }}
        />
        {year === currentYear ? (
          data.length ? (
            <Button
              btnText={`SHOW ALL RELEASES`}
              onPress={() => setYear(null)}
            ></Button>
          ) : (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  width: 280,
                  fontFamily: 'Comfortaa-Regular',
                  fontSize: 12,
                  color: 'red',
                }}
              >
                {resultMsg}
              </Text>
              <Button
                btnText={`SHOW ALL RELEASES`}
                onPress={() => setYear(null)}
              ></Button>
            </>
          )
        ) : null}
        {year !== currentYear ? (
          data.length ? (
            <Button
              btnText={`SHOW ${currentYear} RELEASES`}
              onPress={() => setYear(currentYear)}
            ></Button>
          ) : (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  width: 280,
                  fontFamily: 'Comfortaa-Regular',
                  fontSize: 12,
                  margin: 10,
                  color: 'red',
                }}
              >
                {resultMsg}
              </Text>
              <Button
                btnText={`SHOW ${currentYear} RELEASES`}
                onPress={() => setYear(currentYear)}
              ></Button>
            </>
          )
        ) : null}
      </View>

      {loading === true ? (
        <View style={styles.container}>
          <ActivityIndicator color="red" size={'large'} />
        </View>
      ) : (
        <View style={{ height: '50%', backgroundColor: '#f5f5f5' }}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handlePress(item)
                    }}
                  >
                    <View
                      style={{
                        width: 280,
                        marginBottom: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: 280,
                            fontFamily: 'Comfortaa-Regular',
                            fontSize: 12,
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                        }}
                        style={{ width: 130, height: 180.5 }}
                        accessibilityLabel={`${item.title} poster`}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          ></FlatList>
        </View>
      )}
      <View
        style={{
          backgroundColor: '#f5f5f5',
          height: '20%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title && (
          <Text
            style={{
              fontFamily: 'Comfortaa-Regular',
              fontSize: 12,
              marginRight: 20,
              marginLeft: 20,
              textAlign: 'center',
            }}
          >
            Selected film: {'\n'}
            <Text style={{ fontFamily: 'Comfortaa-Bold', fontSize: 16 }}>
              {title}
            </Text>
          </Text>
        )}
        {title && (
          <Button
            btnText={'CREATE SCREENING'}
            onPress={() =>
              navigation.navigate('BusinessListingPage', {
                business_id,
                title: title,
                poster: poster,
                runtime: runtime,
                certificate: certificate,
              })
            }
          />
        )}
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  )
}

export default BusinessCreateScreening
