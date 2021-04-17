import { FaRegUserCircle, FaRegCommentDots, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import { selectMenuItem, setSocket, resetRoom } from '../../redux';

import './menu.css';

export const MenuBar = ({ history }) => {

    const { selectedMenuItem, socket } = useSelector(state => {
        return { selectedMenuItem: state.setting.selectedMenuItem, socket: state.setting.socket };
    });
    const dispatch = useDispatch();

    const logout = () => {
        socket.disconnect(0);
        dispatch(setSocket(null));
        dispatch(resetRoom());
        localStorage.removeItem('SCA_TOKEN');
        history.push('/auth');
    };

    return (
        <div className="menu-bar">
            <h1 className="brand">ShayanChat</h1>
            <div className="icons-container">
                <div 
                    className={ selectedMenuItem === 'profile' ? "icon active" : "icon" } 
                    onClick={() => dispatch(selectMenuItem('profile'))}
                    title="پروفایل"
                >
                    <FaRegUserCircle />
                </div>
                <div 
                    className={ selectedMenuItem === 'chats' ? "icon active" : "icon" }
                    onClick={() => dispatch(selectMenuItem('chats'))}    
                    title="چت‌ها"
                >
                    <FaRegCommentDots />
                </div>
                <div className="icon" title="خروج" onClick={logout}>
                    <FaSignOutAlt />
                </div>
            </div>
        </div>
    );
};