/** @flow */
const GET_ENTRIES_URL = 'https://umcodingchallenge.firebaseio.com/data.json';
const SAVE_ENTRY_URL = 'https://umcodingchallenge.firebaseio.com/data/';

export const fetchEntries = () => new Promise( ( resolve, reject ) => {
    fetch( GET_ENTRIES_URL, {
        headers: {
            "content-type": "application/json",
        }
    } )
        .then( ( data ) => JSON.parse( data._bodyInit ) )
        .then( ( response ) => {
            const posts = Object.entries( response );
            resolve( posts );
        } )
        .catch( e => {
            reject( e );
        } )
} );

export const saveEntry = (
    timestamp: string,
    day: string,
    month: string,
    time: string,
    mood: number,
    feelings: string,
    comment: string,
) => new Promise( ( resolve, reject ) => {
    const body = {
        comment,
        day,
        feelings,
        month,
        mood,
        time,
    }
    fetch( `${SAVE_ENTRY_URL}${timestamp}.json`, {
        method: 'put',
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify( body ),
    } )
        .then( () => {
            resolve();
        } )
        .catch( ( e ) => {
            reject( e );
        } )
} );