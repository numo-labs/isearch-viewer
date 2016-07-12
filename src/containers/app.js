// npm
import React, { Component, PropTypes } from 'react';
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
    this.socket = websocketService.initialise(actionCreatorBinder, this.props.tags, this.props.searchOptions);
  }

  componentWilUnmount () {
    if (this.socket) { this.socket.destroy(); }
  }

  render () {
    return (
      <Provider store={store}>
        <ISearch containerStyle={this.props.containerStyle}/>
      </Provider>
    );
  }
}

Root.propTypes = {
  containerStyle: PropTypes.obj,
  searchOptions: React.PropTypes.shape({
    numberOfChildren: PropTypes.number,
    numberOfAdults: PropTypes.number,
    childAges: PropTypes.array,
    departureAirport: PropTypes.string,
    durationWeeks: PropTypes.number
  }),
  tags: PropTypes.array
};
