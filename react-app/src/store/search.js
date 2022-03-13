const SET_SEARCH = 'search/SET_SEARCH';

const setSearch = (results) => {
  return {
    type: SET_SEARCH,
    results
  };
};

export const getQueryResults = (query) => async (dispatch) => {
  const res = await fetch(`/api/fundraisers/search?${query}`);
  const data = await res.json();
  dispatch(setSearch(data.fundraisers));
  return data.fundraisers;
};

const initialState = { results: [] }

export default function searchReducer (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return { results: [ ...action.results ] };
    default:
      return state;
  }
};