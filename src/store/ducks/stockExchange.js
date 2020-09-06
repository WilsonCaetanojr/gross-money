export const ActionTypes = {
  SET_VALUES: "user/SET_VALUES",
};

// Reducer
const initialState = {
  high: {},
  low: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_VALUES:
      return { ...state, high: action.payload.high, low: action.payload.low };

    default:
      return state;
  }
}

// Action Creators
export const setValues = (values) => ({
  type: ActionTypes.SET_VALUES,
  payload: values,
});
