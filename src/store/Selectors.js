import { createSelector } from "reselect";

const getState = state => state;

//  Getters
export const getCategories = createSelector(getState, state => state.categories);
export const getDifficulties = createSelector(getState, state => state.difficulties);

export const getChosenCategory = createSelector(getState, state => state.chosenCategory);
export const getChosenDifficulty = createSelector(getState, state => state.chosenDifficulty);