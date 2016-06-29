import * as SearchResultActions from '../actions/search';
import Primus from '../../src/services/primus.js';
import configuration from '../../config';
import configure from 'con.figure';

const config = configure(configuration);

/**
* Function that initialises a connection with the web socket server and saves
* the id to the redux store
* It also initialises the event listeners for data, reconnected and error events
* transmitted from the web socket channel
* @param {Function} - actionCreatorBinder - function that takes an action
* and binds it to dispatch
*/

export function initialise (actionCreatorBinder, tags) {
  const primus = new Primus(config.socketUrl);
  const {
    saveSearchResult,
    saveSocketConnectionId,
    setSearchComplete,
    addTags,
    startSearch
  } = actionCreatorBinder(SearchResultActions);
  primus.on('data', function received (data) {
    // console.log('incoming socket data', data);
    if (data.graphql) {
      if (data.graphql.searchComplete) { // event sent by the package provider when all packages have been sent
        setSearchComplete(data);
      } else if (data.graphql.items.length > 0) {
        saveSearchResult(data);
      }
    }
  });

  primus.once('open', (data) => {
    primus.id((id) => {
      saveSocketConnectionId(id);
      addTags(tags.map(tag =>  { return {id: tag}}));
      startSearch();
      join(id);
      primus.on('reconnected', () => { join(id); });
    });
  });

  primus.on('error', function error (err) {
    console.error('Something horrible has happened', err.stack);
  });

  function join (room) {
    primus.write({
      action: 'join',
      room: room
    });
  }

  return primus;
}
