import { RootState } from "../../index";

// Select the entire auth state
export const selectAuth = (state: RootState) => state.auth;

// Select individual pieces of auth state
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Derived selector - checks if user is authenticated
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;
