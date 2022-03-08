const ADD_ONE_FUNDRAISER = 'fundraisers/ADD_ONE_FUNDRAISER';
const SET_CATEGORIES = 'fundraisers/SET_CATEGORIES';
const SET_FUNDRAISERS = 'fundraisers/SET_FUNDRAISERS';

const setFundraisers = (fundraisers) => {
  return {
    type: SET_FUNDRAISERS,
    fundraisers
  };
};

const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    categories
  };
};

const addOneFundraiser = (fundraiser) => {
  return {
    type: ADD_ONE_FUNDRAISER,
    fundraiser
  }
};

export const getCategories = () => async (dispatch) => {
  const res = await fetch('/api/categories');
  if (res.ok) {
    const data = await res.json();
    dispatch(setCategories(data.categories))
  }
};

export const getFundraisers = () => async (dispatch) => {
  const res = await fetch('/api/fundraisers');
  if (res.ok) {
    const data = await res.json();
    dispatch(setFundraisers(data.fundraisers));
  }
};

export const getOneFundraiser = (id) => async (dispatch) => {
  const res = await fetch(`/api/fundraisers/${id}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(addOneFundraiser(data));
  }
};

export const createFundraiser = (fundraiser) => async (dispatch) => {
  const {
    userId,
    categoryId,
    name,
    city,
    state,
    description,
    image,
    goalAmount,
  } = fundraiser;

  const form = new FormData();
  form.append('user_id', userId);
  form.append('category_id', categoryId);
  form.append('name', name);
  form.append('city', city);
  form.append('state', state);
  form.append('description', description);
  form.append('image', image);
  form.append('goal_amount', goalAmount);

  const res = await fetch('/api/fundraisers/', {
    method: 'POST',
    body: form
  });

  if (res.ok) {
    const data = await res.json()
    dispatch(addOneFundraiser(data));
    return null;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
  
};

export const donate = (donation) => async (dispatch) => {
  const {
    userId,
    fundraiserId,
    amount,
    comment,
    anonymous,
  } = donation;

  const form = new FormData();
  form.append('user_id', userId);
  form.append('fundraiser_id', fundraiserId);
  form.append('amount', amount);
  form.append('comment', comment);
  form.append('anonymous', anonymous);

  const res = await fetch('/api/donations/', {
    method: 'POST',
    body: form,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addOneFundraiser(data));
    return null;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

const initialState = {
  byId: {},
  allIds: [],
  categories: [],
};

export default function reducer (state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_FUNDRAISERS:
      newState = { ...state };
      action.fundraisers.forEach(fundraiser => {
        newState.byId[fundraiser.id] = fundraiser;
      });
      newState.allIds = Object.keys(newState.byId);
      return newState;
    case ADD_ONE_FUNDRAISER:
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [action.fundraiser.id]: action.fundraiser,
        },
      };
      newState.allIds = Object.keys(newState.byId);
      return newState;
    case SET_CATEGORIES:
      newState = {
        ...state,
        categories: action.categories,
      };
      return newState;
    default:
      return state;
  }
};