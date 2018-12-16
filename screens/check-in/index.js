/** @flow */
import React, { PureComponent } from 'react';
import {
    View,
    Animated,
    Text,
    Slider,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {
    deviceWidth,
} from '../../styles/dimensions';
import {
    FeelingListItem,
} from '../../components';
import styles from './style';

type Props = {
    navigation: Object,
}

type State = {
    screenAnimated: Object,
}

class CheckIn extends PureComponent<Props, State> {
    state: State;
    props: Props;
    mood: number;
    feelings: Array<string>;
    selectedFeelings: Array<string>;

    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();

        this.mood = 4;
        this.feelings = [ 'Happy', 'Optimistic', 'Bored', 'Depressed' ];
        this.selectedFeelings = [];

        this.state = {
            screenAnimated: new Animated.Value( 0 ),
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

    renderCommentsSection = () => {
        return (
            <Animated.View
                style={ [ styles.root, {
                    left: this.state.screenAnimated.interpolate( {
                        inputRange: [ 0.5, 1 ],
                        outputRange: [ deviceWidth, 0 ]
                    } ),
                } ] }
            >
            </Animated.View>
        );
    }

    render() {
        return (
            <View
                style={ styles.screenRoot }
            >
                { this.renderMoodSelector() }
                { this.renderFeelingSelector() }
                { this.renderCommentsSection() }
            </View>
        );
    }
}

export default CheckIn;