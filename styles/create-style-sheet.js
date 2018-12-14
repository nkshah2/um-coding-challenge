import EStyleSheet from 'react-native-extended-stylesheet';
import {
   deviceHeight,
   deviceWidth,
} from './dimensions';
import {
    text,
    background,
    border,
} from './colors';

export const buildStyleSheet = () => {
    EStyleSheet.build( {
    $deviceHeight: deviceHeight,
    $deviceWidth: deviceWidth,
    $text: text,
    $background: background,
    $border: border,
} );
}