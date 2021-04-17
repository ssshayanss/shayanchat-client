import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, NEW_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from './types';

const initialState = {
    loading: false,
    data: [],
    error: ''
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_REQUEST: return { ...state, loading: true };
        case REQUEST_SUCCESS: return { loading: false, data: action.payload, error: '' };
        case REQUEST_FAILURE: return { loading: false, data: [], error: action.payload };
        case NEW_MESSAGE: 
            state.data.push(action.payload);
            return { loading: false, data: state.data, error: '' };
        case UPDATE_MESSAGE:
            const messageIndex = state.data.findIndex(message => message.id.toString() === action.payload.id.toString());
            if(messageIndex !== -1) state.data[messageIndex] = action.payload;
            return { loading: false, data: state.data, error: '' };
        case DELETE_MESSAGE:
            const deleteMessageIndex = state.data.findIndex(message => message.id.toString() === action.payload.toString());
            if(deleteMessageIndex !== -1) state.data.splice(deleteMessageIndex, 1);
            return { loading: false, data: state.data, error: '' };
        default: return state;
    }
};

export default messagesReducer;