/** @flow */
import EStyleSheet from 'react-native-extended-stylesheet';

const style = EStyleSheet.create( {

    root: {
        flex: 1,
        backgroundColor: '$background.color1',
    },

    summaryContainer: {
        height: '$deviceHeight * 0.4',
        backgroundColor: '$background.color3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginHorizontal: 8,
    },

    entriesContainer: {
        flex: 1,
        marginHorizontal: 8,
        backgroundColor: '$background.color3',
        marginBottom: 8,
    },

    chartContainer: {
        height: '$deviceHeight * 0.28',
        width: '$deviceHeight * 0.28',
        backgroundColor: 'yellow',
    },

    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 24,
        marginRight: 8,
    },

    averagePercentage: {
        fontSize: 50,
        color: '$text.color3',
    },

    info: {
        color: '$text.color1',
        fontWeight: '500',
    },

    cta: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderColor: '$border.color2',
        borderWidth: 1,
    },

    ctaText: {
        color: '$text.color3',
    },

    top: {
        marginTop: 8,
        marginHorizontal: 8,
        backgroundColor: '$background.color3',
    },

    ctaContainer: {
        alignSelf: 'flex-end',
        marginRight: 8,
        marginTop: 8,
    },

} );

export default style;