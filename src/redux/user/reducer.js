import { SET_USER_DATA } from './types';

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: return action.payload;
        default: return state;
    }
};

export default userReducer;