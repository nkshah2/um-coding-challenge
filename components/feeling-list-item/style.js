/** @flow */
import EStyleSheet from 'react-native-extended-stylesheet';

const style = EStyleSheet.create( {

    root: {
        padding: 16,
        justifyContent: 'center',
        width: '$deviceWidth - 32',
        marginVertical: 2,
        fontSize: 18,
    },

    text: {
        fontWeight: '500',
    },

} );

export default style;