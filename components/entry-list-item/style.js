/** @flow */
import EStyleSheet from 'react-native-extended-stylesheet';

const style = EStyleSheet.create( {

    root: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopWidth: 4,
        borderTopColor: '$border.color1',
    },

    top: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '$deviceHeight * 0.1',
        justifyContent: 'space-between',
    },

    bottom: {
        paddingVertical: 8,
    },

    dateContainer: {
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 32,
    },

    timeContainer: {
        paddingHorizontal: 8,
    },

    moodContainer: {
        height: '$deviceHeight * 0.08',
        width: '$deviceHeight * 0.08',
        marginRight: 24,
    },

    face: {
        height: '$deviceHeight * 0.08',
        width: '$deviceHeight * 0.08', 
        tintColor: '$background.color4',
    },

    image: {
        padding: 5,
        tintColor: '$background.color1',
    },

    day: {
        padding: 0,
        fontWeight: '500',
    },

    month: {
        padding: 0,
        fontWeight: 'bold',
        color: '$text.color1',
    },

    time: {
        fontSize: 18,
        fontWeight: '500',
    },

    halfContainer: {
        flexDirection: 'row',
    },

    feelingContainer: {
        backgroundColor: '$background.color1',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    feeling: {
        fontSize: 18,
        padding: 0,
    },

    comment: {
        marginTop: 16,
        fontSize: 18,
    },

} );

export default style;