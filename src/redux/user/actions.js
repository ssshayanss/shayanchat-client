import { SET_USER_DATA } from './types';

export const setUserData = userData => {
    return { type: SET_USER_DATA, payload: userData };
};