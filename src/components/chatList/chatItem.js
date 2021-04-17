import { useSelector, useDispatch } from 'react-redux';
import { ENDPOINT } from '../../services';
import { getRoom, setShowChats } from '../../redux';

const ChatItem = ({ room, active }) => {

    const socket = useSelector(state => state.setting.socket);
    const dispatch = useDispatch();

    const setRoom = () => {
        dispatch(getRoom(socket, room.id));
        dispatch(setShowChats(true));
    };

    return (
        <div onClick={setRoom} className={ active ? "chat-item active" : "chat-item"}>
            <div className="chat-item-info">
                <div className="picture-container">
                    <img className="picture" src={ room.roomPicture ? `${ENDPOINT}/roomPictures/${room.roomPicture}` : "/images/room.jpg"} alt={room.name} />
                </div>
                <div className="text-container">
                    <span className="name">{room.name}</span>
                </div>
            </div>
        </div>
    );
};

export default ChatItem;