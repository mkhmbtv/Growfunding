const SET_CATEGORIES = 'categories/SET_CATEGORIES';

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories
  };
};

export const getCategories = () => async (dispatch) => {
  const res = await fetch('/api/categories/');
  if (res.ok) {
    const data = await res.json();
    dispatch(setCategories(data));
  }
};

const initialState = {
  byId: {},
  allIds: [],
};

export default function categoriesReducers (state=initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_CATEGORIES:
      newState = { ...state, byId: { ...action.categories } };
      newState.allIds = Object.keys(newState.byId);
      return newState
    default:
      return state;
  }
};