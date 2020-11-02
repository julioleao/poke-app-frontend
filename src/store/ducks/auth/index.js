import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem('email'),
  isAdmin: /* localStorage.getItem('isAdmin') */ true,
  user: {},
};

export const login = createAction('LOGIN');
export const register = createAction('REGISTER');
export const logout = createAction('LOGOUT');

export default createReducer(INITIAL_STATE, {
  [login.type]: (state, action) => ({
    ...state,
    user: action.payload,
    isAuthenticated: true,
    isAdmin: localStorage.getItem('isAdmin'),
  }),
  [logout.type]: (state, action) => ({
    ...state,
    user: false,
    isAuthenticated: false,
    isAdmin: false,
  }),
  [register.type]: (state, action) => ({
    ...state,
    isAuthenticated: true,
    isAdmin: false,
  }),
});
