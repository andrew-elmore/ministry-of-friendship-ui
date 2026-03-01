import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

export const createMockStore = (initialState = {}) => {
  const defaultState = {
    app: {
      processing: false,
      notices: []
    },
    auth: {
      currentUser: null,
      sessionToken: null,
      isAuthenticated: false
    },
    profile: {
      profile: null,
      loading: false
    },
    squad: {
      squads: [],
      currentSquad: null,
      loading: false
    },
    preference: {
      preferences: [],
      loading: false
    },
    ...initialState
  };

  return configureStore({
    reducer: (state = defaultState) => state,
    middleware: [thunk, promiseMiddleware],
    preloadedState: defaultState
  });
};

export const getMockState = (overrides = {}) => ({
  app: {
    processing: false,
    notices: [],
    ...overrides.app
  },
  auth: {
    currentUser: null,
    sessionToken: null,
    isAuthenticated: false,
    ...overrides.auth
  },
  profile: {
    profile: null,
    loading: false,
    ...overrides.profile
  },
  squad: {
    squads: [],
    currentSquad: null,
    loading: false,
    ...overrides.squad
  },
  preference: {
    preferences: [],
    loading: false,
    ...overrides.preference
  }
});
