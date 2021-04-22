import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, UPDATE_ROOMS, DELETE_ROOM } from './types';

const sendRequest = () => {
    return { type: SEND_REQUEST };
};

const requestSuccess = rooms => {
    return { type: REQUEST_SUCCESS, payload: rooms };
};

const requestFailure = error => {
    return { type: REQUEST_FAILURE, payload: error };
};

export const getRooms = socket => {
    return dispatch => {
        dispatch(sendRequest());
        socket.emit('get rooms', ({ success, rooms, error }) => {
            if(success) dispatch(requestSuccess(rooms));
            else dispatch(requestFailure(error));
        });
    }
};

export const searchRooms = (socket, search) => {
    return dispatch => {
        dispatch(sendRequest());
        if(search.trim() !== '') {
            socket.emit('search rooms', { search }, ({ success, rooms, error }) => {
                if(success) dispatch(requestSuccess(rooms));
                else dispatch(requestFailure(error));
            });
        }
    }
};

export const updateRooms = room => {
    return { type: UPDATE_ROOMS, payload: room };
};

export const removeRoom = room => {
    return { type: DELETE_ROOM, payload: room };
};