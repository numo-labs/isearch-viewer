import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';

require('./normalise.css');

const rootElement = document.getElementById('container');

ReactDOM.render(
  <App tags={['geo:geonames.2510769']}/>,
  rootElement
);
