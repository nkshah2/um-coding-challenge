/** @flow */
import React, { PureComponent } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
    fetchEntries,
} from '../../api';
import saveEntries from '../../actions/save-entries';
import styles from './style';

type State = {
}

type Props = {
    saveEntries: ( Array<[string, mixed]> ) => void,
}

class SplashScreen extends PureComponent<Props, State> {
    state: State;
    props: Props;

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        fetchEntries()
            .then( data => {
                this.props.saveEntries( data );
                // TODO: navigate to home
            } );
    }

    render() {
        return (
            <View
                style={ styles.root }
            >
                <Text
                    style={ styles.appName }
                >
                    Mood Check
                </Text>
                <ActivityIndicator
                    style={ styles.loader }
                    size={ 'large' }
                    color={ '#fff' }
                />
            </View>
        );
    }
}

export default connect( null, {
    saveEntries,
} )( SplashScreen );