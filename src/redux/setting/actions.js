import { SET_LOADING_PAGE, SET_LOADING_FORM, SELECT_MENU_ITEM, SET_SHOW_MODAL, SET_MODAL_CONTENT, SET_SHOW_CHATS, SET_IS_REGISTERED, SET_SEND_MESSAGE_TYPE, SET_EDIT_MESSAGE_ID, SET_EDIT_MESSAGE_TEXT, SET_WINDOW_INNERWIDTH, SET_SOCKET, SET_RESET_PASSWORD } from './types';

export const setLoadingPage = isLoading => {
    return { type: SET_LOADING_PAGE, payload: isLoading };
};

export const setLoadingForm = isLoading => {
    return { type: SET_LOADING_FORM, payload: isLoading };
};

export const selectMenuItem = itemName => {
    return { type: SELECT_MENU_ITEM, payload: itemName };
};

export const setShowModal = isShow => {
    return { type: SET_SHOW_MODAL, payload: isShow };
};

export const setModalContent = content => {
    return { type: SET_MODAL_CONTENT, payload: content };
};

export const setShowChats = isShow => {
    return { type: SET_SHOW_CHATS, payload: isShow };
};

export const setIsRegistered = isRegister => {
    return { type: SET_IS_REGISTERED, payload: isRegister };
};

export const setResetPassword = isReset => {
    return { type: SET_RESET_PASSWORD, payload: isReset };
};

export const setSendMessageType = typeNumber => {
    return { type: SET_SEND_MESSAGE_TYPE, payload: typeNumber };
};

export const setEditMessageId = editMessageId => {
    return { type: SET_EDIT_MESSAGE_ID, payload: editMessageId };
};

export const setEditMessageText = editMessageText => {
    return { type: SET_EDIT_MESSAGE_TEXT, payload: editMessageText };
};

export const setInnerWidth = () => {
    return { type: SET_WINDOW_INNERWIDTH };
};

export const setSocket = socket => {
    return { type: SET_SOCKET, payload: socket };
};
