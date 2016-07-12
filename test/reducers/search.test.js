import {
  RECEIVE_SEARCH_RESULT,
  BUSY_SEARCHING,
  RESET_TAGS,
  SEARCH_ERROR,
  SAVE_SOCKET_CONNECTION_ID,
  SET_FINGERPRINT,
  SAVE_SEARCH_RESULT_ID,
  SAVE_BUCKET_ID,
  UPDATE_DISPLAYED_ITEMS,
  CLEAR_FEED,
  SEARCH_COMPLETE
} from '../../src/constants/actionTypes';

import { expect } from 'chai';
import reducer, { initialState } from '../../src/reducers/search';
import mockResults from '../../src/utils/mock-search-results.json';

const mockItems = [mockResults.items[0]]; // an array with one packageOffer

describe('Search Reducer', () => {
  it('should return the initial state', (done) => {
    const state = reducer(undefined, {});
    expect(state).to.deep.equal(initialState);
    done();
  });
  it('SET_FINGERPRINT: should save the fingerprint', done => {
    const action = {type: SET_FINGERPRINT, fingerprint: '123456789012345'};
    const state = reducer(undefined, action);
    const expectedState = {
      ...initialState,
      fingerprint: action.fingerprint
    };
    expect(state).to.deep.equal(expectedState);
    done();
  });
  describe('Search actions', () => {
    it(`RECEIVE_SEARCH_RESULT:-> adds items from action to the items
        state and if the number of displayedItems is less than 5 will
        set it to the first 5 elements of items. Also sets loading to false`, (done) => {
      const action = {type: RECEIVE_SEARCH_RESULT, items: mockItems};
      const state = reducer(undefined, action);
      const items = mockItems;
      const expectedState = {
        ...initialState,
        items,
        displayedItems: items.slice(0, 5),
        loading: false
      };
      expect(state).to.deep.equal(expectedState);
      expect(state.loading).to.be.false;
      done();
    });
    it(`RECEIVE_SEARCH_RESULT-> sets displayedItems to the existing state if
      it has length greater than 5`, (done) => {
      const initialStateWithItems = {
        ...initialState,
        items: mockItems,
        displayedItems: mockItems
      };
      const action = {
        type: RECEIVE_SEARCH_RESULT,
        items: mockItems
      };
      const state = reducer(initialStateWithItems, action);
      expect(state.loading).to.be.false;
      expect(state.items).to.deep.equal(mockItems);
      expect(state.displayedItems).to.deep.equal(mockItems);
      done();
    });
    it(`UPDATE_DISPLAYED_ITEMS: -> adds items from action to the displayedItems
        state`, (done) => {
      const action = {type: UPDATE_DISPLAYED_ITEMS, items: mockItems};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        displayedItems: mockItems,
        scrollPage: 7,
        feedEnd: true
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`UPDATE_DISPLAYED_ITEMS: -> adds items from action to the displayedItems
      state and sets feedEnd to false if action.items.length < items.length`, (done) => {
      const action = {type: UPDATE_DISPLAYED_ITEMS, items: mockItems};
      const state = reducer({...initialState, items: mockItems.concat(mockItems)}, action);
      const expectedState = {
        ...initialState,
        displayedItems: mockItems,
        scrollPage: 7,
        feedEnd: false,
        items: mockItems.concat(mockItems)
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`CLEAR_FEED: -> sets the items and displayedItems to empty
        state`, (done) => {
      const action = {type: CLEAR_FEED};
      const state = reducer(undefined, action);
      expect(state).to.deep.equal(initialState);
      done();
    });
    it('BUSY_SEARCHING -> sets loading to true', (done) => {
      const action = {type: BUSY_SEARCHING, isBusy: true};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        loading: true
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`SEARCH_ERROR: sets loading to false and sets the error state to
        action.error`, (done) => {
      const action = {type: SEARCH_ERROR, error: 'error'};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        loading: false,
        error: 'error'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('SAVE_SEARCH_RESULT_ID -> saves the search result id', (done) => {
      const action = {type: SAVE_SEARCH_RESULT_ID, id: '12345'};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        resultId: '12345'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it('SAVE_BUCKET_ID -> saves the buckeId', (done) => {
      const action = {type: SAVE_BUCKET_ID, id: '12345'};
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        bucketId: '12345'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`SEARCH_COMPLETE -> marks searchComplete as true and loading as false. If
      the displayedItems is zero then marks feedEnd as true (end of search Items)
      and sets the displayedItems to the relatedItems from the state`, (done) => {
      const action = {type: SEARCH_COMPLETE};
      const state = reducer({ ...initialState, relatedItems: mockItems }, action);
      const expectedState = {
        ...initialState,
        relatedItems: mockItems,
        displayedItems: mockItems,
        searchComplete: true,
        loading: false,
        feedEnd: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
    it(`SEARCH_COMPLETE -> marks searchComplete as true and loading as false. If
      the displayedItems is greater than zero then doesn't update displayedItems
      or feedEnd`, (done) => {
      const action = {type: SEARCH_COMPLETE};
      const state = reducer({...initialState, displayedItems: mockItems}, action);
      const expectedState = {
        ...initialState,
        displayedItems: mockItems,
        searchComplete: true,
        loading: false
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
  describe('Tag and Tile actions', () => {
    it('RESET_TAGS -> sets tags array to action.tags', (done) => {
      const initialStateWithTags = {
        ...initialState,
        tags: [{ displayName: 'hello' }],
        isInitialTag: false
      };
      const action = {type: RESET_TAGS, tags: [{displayName: 'test', id: 'id'}]};
      const state = reducer(initialStateWithTags, action);
      const expectedState = {
        ...initialState,
        tags: [initialState.defaultTag],
        isInitialTag: true
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
  describe('Web socket connection id save action', () => {
    it(`SAVE_SOCKET_CONNECTION_ID -> saves action.id as socketConnectionId`, (done) => {
      const action = { type: SAVE_SOCKET_CONNECTION_ID, id: '12345' };
      const state = reducer(undefined, action);
      const expectedState = {
        ...initialState,
        socketConnectionId: '12345'
      };
      expect(state).to.deep.equal(expectedState);
      done();
    });
  });
});
