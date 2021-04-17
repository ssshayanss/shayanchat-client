import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE } from './types';

const sendRequest = () => {
    return { type: SEND_REQUEST };
};

const requestSuccess = rooms => {
    return { type: REQUEST_SUCCESS, payload: rooms };
};

const requestFailure = error => {
    return { type: REQUEST_FAILURE, payload: error };
};

export const getRooms = (socket, search) => {
    return dispatch => {
        const data = (search && search !== '') ? search : {};
        dispatch(sendRequest());
        socket.emit('get rooms', data, ({ success, rooms, error }) => {
            if(success) dispatch(requestSuccess(rooms));
            else dispatch(requestFailure(error));
        });
    }
};