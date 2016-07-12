import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';

require('./styles.css');

const rootElement = document.getElementById('container');

class Example extends Component {
  render () {
    return (
      <div>
        <p className='headerTitle'>MY AMAZING TRAVEL BLOG</p>
        <div className='post'>
          <p className='title'>A BLOG POST ABOUT SPAIN</p>
          <p className='content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <App
          containerStyle={'app-container'}
          searchOptions={{
            numberOfChildren: 2,
            numberOfAdults: 2,
            childAges: [2, 4],
            departureAirport: 'Copenhagen - CPH',
            durationWeeks: 1
          }}
          tags={['geo:geonames.2510769']}
        />
        <div className='post'>
          <p className='title'>ANOTHER BLOG POST ABOUT SPAIN</p>
          <p className='content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Example/>,
  rootElement
);
