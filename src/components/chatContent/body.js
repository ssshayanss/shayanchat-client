import { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { Loading } from '../';
import { getMessages, setSendMessageType, addNewMessage, changeMessage, removeMessage } from '../../redux';
import Message from './message';

const ChatContentBody = () => {
    
    const chatBodyRef = useRef();
    const { socket, user, messages, room, sendMessageType, editMessageText } = useSelector(state => {
        return { socket: state.setting.socket, user: state.user, messages: state.messages, room: state.room, sendMessageType: state.setting.sendMessageType, editMessageText: state.setting.editMessageText };
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if(socket) {
            dispatch(getMessages(socket, room.data.id));  
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
            dispatch(setSendMessageType(0));
            socket.off('new message');
        }
        // eslint-disable-next-line
    }, []);

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
                                messages.data.map(message => {
                                    return <Message key={message.id} message={message} />
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