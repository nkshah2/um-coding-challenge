/** @flow */
import EStyleSheet from 'react-native-extended-stylesheet';

const style = EStyleSheet.create( {

    root: {
        flex: 1,
        backgroundColor: '$background.color2',
        alignItems: 'center',
        justifyContent: 'center',
    },

    appName: {
        fontSize: 48,
        color: '$text.color2',
        fontWeight: '500',
    },

    loader: {
        marginTop: 32,
    },

} );

export default style;