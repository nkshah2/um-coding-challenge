/**
    Author: Nemi Shah
    @flow
 */
import { ACTION_TYPES } from '../constants';

const INITIAL_STATE = {};

const saveEntries = ( state: Object = INITIAL_STATE, action: Object ) => {
    switch ( action.type ) {
        case ACTION_TYPES.SAVE_POSTS:
            return { ...state, data: [ ...action.payload ] };
        default:
            return state;
    }
}

export default saveEntries;