import { StyleSheet } from 'react-native'

export const selectedMovieStyle = StyleSheet.create({
    eventInfo: {
        padding: 10,
        marginLeft: 5,
        justifyContent: 'center',
        flex: 1,
        width: 200,
    },
    eventContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 'auto',
        marginTop: 20,
        marginBottom: 20
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
