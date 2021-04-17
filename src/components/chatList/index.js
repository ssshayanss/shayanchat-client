import { Fragment, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../redux';
import SearchBox from '../searchBox';

import './chatList.css';
import ChatListHeader from './chatListHeader';
import ChatItem from './chatItem';

export const ChatList = () => {

    const { socket, rooms, currentRoom } = useSelector(state => {
        return { socket: state.setting.socket, rooms: state.rooms, currentRoom: state.room.data };
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if(socket) {
            dispatch(getRooms(socket));
        }
        // eslint-disable-next-line
    }, [socket]);

    return (
        <Fragment>
            <ChatListHeader />
            <SearchBox />
            <div className={rooms.loading ? "chat-list text-center" : "chat-list"}>
                {
                    rooms.loading
                        ? 
                            <Spinner animation="border" variant="secondary" />
                        :
                            <Fragment>
                                {
                                    rooms.data.map(room => {
                                        return <ChatItem key={room.id} room={room} active={ currentRoom.id === room.id ? true : false } />
                                    })
                                }
                            </Fragment>    
                }
            </div>
        </Fragment>
    );
};