import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFEFB',
        alignContent: 'center',
    },
    gameboard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    title: {
        fontSize: 30,
        marginBottom: 25,
        marginTop: 100,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
        color: '#6b705c'
    },
    flex: {
        flexDirection: 'row',
        marginBottom: 50,
        marginTop: 25,
    },
    row: {
       padding: 10, 
    },
    footer: {
        marginTop: 50,
    },
    author: {
        fontSize: 12,
        color: '#C9C9BA',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#6b705c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 50
    },
    buttonText: {
        color: '#fff'
    },
    gameinfo: {
        marginBottom: 15,
    },
    total: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    points: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        alignSelf: 'center',
        paddingVertical: 5,
    },
    zahl: {
        alignSelf: 'center',
    },
    bonus: {
        marginTop: 15,
    }
})