import { SET_LOADING_PAGE, SET_LOADING_FORM, SELECT_MENU_ITEM, SET_SHOW_MODAL, SET_MODAL_CONTENT, SET_SHOW_CHATS, SET_SEND_MESSAGE_TYPE, SET_EDIT_MESSAGE_ID, SET_EDIT_MESSAGE_TEXT, SET_WINDOW_INNERWIDTH, SET_IS_REGISTERED, SET_RESET_PASSWORD, SET_SOCKET } from './types';

const initialState = {
    loadingPage: true,
    loadingForm: false,
    selectedMenuItem: 'chats',
    showModal: false,
    modalContent: '',
    isRegister: true,
    resetPassword: false,
    showChats: false,
    sendMessageType: 0,
    editMessageId: 0,
    editMessageText: '',
    windowInnerWidth: window.innerWidth,
    socket: null
};

const settingReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING_PAGE: return { ...state, loadingPage: action.payload };
        case SET_LOADING_FORM: return { ...state, loadingForm: action.payload };
        case SELECT_MENU_ITEM: return { ...state, selectedMenuItem: action.payload };
        case SET_SHOW_MODAL: return { ...state, showModal: action.payload };
        case SET_MODAL_CONTENT: return { ...state, modalContent: action.payload };
        case SET_SHOW_CHATS: return { ...state, showChats: action.payload };
        case SET_IS_REGISTERED: return { ...state, isRegister: action.payload };
        case SET_RESET_PASSWORD: return { ...state, resetPassword: action.payload };
        case SET_SEND_MESSAGE_TYPE: return { ...state, sendMessageType: action.payload };
        case SET_EDIT_MESSAGE_ID: return { ...state, editMessageId: action.payload };
        case SET_EDIT_MESSAGE_TEXT: return { ...state, editMessageText: action.payload };
        case SET_WINDOW_INNERWIDTH: return { ...state, windowInnerWidth: window.innerWidth };
        case SET_SOCKET: return { ...state, socket: action.payload };
        default: return state;
    }
};

export default settingReducer;