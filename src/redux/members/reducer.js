import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE } from './types';

const initialState = {
    loading: false,
    data: [],
    error: ''
};

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_REQUEST: return { ...state, loading: true };
        case REQUEST_SUCCESS: return { loading: false, data: action.payload, error: '' };
        case REQUEST_FAILURE: return { loading: false, data: [], error: action.payload };
        default: return state;
    }
};

export default roomReducer;