const ADD_ONE_FUNDRAISER = 'fundraisers/ADD_ONE_FUNDRAISER';
const SET_CATEGORIES = 'fundraisers/SET_CATEGORIES';
const SET_FUNDRAISERS = 'fundraisers/SET_FUNDRAISERS';
const REMOVE_ONE_FUNDRAISER = 'fundraisers/REMOVE_ONE_FUNDRAISER';
const SET_ORDER = 'fundraisers/SET_ORDER';

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

const setOrder = (list) => {
  return {
    type: SET_ORDER,
    list
  };
};

const addOneFundraiser = (fundraiser) => {
  return {
    type: ADD_ONE_FUNDRAISER,
    fundraiser
  };
};

const removeOneFundraiser = (id) => {
  return {
    type: REMOVE_ONE_FUNDRAISER,
    id
  };
};

export const getCategories = () => async (dispatch) => {
  const res = await fetch('/api/categories/');
  if (res.ok) {
    const data = await res.json();
    dispatch(setCategories(data.categories))
  }
};

export const getFundraisers = () => async (dispatch) => {
  const res = await fetch('/api/fundraisers/');
  if (res.ok) {
    const data = await res.json();
    dispatch(setFundraisers(data));
  }
};

export const getFundraisersByCategory = (category) => async (dispatch) => {
  const res = await fetch(`/api/fundraisers/${category}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setFundraisers(data));
    return data;
  }
};

export const getOneFundraiser = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/fundraisers/${id}`);
    const data = await res.json();
    dispatch(addOneFundraiser(data));
    return data;
  } catch (err) {
    return err;
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

  try {
    const res = await fetch('/api/fundraisers/', {
      method: 'POST',
      body: form
    });
    const data = await res.json()
    dispatch(addOneFundraiser(data));
    return data;
  } catch (err) {
    return err;
  }
  
};

export const editFundraiser = (fundraiser) => async (dispatch) => {
  const {
    id,
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

  try {
    const res = await fetch(`/api/fundraisers/${id}`, {
      method: 'PUT',
      body: form
    });
    const data = await res.json();
    dispatch(addOneFundraiser(data));
    return data;
  } catch (err) {
    return err;
  }
};

export const deleteFundraiser = (id) => async (dispatch) => {
  const res = await fetch(`/api/fundraisers/${id}`, { method: 'DELETE' });
  if (res.ok) dispatch(removeOneFundraiser(id));
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

  try {
    const res = await fetch('/api/donations/', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    dispatch(addOneFundraiser(data));
    return data;
  } catch (err) {
    return err;
  }
};

export const changeDonation = (donation) => async (dispatch) => {
  const {
    id,
    user_id,
    fundraiser_id,
    amount,
    comment,
    anonymous,
  } = donation;

  const form = new FormData();
  form.append('user_id', user_id);
  form.append('fundraiser_id', fundraiser_id);
  form.append('amount', amount);
  form.append('comment', comment);
  form.append('anonymous', anonymous);

  try {
    const res = await fetch(`/api/donations/${id}`, {
      method: 'PUT',
      body: form,
    });
    
    const data = await res.json();
    dispatch(addOneFundraiser(data));
    return data;
  } catch (err) {
    return err;
  }
};

export const cancelDonation = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/donations/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    dispatch(addOneFundraiser(data))
  } catch (err) {
    return err;
  }
} 

export const getFundraisersOrder = () => async (dispatch) => {
  const res = await fetch('/api/fundraisers/top');
  if (res.ok) {
    const data = await res.json();
    dispatch(setOrder(data));
    return data;
  }
};

const initialState = {
  byId: {},
  order: [],
  categories: [],
};

export default function reducer (state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_FUNDRAISERS:
      newState = { ...state, byId: { ...state.byId, ...action.fundraisers } };
      return newState;
    case ADD_ONE_FUNDRAISER:
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [action.fundraiser.id]: action.fundraiser,
        },
      };
      return newState;
    case REMOVE_ONE_FUNDRAISER:
      newState = { ...state };
      delete newState.byId[action.id];
      return newState;
    case SET_ORDER:
      newState = {
        ...state,
        order: action.list
      };
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