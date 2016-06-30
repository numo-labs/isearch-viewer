import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';

require('./normalise.css');

const rootElement = document.getElementById('container');

class Example extends Component {
  render () {
    return (
      <div>
        <p className='title'>MY TRAVEL BLOG </p>
        <div className='app-container'>
          <App tags={['marketing:homepage.dk.spies']}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Example/>,
  rootElement
);
