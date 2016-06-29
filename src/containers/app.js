// npm
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
// components
import ISearch from './isearch.js';

// store
import configureStore from '../store/configure-store.js';
const store = configureStore();

// web socket service
import * as websocketService from '../services/websockets.js';

const actionCreatorBinder = actions => bindActionCreators(actions, store.dispatch);

export default class Root extends Component {

  componentWillMount () {
    this.socket = websocketService.initialise(actionCreatorBinder, this.props.tags);
  }

  componentWilUnmount () {
    if (this.socket) { this.socket.destroy(); }
  }

  render () {
    return (
      <Provider store={store}>
        <ISearch/>
      </Provider>
    );
  }
}
