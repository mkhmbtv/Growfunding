const ADD_ONE_FUNDRAISER = 'fundraisers/ADD_ONE_FUNDRAISER';

const addOneFundraiser = (fundraiser) => {
  return {
    type: ADD_ONE_FUNDRAISER,
    fundraiser
  }
}

export const createFundraiser = (fundraiser) => async (dispatch) => {
  const {
    userId,
    name,
    city,
    state,
    description,
    image,
    goalAmount,
  } = fundraiser;

  const form = new FormData();
  form.append('user_id', userId);
  form.append('name', name);
  form.append('city', city);
  form.append('state', state);
  form.append('description', description);
  form.append('image', image);
  form.append('goal_amount', goalAmount);

  const res = await fetch('/api/fundraisers', {
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

const initialState = {
  byId: {},
  allIds: []
};

export default function reducer (state = initialState, action) {
  let newState = {};
  switch (action.type) {
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
    default:
      return state;
  }
};