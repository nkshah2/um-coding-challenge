/** @flow */
import EStyleSheet from 'react-native-extended-stylesheet';

const style = EStyleSheet.create( {

    screenRoot: {
        flex: 1,
    },

    root: {
        position: 'absolute',
        width: '$deviceWidth',
        height: '$deviceHeight',
        top: 0,
        backgroundColor: '$background.color3',
    },

    titleContainer: {
        height: '$deviceHeight * 0.2',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        fontWeight: '500',
        color: '$text.color1',
    },

    moodSelector: {
        flex: 1,
        backgroundColor: '$background.color1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    moodContainer: {
        height: '$deviceWidth * 0.7',
        width: '$deviceWidth * 0.7',
        backgroundColor: 'yellow',
    },

    slider: {
        width: '$deviceWidth * 0.25',
        marginTop: 48,
    },

    ctaContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },

    cta: {
        backgroundColor: '$background.color3',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },

    ctaText: {
        color: '$text.color1',
        fontSize: 18,
    },

    feelingSelector: {
        flex: 1,
        backgroundColor: '$background.color1',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );

export default style;