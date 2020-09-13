export const ActionTypes = {
  ADD_LOGIN: "user/ADD_LOGIN",
  SET_CURRENT: "user/SET_CURRENT",
};

// Reducer
const initialState = {
  userCurrent: {},
  users: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_LOGIN:
      if (state.users.length > 0) {
        return {
          ...state,
          users: [...state.users, action.payload],
          userCurrent: action.payload,
        };
      } else {
        return {
          ...state,
          users: [action.payload],
          userCurrent: action.payload,
        };
      }

    case ActionTypes.SET_CURRENT:
      return { ...state, userCurrent: action.payload };
    default:
      return state;
  }
}

// Action Creators
export const addUser = (user) => ({
  type: ActionTypes.ADD_LOGIN,
  payload: user,
});

export const setUserCurrent = (current) => ({
  type: ActionTypes.SET_CURRENT,
  payload: current,
});
