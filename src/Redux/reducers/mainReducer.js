const initialState = {
  name: "Emmanuel Nwanochie",
  user: [],
  bills: [],

  // all loading states
  isLoading: false,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    case "BILLS":
      return {
        ...state,
        bills: action.payload,
      };
    case "NOTLOADING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
