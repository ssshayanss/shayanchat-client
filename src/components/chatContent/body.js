import { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { Loading } from '../';
import { getMessages, setSendMessageType, addNewMessage, changeMessage, removeMessage } from '../../redux';
import Messages from './messages';

const ChatContentBody = () => {
    
    const chatBodyRef = useRef();
    const { socket, messages, user, room, sendMessageType, editMessageText } = useSelector(state => {
        return { 
            socket: state.setting.socket,
            messages: state.messages, 
            user: state.user,
            room: state.room, 
            sendMessageType: state.setting.sendMessageType, 
            editMessageText: state.setting.editMessageText 
        };
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if(socket) dispatch(getMessages(socket, room.data.id));  
        return () => {
            dispatch(setSendMessageType(0));
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(socket) {
            socket.on('new message', async ({ roomId, newMessage, updateMessage, deleteMessage }) => {
                try {
                    if(roomId.toString() === room.data.id.toString()) {
                        if(newMessage) {
                            newMessage.isOwner = (newMessage.sender.email===user.email) ? true : false;
                            dispatch(addNewMessage(newMessage));
                            chatBodyRef.current.scroll(0, chatBodyRef.current.scrollHeight);
                        } else if(updateMessage) {
                            updateMessage.isOwner = (updateMessage.sender.email===user.email) ? true : false;
                            dispatch(changeMessage(updateMessage));
                        } else if(deleteMessage) dispatch(removeMessage(deleteMessage));
                    }
                } catch(error) {}
            });
        }
        return () => {
            if(socket) socket.off('new message');
        }
        // eslint-disable-next-line
    }, [socket]);

    useEffect(() => {
        chatBodyRef.current.scroll(0, chatBodyRef.current.scrollHeight);
    }, [messages.data]);

    return (
        <div ref={chatBodyRef} className="body">
            {
                messages.loading ?
                        <Loading />
                    :
                        <Fragment>
                            {
                                messages.data && 
                                Object.keys(messages.data).map((date, index) => {
                                    return <Messages key={index} date={date} messages={messages.data[date]} />
                                })
                            }
                            {
                                sendMessageType === 1 &&
                                <div className="edit-box">
                                    <FaTimes style={{ cursor: "pointer" }} onClick={() => dispatch(setSendMessageType(0))} />
                                    <span className="edit-box-text text-muted">{editMessageText}</span>
                                </div>
                            } 
                        </Fragment>    
            }
        </div>
    );
};

export default ChatContentBody;