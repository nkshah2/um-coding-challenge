/** @flow */
import { combineReducers } from 'redux';
import saveEntries from './save-entries';

const reducers = combineReducers( {
    entries: saveEntries,
} );

export default reducers;