import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPaperPlane } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

import { makeToast } from '../../services';
import { getRooms, getRoom, setSendMessageType } from '../../redux';

const ChatContentFooter = () => {
    
    const messageRef = useRef('');

    const { socket, room, sendMessageType, editMessageId, editMessageText } = useSelector(state => {
        return { socket: state.setting.socket, room: state.room.data, sendMessageType: state.setting.sendMessageType,
                editMessageId: state.setting.editMessageId, editMessageText: state.setting.editMessageText };
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if(sendMessageType === 1 && messageRef.current) messageRef.current.value = editMessageText;
        else if(messageRef.current) messageRef.current.value = '';
        // eslint-disable-next-line
    }, [sendMessageType, editMessageId]);

    const joinToGroup = () => {
        socket.emit('join room', ({ id: room.id }), ({ success, message }) => {
            if(!success) makeToast('error', message);
            else makeToast('success', message);
            dispatch(getRooms(socket));
            dispatch(getRoom(socket, room.id ));
        });
    };

    const keyPressHandler = e => {
        e.key === 'Enter' && sendMessage(); 
    };

    const sendMessage = () => {
        const message = messageRef.current.value.trim();
        if(message) {
            if(sendMessageType === 0) socket.emit('send message', { message, roomId: room.id });
            else socket.emit('edit message', { message, roomId: room.id, messageId: editMessageId });
            dispatch(setSendMessageType(0));
            messageRef.current.value = '';
        }
    };

    return (
        <div className="footer">
            {
                room.isJoined 
                    ?
                        <div className="chat-box">
                            <input className="input" onKeyPress={keyPressHandler} ref={messageRef} />
                            <FaPaperPlane className="mr-1" style={{cursor: 'pointer'}} onClick={sendMessage} />
                        </div>
                    :
                        <Button className="w-100" onClick={joinToGroup}>عضویت در گروه</Button>
            }
        </div>
    );
};

export default ChatContentFooter;