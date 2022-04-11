import * as actionType from '../constants/actionTypes';

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      console.log(action?.data)
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));// first added in navbar.js

      return { ...state, authData: action?.data };
      // , loading: false, errors: null
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

// export default authReducer;


