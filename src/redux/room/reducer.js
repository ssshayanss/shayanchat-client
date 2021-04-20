import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, RESET_ROOM, UPDATE_ROOM } from './types';

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
        case UPDATE_ROOM: 
            if(state.data.id && state.data.id.toString()===action.payload.id.toString()) {
                if(action.payload.name) state.data.name = action.payload.name;
                if(action.payload.roomPicture) state.data.roomPicture = action.payload.roomPicture;    
            }
            return { loading: false, data: state.data, error: '' };
        default: return state;
    }
};

export default roomReducer;