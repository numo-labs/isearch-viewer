import { connect } from 'react-redux';
import ISearch from '../components/isearch/';
import * as SearchActions from '../actions/search';
function mapStateToProps (state) {
  const {
    search: {
      displayedItems,
      tiles,
      searchString,
      loading,
      error,
      searchComplete,
      feedEnd
    }
  } = state;
  return {
    displayedItems,
    tiles,
    searchString,
    loading,
    error,
    searchComplete,
    feedEnd
  };
}

export default connect(mapStateToProps, SearchActions)(ISearch);
