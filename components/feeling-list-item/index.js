/** @flow */
import React, { PureComponent } from 'react';
import {
    Animated,
} from 'react-native';
import styles from './style';

type Props = {
    text: string,
    onSelected: ( string, boolean ) => void,
}

type State = {
    backgroundAnimated: Object,
}

class FeelingItem extends PureComponent<Props, State> {
    state: State;
    props: Props;

    constructor() {
        super();

        this.state = {
            backgroundAnimated: new Animated.Value( 0 ),
        }
    }

    onSelected = () => {
        if ( this.state.backgroundAnimated._value === 0 ) {
            Animated.timing( this.state.backgroundAnimated, {
                toValue: 1,
                duration: 200,
                useNativeDrivers: true,
            } ).start( () => {
                this.props.onSelected( this.props.text, true );
            } );
        } else if ( this.state.backgroundAnimated._value === 1 ) {
            Animated.timing( this.state.backgroundAnimated, {
                toValue: 0,
                duration: 200,
                useNativeDrivers: true,
            } ).start( () => {
                this.props.onSelected( this.props.text, false );
            } );
        }
    }

    render() {
        return (
            <Animated.View
                style={ [ styles.root, {
                    backgroundColor: this.state.backgroundAnimated.interpolate( {
                        inputRange: [ 0, 1 ],
                        outputRange: [ '#fff', '#CCFF90' ]
                    } ),
                } ] }
                onTouchEnd={ this.onSelected }
            >
                <Animated.Text
                    style={ [ styles.text, {
                        color: this.state.backgroundAnimated.interpolate( {
                            inputRange: [ 0, 1 ],
                            outputRange: [ '#000', '#fff' ]
                        } ),
                    } ] }
                >
                    {this.props.text}
                </Animated.Text>
            </Animated.View>
        );
    }
}

export default FeelingItem;