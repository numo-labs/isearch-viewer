'use strict';

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  TAG_REMOVE_TAG,
  TILES_REMOVE_TILE,
  SET_SEARCH_STRING,
  SEARCH_ERROR,
  CLEAR_SEARCH_STRING,
  SAVE_SEARCH_RESULT_ID,
  SAVE_SOCKET_CONNECTION_ID,
  SET_FINGERPRINT,
  SAVE_BUCKET_ID,
  CLEAR_FEED,
  UPDATE_DISPLAYED_ITEMS,
  SEARCH_COMPLETE,
  TAG_ADD_TAGS
} from '../constants/actionTypes';

import union from 'lodash.union';
import uniqBy from 'lodash.uniqby';
import moment from 'moment';
import departOnFriday from '../utils/departure-day-format';

export const initialState = {
  fingerprint: '',
  socketConnectionId: '',
  bucketId: '',
  resultId: '',
  displayedItems: [],
  items: [],
  tags: [],
  loading: false,
  error: '',
  searchComplete: false, // set to false until a message is recieved from the web socket channel
  feedEnd: false,
  numberOfChildren: '0',
  numberOfAdults: '2',
  childAge1: '2 Barns alder',
  childAge2: '4 Barns alder',
  childAge3: '0 Barns alder',
  childAge4: '0 Barns alder',
  departureAirport: 'Copenhagen - CPH',
  duration: '1 uge',
  departureDate: departOnFriday(moment().add(3, 'months')).format('YYYY-MM-DD'),
  passengerBirthdays: [],
};

export default function search (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULT:
      const itemsToDisplay = uniqBy(union(state.items, action.items), (a) => {
        if (a.packageOffer) {
          return a.packageOffer.provider.reference;
        } else {
          return a.id;
        }
      });
      const display = state.displayedItems.length < 30 ? itemsToDisplay.slice(0, 30) : state.displayedItems;
      return {
        ...state,
        items: itemsToDisplay,
        displayedItems: display,
        loading: false,
        error: ''
      };
    case UPDATE_DISPLAYED_ITEMS:
      return {
        ...state,
        displayedItems: action.items,
        scrollPage: state.scrollPage + 1,
        feedEnd: action.items.length >= state.items.length
      };
    case BUSY_SEARCHING:
      return {
        ...state,
        loading: action.isBusy,
        searchComplete: false
      };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SEARCH_COMPLETE:
      return {
        ...state,
        searchComplete: true,
        loading: false,
        displayedItems: state.displayedItems.length === 0 ? state.relatedItems : state.displayedItems
      };
    case TAG_ADD_TAGS:
      return {
        ...state,
        tags: action.tags
      };
    case SAVE_SEARCH_RESULT_ID:
      return {
        ...state,
        resultId: action.id
      };
    case SAVE_BUCKET_ID:
      return {
        ...state,
        bucketId: action.id
      };
    case SAVE_SOCKET_CONNECTION_ID:
      return {
        ...state,
        socketConnectionId: action.id
      };
    case SET_FINGERPRINT:
      return {
        ...state,
        fingerprint: action.fingerprint
      };
    case CLEAR_FEED:
      return {
        ...state,
        displayedItems: [],
        items: [],
        relatedItems: [],
        scrollPage: 6,
        feedEnd: false
      };
    case TILES_REMOVE_TILE:
      const iterator = item => {
        return item.id !== action.id;
      };
      const displayed = state.displayedItems.filter(iterator);
      const backlog = state.items.filter(iterator);
      return {
        ...state,
        displayedItems: displayed,
        items: backlog
      };
    default:
      return state;
  }
}
