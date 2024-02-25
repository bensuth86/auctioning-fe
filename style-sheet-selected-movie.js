import { StyleSheet } from 'react-native'

export const selectedMovieStyle = StyleSheet.create({
    eventInfo: {
        // backgroundColor: 'yellow',
        padding: 10,
        marginLeft: 5,
        justifyContent: 'center',
        flex: 1,
        // backgroundColor: 'pink'
    },
    eventContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 'auto',
        // backgroundColor: 'yellow'
        // marginBottom: 10,
        // backgroundColor: 'yellow'
    },
    text: {
        flexWrap: 'wrap',
        fontFamily: 'Comfortaa-Light',
        fontSize: 12,
        color: '#f5f5f5'
    },
    imageContainer: {
        justifyContent: 'center',
    },
    eventHeader: {
        textAlign: 'left',
        fontSize: 15,
        marginBottom: 10,
        fontFamily: 'Comfortaa-Bold',
        color: '#f5f5f5'
    },
    icons: {
        marginRight: 15
    }
})
