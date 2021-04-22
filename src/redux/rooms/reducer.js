import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, UPDATE_ROOMS, DELETE_ROOM } from './types';

const initialState = {
    loading: false,
    data: [],
    error: ''
};

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_REQUEST: return { ...state, loading: true };
        case REQUEST_SUCCESS: return { loading: false, data: action.payload, error: '' };
        case REQUEST_FAILURE: return { loading: false, data: [], error: action.payload };
        case UPDATE_ROOMS: 
            const roomIndex = state.data.findIndex(room => room.id.toString() === action.payload.id.toString());
            if(roomIndex !== -1) {
                if(action.payload.name) state.data[roomIndex].name = action.payload.name;
                if(action.payload.roomPicture) state.data[roomIndex].roomPicture = action.payload.roomPicture; 
            } else state.data.push(action.payload);
            return { loading: false, data: state.data, error: '' }; 
        case DELETE_ROOM: 
            const deleteRoomIndex = state.data.findIndex(room => room.id.toString() === action.payload.id.toString());
            if(deleteRoomIndex !== -1) state.data.splice(deleteRoomIndex, 1);
            return { loading: false, data: state.data, error: '' };
        default: return state;
    }
};

export default roomsReducer;