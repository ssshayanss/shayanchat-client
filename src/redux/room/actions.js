import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, RESET_ROOM } from './types';

const sendRequest = () => {
    return { type: SEND_REQUEST };
};

const requestSuccess = room => {
    return { type: REQUEST_SUCCESS, payload: room };
};

const requestFailure = error => {
    return { type: REQUEST_FAILURE, payload: error };
};

export const resetRoom = () => {
    return { type: RESET_ROOM };
};

export const getRoom = (socket, id) => {
    return dispatch => {
        dispatch(sendRequest());
        socket.emit('get room', { id }, ({ success, room, error }) => {
            if(success) dispatch(requestSuccess(room));
            else dispatch(requestFailure(error));
        });
    }
};