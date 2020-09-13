export const ActionTypes = {
  SET_VALUES: "user/SET_VALUES",
  ADD_FAVORITES: "user/ADD_FAVORITES",
  REMOVE_FAVORITES: "user/REMOVE_FAVORITES",
};

// Reducer
const initialState = {
  high: {},
  low: {},
  favorites: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_VALUES: {
      return { ...state, high: action.payload.high, low: action.payload.low };
    }

    case ActionTypes.ADD_FAVORITES: {
      const favorites = { ...state.favorites };
      
      if (!state.favorites[action.payload.userName]) {
        favorites[action.payload.userName] = [];
        favorites[action.payload.userName].push(action.payload.dataAction);
      } else {
        const findAction = favorites[action.payload.userName].find(
          (fav) => fav.symbol === action.payload.dataAction.symbol
        );
        if (!findAction) {
          favorites[action.payload.userName].push(action.payload.dataAction);
        }
      }

      return { ...state, favorites };
    }

    case ActionTypes.REMOVE_FAVORITES: {
      const favorites = { ...state.favorites };
      const favoriteUser = favorites[action.payload.userName].findIndex(
        (fav) => fav.symbol === action.payload.symbol
      );
      if (favoriteUser === -1) return state;

      favorites[action.payload.userName].splice(favoriteUser, 1);
      return { ...state, favorites };
    }
    default:
      return state;
  }
}

// Action Creators
export const setValues = (values) => ({
  type: ActionTypes.SET_VALUES,
  payload: values,
});

export const addFavorites = (userName, dataAction) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: { userName, dataAction },
});

export const removeFavorites = (userName, symbol) => ({
  type: ActionTypes.REMOVE_FAVORITES,
  payload: { userName, symbol },
});
