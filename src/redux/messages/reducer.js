import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, NEW_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from './types';

const initialState = {
    loading: false,
    data: {},
    error: ''
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_REQUEST: return { ...state, loading: true };
        case REQUEST_SUCCESS: return { loading: false, data: action.payload, error: '' };
        case REQUEST_FAILURE: return { loading: false, data: {}, error: action.payload };
        case NEW_MESSAGE:
            const newMessageDate = action.payload.date.split('-')[0]; 
            if(!state.data[newMessageDate]) state.data[newMessageDate] = [];             
            state.data[newMessageDate].push(action.payload);
            return { loading: false, data: state.data, error: '' };
        case UPDATE_MESSAGE:
            const updateMessageDate = action.payload.date.split('-')[0];
            const messageIndex = state.data[updateMessageDate].findIndex(message => message.id.toString() === action.payload.id.toString());
            if(messageIndex !== -1) state.data[updateMessageDate][messageIndex] = action.payload;
            return { loading: false, data: state.data, error: '' };
        case DELETE_MESSAGE:
            const deleteMessageDate = action.payload.date.split('-')[0];
            const deleteMessageIndex = state.data[deleteMessageDate].findIndex(message => message.id.toString() === action.payload.id.toString());
            if(deleteMessageIndex !== -1) state.data[deleteMessageDate].splice(deleteMessageIndex, 1);
            if(state.data[deleteMessageDate].length === 0) delete state.data[deleteMessageDate];
            return { loading: false, data: state.data, error: '' };
        default: return state;
    }
};

export default messagesReducer;