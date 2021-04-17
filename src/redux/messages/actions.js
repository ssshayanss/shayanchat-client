import { SEND_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, NEW_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from './types';

const sendRequest = () => {
    return { type: SEND_REQUEST };
};

const requestSuccess = messages => {
    return { type: REQUEST_SUCCESS, payload: messages };
};

const requestFailure = error => {
    return { type: REQUEST_FAILURE, payload: error };
};

export const getMessages = (socket, roomId) => {
    return dispatch => {
        dispatch(sendRequest());
        socket.emit('get messages', { roomId }, ({ success, messages, error }) => {
            if(success) dispatch(requestSuccess(messages));
            else dispatch(requestFailure(error));
        });
    }
};

export const addNewMessage = newMessage => {
    return { type: NEW_MESSAGE, payload: newMessage };
};

export const changeMessage = updateMessage => {
    return { type: UPDATE_MESSAGE, payload: updateMessage };
};

export const removeMessage = deleteMessageId => {
    return { type: DELETE_MESSAGE, payload: deleteMessageId };
};