import { useSelector, useDispatch } from 'react-redux';
import { FaAngleRight, FaEllipsisV } from 'react-icons/fa';
import { setShowChats, setShowModal, setModalContent } from '../../redux';
import { ENDPOINT } from '../../services';

const ChatContentHeader = () => {

    const { windowInnerWidth, room } = useSelector(state => {
        return { windowInnerWidth: state.setting.windowInnerWidth, room: state.room.data };
    });
    const dispatch = useDispatch();

    const showRoomInfo = () => {
        dispatch(setModalContent('roomInfo'));
        dispatch(setShowModal(true));
    };

    return (
        <div className="header">
            <div className="right-side">
                { windowInnerWidth<768 && <FaAngleRight className="back-icon" onClick={() => dispatch(setShowChats(false))} /> }
                <img 
                    className="picture"
                    src={ room.roomPicture ? `${ENDPOINT}/roomPictures/${room.roomPicture}` : '/images/room.jpg'}
                    alt={room.name}
                />
                <span className="room-name">{room.name}</span>
            </div>
            <FaEllipsisV onClick={showRoomInfo} className="ellipsis-icon" />
        </div>
    );
};

export default ChatContentHeader;