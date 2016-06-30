import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';

require('./normalise.css');

const rootElement = document.getElementById('container');

class Example extends Component {
  render () {
    return (
      <div>
        <p className='title'>MY TRAVEL BLOG</p>
        <App
          containerStyle={'app-container'}
          searchOptions={{
            numberOfChildren: 2,
            numberOfAdults: 2,
            childAges: [2, 4],
            departureAirport: 'Copenhagen - CPH',
            durationWeeks: 1
          }}
          tags={['marketing:homepage.dk.spies']}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Example/>,
  rootElement
);
