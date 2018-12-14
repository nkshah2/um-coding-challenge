/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {PureComponent} from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import AppNavigator from './navigation';
import { buildStyleSheet } from './styles/create-style-sheet';

const store = createStore( reducers, {}, applyMiddleware() );

export default class App extends PureComponent<{}, {}> {
  
  constructor() {
    super();
    buildStyleSheet();
  }

  render() {
    return (
      <Provider store={ store }>
        <AppNavigator/>
      </Provider>
    );
  }

}

