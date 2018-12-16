/** @flow */
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    NativeModules,
    Animated,
    FlatList,
    Image,
} from 'react-native';
import {
    DownArrow,
    UnhappyFace,
    HappyFace,
    MehFace,
} from '../../images';
import styles from './style';

type Props = {
    day: number | string,
    month: string,
    time: string,
    mood: number,
    feelings: string,
    comment: string,
}

type State = {
    isExpanded: boolean,
    arrowAnimated: Object,
}

const { UIManager } = NativeModules;

const CUSTOM_LAYOUT_ANIMATION = {
    create: {
        duration: 100,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeInEaseOut,
    },

    delete: {
        duration: 200,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeInEaseOut,
    },

    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
    },

    duration: 300,
};

class EntryItem extends PureComponent<Props, State> {
    state: State;
    props: Props;

    constructor() {
        super();

        UIManager.setLayoutAnimationEnabledExperimental( true );

        this.state = {
            isExpanded: false,
            arrowAnimated: new Animated.Value( 0 ),
        }
    }

    onArrowTouch = () => {
        LayoutAnimation.configureNext( CUSTOM_LAYOUT_ANIMATION );

        if ( !this.state.isExpanded ) {
            Animated.timing( this.state.arrowAnimated, {
                toValue: 1,
                duration: 200,
                useNativeDrivers: true,
            } ).start();
        } else {
            Animated.timing( this.state.arrowAnimated, {
                toValue: 0,
                duration: 200,
                useNativeDrivers: true,
            } ).start();
        }

        this.setState( {
            isExpanded: !this.state.isExpanded,
        } );
    }

    renderFeeling = ( { item }: Object ) => {
        return (
            <View
                style={ styles.feelingContainer }
            >
                <Text
                    style={ styles.feeling }
                >
                    {item}
                </Text>
            </View>
        );
    }

    renderFeelings = () => {
        const feelingsArray = this.props.feelings.split( '|' );
        return (
            <FlatList
                data={ feelingsArray }
                keyExtractor={ item => item }
                renderItem={ this.renderFeeling }
                horizontal
            />
        );
    }

    getFace = () => {
        if ( this.props.mood === 4 ) {
            return MehFace;
        } else if ( this.props.mood < 4 ) {
            return UnhappyFace;
        } else {
            return HappyFace;
        }
    }

    render() {
        const {
            day,
            month,
            time,
            comment,
        } = this.props;
        return (
            <View
                style={ styles.root }
                onTouchEnd={ this.onArrowTouch }
            >
                <View
                    style={ styles.top }
                >
                    <View
                        style={ styles.halfContainer }
                    >
                        <View
                            style={ styles.dateContainer }
                        >
                            <Text
                                style={ styles.day }
                            >
                                {day}
                            </Text>
                            <Text
                                style={ styles.month }
                            >
                                {month}
                            </Text>
                        </View>
                        <View
                            style={ styles.timeContainer }
                        >
                            <Text
                                style={ styles.time }
                            >
                                {time}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={ styles.halfContainer }
                    >
                        <View
                            style={ styles.moodContainer }
                        >
                            <Image
                                style={ styles.face }
                                resizeMode={ 'stretch' }
                                source={ this.getFace() }
                            />
                        </View>
                        <Animated.Image
                            resizeMode={ 'stretch' }
                            style={ [ styles.image, {
                                transform: [
                                    {
                                        rotate: this.state.arrowAnimated.interpolate( {
                                            inputRange: [ 0, 1 ],
                                            outputRange: [ '0deg', '180deg' ],
                                        } ),
                                    }
                                ]
                            } ] }
                            source={ DownArrow }
                        />
                    </View>
                </View>
                {
                    this.state.isExpanded &&
                        <View
                            style={ styles.bottom }
                        >
                            { this.renderFeelings() }
                            <Text
                                style={ styles.comment }
                            >
                                {comment}
                            </Text>
                        </View>
                }
            </View>
        );
    }
}

export default EntryItem;