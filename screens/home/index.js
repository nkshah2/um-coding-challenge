/** @flow */
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ART,
} from 'react-native';
import { connect } from 'react-redux';
import * as d3 from 'd3'
import {
    EntryListItem,
} from '../../components';
import {
    deviceWidth,
} from '../../styles/dimensions';
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
        const averageMood = Math.round( 7 * this.props.averageMood );
        const ART_DIMEN = deviceWidth * 0.6;

        const data = [
            {
                title: 'positive',
                mood: averageMood,
                color: '#00C5BE',
            },

            {
                title: 'negative',
                mood: 7 - averageMood,
                color: '#757575',
            }
        ];

        const sectionAngles = d3.pie().value( d => d.mood )( data )

        const path = d3.arc()
            .outerRadius( ( ART_DIMEN / 2 ) - 20 )
            .padAngle( .1 )
            .innerRadius( ( ART_DIMEN / 2 ) - 50 )
        return (
            <View
                style={ styles.chartContainer }
            >
                <ART.Surface width={ ART_DIMEN } height={ ART_DIMEN }>
                    <ART.Group x={ ART_DIMEN/2 } y={ ART_DIMEN/2 } >
                        {
                            sectionAngles.map( section => {
                                return (
                                    <ART.Shape
                                        key={ section.index }
                                        d={ path( section ) }
                                        stroke={ section.data.color }
                                        fill={ section.data.color }
                                        strokeWidth={ 1 }
                                        />
                                )
                            } )
                        } 
                    </ART.Group>
                </ART.Surface>
                <View
                    style={ [ styles.smileyContainer, {
                        width: ( ART_DIMEN / 2 ) - 25,
                        height: ( ART_DIMEN / 2 ) - 25,
                    } ] }
                >
                    {
                        // this is where smiley goes
                    }
                </View>
            </View>
        );
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