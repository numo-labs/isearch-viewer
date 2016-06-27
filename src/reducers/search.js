'use strict';

import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  TAG_REMOVE_TAG,
  TAG_ADD_SINGLE_TAG,
  RESET_TAGS,
  TILES_REMOVE_TILE,
  SET_SEARCH_STRING,
  SEARCH_ERROR,
  SET_AUTOCOMPLETE_ERROR,
  SET_AUTOCOMPLETE_OPTIONS,
  SET_AUTOCOMPLETE_IN_SEARCH,
  CLEAR_SEARCH_STRING,
  SAVE_SEARCH_RESULT_ID,
  SAVE_SOCKET_CONNECTION_ID,
  SET_FINGERPRINT,
  SAVE_BUCKET_ID,
  CLEAR_FEED,
  UPDATE_DISPLAYED_ITEMS,
  RECEIVE_RELATED_RESULT,
  SEARCH_COMPLETE
} from '../constants/actionTypes';

import union from 'lodash.union';
import uniqBy from 'lodash.uniqby';

export const initialState = {
  fingerprint: '',
  socketConnectionId: '',
  bucketId: '',
  resultId: '',
  displayedItems: [],
  items: [],
  loading: false,
  error: '',
  searchComplete: false, // set to false until a message is recieved from the web socket channel
  feedEnd: false
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
    case RECEIVE_RELATED_RESULT:
      return {
        ...state,
        relatedItems: state.relatedItems.concat(action.items)
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
    // case TAG_ADD_TAGS:
    //   /*
    //   * use this action if there are an initial set of tags passed
    //   * through when the page is first loaded
    //   */
    //   return {
    //     ...state,
    //     tags: action.tags
    //   };
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
