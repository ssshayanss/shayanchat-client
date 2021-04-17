import { FaPlusSquare } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setModalContent, setShowModal } from '../../redux';

const ChatListHeader = () => {    
    
    const dispatch = useDispatch();
    
    const showCreateRoomModal = () => {
        dispatch(setModalContent('createNewRoom'));
        dispatch(setShowModal(true));
    };

    return (
        <div className="chat-list-header">
            <h3>چت‌ها</h3>
            <span className="plus-icon" title="ساخت گروه جدید" onClick={showCreateRoomModal}>
                <FaPlusSquare />
            </span>
        </div>
    );
};

export default ChatListHeader;