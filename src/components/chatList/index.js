import { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SearchBox from '../searchBox';

import './chatList.css';
import ChatListHeader from './chatListHeader';
import ChatItem from './chatItem';

export const ChatList = () => {

    const { rooms, currentRoom } = useSelector(state => {
        return { rooms: state.rooms, currentRoom: state.room.data };
    });

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