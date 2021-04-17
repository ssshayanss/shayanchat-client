import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, RESET_ROOM } from './types';

const initialState = {
    loading: false,
    data: {},
    error: ''
};

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_REQUEST: return { ...state, loading: true };
        case REQUEST_SUCCESS: return { loading: false, data: action.payload, error: '' };
        case REQUEST_FAILURE: return { loading: false, data: {}, error: action.payload };
        case RESET_ROOM: return { loading: false, data: {}, error: '' };
        default: return state;
    }
};

export default roomReducer;