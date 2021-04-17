import { combineReducers } from 'redux';

import settingReducer from './setting/reducer';
import userReducer from './user/reducer';
import roomsReducer from './rooms/reducer';
import roomReducer from './room/reducer';
import membersReducer from './members/reducer';
import messagesReducer from './messages/reducer';

const rootReducer = combineReducers({
    setting: settingReducer,
    user: userReducer,
    rooms: roomsReducer,
    room: roomReducer,
    members: membersReducer,
    messages: messagesReducer
});

export default rootReducer;