/** @flow */
import React, { PureComponent } from 'react';
import {
    View,
    Animated,
    Text,
    Slider,
    TouchableOpacity,
    FlatList,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import saveEntries from '../../actions/save-entries';
import {
    deviceWidth,
} from '../../styles/dimensions';
import {
    FeelingListItem,
} from '../../components';
import {
    saveEntry,
    fetchEntries,
} from '../../api';
import styles from './style';

type Props = {
    navigation: Object,
    saveEntries: ( Array<[string, mixed]> ) => void,
}

type State = {
    screenAnimated: Object,
    isLoading: boolean,
}

const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

class CheckIn extends PureComponent<Props, State> {
    state: State;
    props: Props;
    mood: number;
    feelings: Array<string>;
    selectedFeelings: Array<string>;
    inputRef: Object;
    comment: string;

    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();

        this.mood = 4;
        this.feelings = [ 'Happy', 'Optimistic', 'Bored', 'Depressed' ];
        this.selectedFeelings = [];
        this.comment = '';

        this.state = {
            screenAnimated: new Animated.Value( 0 ),
            isLoading: false,
        }
    }

    onNextPressed = () => {
        Animated.timing( this.state.screenAnimated, {
            toValue: 0.5,
            duration: 300,
            useNativeDrivers: true,
        } ).start();
    }

    onCancelPressed = () => {
        this.props.navigation.navigate( 'home' );
    }

    onSliderValueChanged = ( value: number ) => {
        this.mood = value;
    }

    renderMoodSelector = () => {
        return (
            <Animated.View
                style={ [ styles.root, {
                    right: this.state.screenAnimated.interpolate( {
                        inputRange: [ 0, 0.5 ],
                        outputRange: [ 0, deviceWidth ]
                    } ),
                } ] }
            >
                <View
                    style={ styles.titleContainer }
                >
                    <Text
                        style={ styles.title }
                    >
                        How do you feel?
                    </Text>
                </View>
                <View
                    style={ styles.moodSelector }
                >
                    <View
                        style={ styles.moodContainer }
                    >
                    </View>

                    <Slider
                        style={ [ styles.slider, {
                            transform: [
                                {
                                    scale: 3,
                                },
                            ],
                        } ] }
                        step={ 1 }
                        maximumValue={ 7 }
                        minimumValue={ 1 }
                        value={ 4 }
                        minimumTrackTintColor={ '#A3A3A3' }
                        maximumTrackTintColor={ '#A3A3A3' }
                        thumbTintColor={ '#fff' }
                        onValueChange={ this.onSliderValueChanged }
                    />

                    <View
                        style={ styles.ctaContainer }
                    >
                        <TouchableOpacity
                            onPress={ this.onCancelPressed }
                        >
                            <View
                                style={ styles.cta }
                            >
                                <Text
                                    style={ styles.ctaText }
                                >
                                    Cancel
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={ this.onNextPressed }
                        >
                            <View
                                style={ styles.cta }
                            >
                                <Text
                                    style={ styles.ctaText }
                                >
                                    Next
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    }

    onFeelingSelected = ( feeling: string, isAdded: boolean ) => {
        if ( isAdded ) {
            this.selectedFeelings.push( feeling );
        } else {
            this.selectedFeelings = this.selectedFeelings.filter( ( feel ) => feel !== feeling );
        }
    }

    renderFeeling = ( { item } : Object ) => {
        return (
            <FeelingListItem
                text={ item }
                onSelected={ this.onFeelingSelected }
            />
        );
    }

    goBackToMoodSelector = () => {
        Animated.timing( this.state.screenAnimated, {
            toValue: 0,
            duration: 300,
            useNativeDrivers: true,
        } ).start();
    }

    goToComment = () => {
        Animated.timing( this.state.screenAnimated, {
            toValue: 1,
            duration: 300,
            useNativeDrivers: true,
        } ).start();
    }

    renderFeelingSelector = () => {
        return (
            <Animated.View
                style={ [ styles.root, {
                    right: this.state.screenAnimated.interpolate( {
                        inputRange: [ 0.5, 1 ],
                        outputRange: [ 0, deviceWidth ]
                    } ),
                } ] }
            >
                <View
                    style={ styles.titleContainer }
                >
                    <Text
                        style={ styles.title }
                    >
                        Pick one or more
                    </Text>
                </View>
                <View
                    style={ styles.feelingSelector }
                >
                    <View
                        style={ {
                            flex: 1
                        } }
                    >
                        <FlatList
                            data={ this.feelings }
                            keyExtractor={ item => item }
                            renderItem={ this.renderFeeling }
                        />
                    </View>
                    <View
                        style={ [ styles.ctaContainer, {
                            marginBottom: 32,
                        } ] }
                    >
                        <TouchableOpacity
                            onPress={ this.goBackToMoodSelector }
                        >
                            <View
                                style={ styles.cta }
                            >
                                <Text
                                    style={ styles.ctaText }
                                >
                                    Previous
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={ this.goToComment }
                        >
                            <View
                                style={ styles.cta }
                            >
                                <Text
                                    style={ styles.ctaText }
                                >
                                    Next
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    }

    goBackToFeelingSelector = () => {
        Animated.timing( this.state.screenAnimated, {
            toValue: 0.5,
            duration: 300,
            useNativeDrivers: true,
        } ).start();
        this.inputRef.blur();
    }

    submitData = () => {
        this.inputRef.blur();
        this.setState( {
            isLoading: true,
        }, () => {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            const month = months[ date.getMonth() ];
            const day = `${date.getDate()}`;
            const timestamp = date.toUTCString();

            if ( `${hours}`.length < 2 ) {
                hours = `0${hours}`;
            }

            if ( `${minutes}`.length < 2 ) {
                minutes = `0${minutes}`;
            }

            saveEntry( timestamp, day, month, `${hours}:${minutes}`,
                this.mood, this.selectedFeelings.join( '|' ), this.comment )
                .then( () => {
                    fetchEntries()
                        .then( data => {
                            this.props.saveEntries( data );
                            this.props.navigation.navigate( 'home' );
                        } );
                } )
                .catch( () => {
                    this.props.navigation.navigate( 'home' );
                } );
        } );
    }

    onCommentTextChanged = ( text: string ) => {
        this.comment = text;
    }

    renderCommentsSection = () => {
        return (
            <Animated.View
                style={ [ styles.root, styles.commentContainer, {
                    left: this.state.screenAnimated.interpolate( {
                        inputRange: [ 0.5, 1 ],
                        outputRange: [ deviceWidth, 0 ]
                    } ),
                } ] }
            >
                <TextInput
                    underlineColorAndroid={ 'transparent' }
                    multiline
                    autoCapitalize={ 'sentences' }
                    onChangeText={ this.onCommentTextChanged }
                    style={ styles.input }
                    placeholder={ 'Tell us more (optional)' }
                    ref={ ( ref ) => {
                        if ( ref ) {
                            this.inputRef = ref;
                        }
                    } }
                />
                
                <View
                        style={ [ styles.ctaContainer, {
                            marginBottom: 32,
                        } ] }
                    >
                        <TouchableOpacity
                            onPress={ this.goBackToFeelingSelector }
                        >
                            <View
                                style={ styles.cta }
                            >
                                <Text
                                    style={ styles.ctaText }
                                >
                                    Previous
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={ this.submitData }
                        >
                            <View
                                style={ styles.cta }
                            >
                                <Text
                                    style={ styles.ctaText }
                                >
                                    Finish
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                
            </Animated.View>
        );
    }

    render() {
        return (
            <View
                style={ styles.screenRoot }
            >
                { !this.state.isLoading && this.renderMoodSelector() }
                { !this.state.isLoading && this.renderFeelingSelector() }
                { !this.state.isLoading && this.renderCommentsSection() }
                {
                    this.state.isLoading ?
                    <ActivityIndicator
                        size={ 'large' }
                        color={ '#00C5BE' }
                    />
                    :
                    null
                }
            </View>
        );
    }
}

export default connect( null, {
    saveEntries,
} )( CheckIn );