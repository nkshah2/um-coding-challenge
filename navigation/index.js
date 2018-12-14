/** @flow */
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { SCREENS } from '../screens';

const Navigator = createStackNavigator( {
    ...SCREENS,
} );

export default createAppContainer( Navigator );