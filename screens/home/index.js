/** @flow */
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
    EntryListItem,
} from '../../components';
import styles from './style';

type Props = {
    entries: Object,
    averageMood: number,
    totalEntries: number,
    navigation: Object,
}

type State = {
}

class Home extends PureComponent<Props, State> {
    state: State;
    props: Props;

    static navigationOptions = {
        header: null,
    }

    onCheckInPressed = () => {
        this.props.navigation.navigate( 'add' );
    }

    renderAverageArt = () => {
        return <View style={ styles.chartContainer } />
    }

    renderListItem = ( { item } ) => {
        const {
            day,
            month,
            time,
            mood,
            feelings,
            comment,
        } = item[ 1 ];
        return (
            <EntryListItem
                day={ day }
                month={ month }
                time={ time }
                mood={ mood }
                feelings={ feelings }
                comment={ comment }
            />
        );
    }

    render() {
        const {
            averageMood,
            totalEntries,
            entries,
        } = this.props;
        return (
            <View
                style={ styles.root }
            >
                <View
                    style={ styles.top }
                >
                    <TouchableOpacity
                        style={ styles.ctaContainer }
                        onPress={ this.onCheckInPressed }
                    >
                        <View
                            style={ styles.cta }
                        >
                            <Text
                                style={ styles.ctaText }
                            >
                                Check In
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={ styles.summaryContainer }
                >
                    <View
                        style={ styles.artContainer }
                    >
                        { this.renderAverageArt() }
                    </View>
                    <View
                        style={ styles.textContainer }
                    >
                        <Text
                            style={ styles.averagePercentage }
                            numberOfLines={ 1 }
                        >
                            {Math.round( averageMood * 100 )}%
                        </Text>
                        <Text
                            style={ styles.info }
                            numberOfLines={ 2 }
                        >
                            Based on {totalEntries} {
                                totalEntries > 1 ? 'entries' : 'entry'
                            }.
                        </Text>
                    </View>
                </View>
                <View
                    style={ styles.entriesContainer }
                >
                    <FlatList
                        keyExtractor={ item => item[0] }
                        data={ entries.data }
                        renderItem={ this.renderListItem }
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = ( state: Object ) => {
    const {
        entries,
    } = state;
    let total = 0;
    entries.data.forEach( ( entry ) => {
        total += entry[ 1 ].mood;
    } );

    const average = Math.round( ( ( total / entries.data.length ) / 7 ) * 100 ) / 100 ;

    return {
        entries: state.entries,
        averageMood: average,
        totalEntries: entries.data.length,
    };
}

export default connect( mapStateToProps, {} )( Home );