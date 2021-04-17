import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE } from './types';

const sendRequest = () => {
    return { type: SEND_REQUEST };
};

const requestSuccess = members => {
    return { type: REQUEST_SUCCESS, payload: members };
};

const requestFailure = error => {
    return { type: REQUEST_FAILURE, payload: error };
};

export const getRoomMembers = (socket, id) => {
    return dispatch => {
        dispatch(sendRequest());
        socket.emit('get room members', { id }, ({ success, members, error }) => {
            if(success) dispatch(requestSuccess(members));
            else dispatch(requestFailure(error));
        });
    }
};