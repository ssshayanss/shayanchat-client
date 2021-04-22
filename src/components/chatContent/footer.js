import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPaperPlane, FaGrin } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Picker from 'emoji-picker-react';

import { makeToast } from '../../services';
import { getRoom, setSendMessageType, setLoadingForm } from '../../redux';

const ChatContentFooter = () => {
    
    const messageRef = useRef('');
    const [showPicker, setShowPicker] = useState(false);

    const { socket, loadingForm, room, sendMessageType, editMessageId, editMessageText } = useSelector(state => {
        return { 
            socket: state.setting.socket,
            loadingForm: state.setting.loadingForm,
            room: state.room.data, 
            sendMessageType: state.setting.sendMessageType,
            editMessageId: state.setting.editMessageId, 
            editMessageText: state.setting.editMessageText };
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
            dispatch(getRoom(socket, room.id ));
        });
    };

    const keyPressHandler = e => {
        e.key === 'Enter' && sendMessage(); 
    };

    const sendMessage = () => {
        const message = messageRef.current.value.trim();
        if(message !== '') {
            dispatch(setLoadingForm(true));
            if(sendMessageType === 0) socket.emit('send message', { message, roomId: room.id });
            else socket.emit('edit message', { message, roomId: room.id, messageId: editMessageId });
            dispatch(setSendMessageType(0));
            setShowPicker(false);
            messageRef.current.value = '';
            setTimeout(() => {
                dispatch(setLoadingForm(false));
            }, 1000);
        }
    };

    return (
        <div className="footer">
            {
                room.isJoined 
                    ?
                        <div className={ loadingForm ? "chat-box disable" : "chat-box"}>
                            <input className="input" onKeyPress={keyPressHandler} ref={messageRef} />
                            <FaGrin className="mx-1" style={{ cursor: "pointer" }} onClick={() => setShowPicker(!showPicker)} />
                            <span className={showPicker ? "picker" : "d-none"}>
                                <Picker 
                                    disableSearchBar={true}
                                    onEmojiClick={(e, emojiObj) => messageRef.current.value += emojiObj.emoji }   
                                />
                            </span>
                            <FaPaperPlane className="mx-1" style={{cursor: 'pointer'}} onClick={sendMessage} />
                        </div>
                    :
                        <Button className="w-100" onClick={joinToGroup}>عضویت در گروه</Button>
            }
        </div>
    );
};

export default ChatContentFooter;