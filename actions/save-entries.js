// @flow
import { ACTION_TYPES } from '../constants';

const saveEntries = ( data: Array<Object> ) => {
    return { type: ACTION_TYPES.SAVE_POSTS, payload: data };
}

export default saveEntries;