/** @flow */
const GET_ENTRIEs_URL = 'https://umcodingchallenge.firebaseio.com/data.json';

export const fetchEntries = () => new Promise( ( resolve, reject ) => {
    fetch( GET_ENTRIEs_URL, {
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