import { useState } from 'react';
import { FaEllipsisV, FaRegClock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setEditMessageId, setSendMessageType, setEditMessageText } from '../../redux';
import { ENDPOINT } from '../../services';

const Message = ({ message }) => {
    
    const [show, setShow] = useState(false);

    const { socket, room } = useSelector(state => { 
        return { socket: state.setting.socket, room: state.room.data }
    });
    const dispatch = useDispatch();

    const editMessage = () => {
        dispatch(setSendMessageType(1));
        dispatch(setEditMessageText(message.text))
        dispatch(setEditMessageId(message.id));
        setShow(false);
    };

    const deleteMessage = () => {
        const isConfirm = window.confirm('آیا از حذف پیام اطمینان دارید؟');
        if(isConfirm) socket.emit('delete message', { roomId: room.id, messageId: message.id });
        setShow(false);
    };

    return (
        <div className={ message.isOwner ? "message-container" : "message-container dir-ltr"}>
            <img 
                className={ message.isOwner ? "picture ml-2" : "picture mr-2"} 
                src={ message.sender.profilePicture ? `${ENDPOINT}/profilePictures/${message.sender.profilePicture}` : "/images/user.png"} 
                alt={ message.sender.name } 
            />
            <div className="message-text">
                <span className="name">{ message.sender.name }</span>
                <span className="message">{message.text}</span>
                <span className="time"><FaRegClock /> {message.date.split('-')[1]}</span>
            </div>
            {
                message.isOwner &&
                <div className="actions-container">
                    <FaEllipsisV style={{ cursor: 'pointer' }} onClick={() => setShow(!show)} />
                    <div className={ show ? "actions-popover" : "d-none" }>
                        <span className="action" onClick={editMessage}>ویرایش</span>
                        <span className="action" onClick={deleteMessage}>حذف</span>
                    </div>
                </div>
            }
        </div>          
    );
};

export default Message;