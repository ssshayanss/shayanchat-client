import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEllipsisV, FaRegEdit, FaKey, FaRegTrashAlt } from 'react-icons/fa';

import { ENDPOINT, makeToast } from '../../services';
import { setModalContent, setShowModal, setSocket } from '../../redux';
import './profile.css';

export const Profile = ({ history }) => {

    const [show, setShow] = useState(false);

    const { socket, user } = useSelector(state => {
        return { socket: state.setting.socket, user: state.user};
    });
    const dispatch = useDispatch();
    
    const showEditProfileForm = () => {
        dispatch(setModalContent('editProfile'));
        dispatch(setShowModal(true));
    };

    const showChangePasswordForm = () => {
        dispatch(setModalContent("changePassword"));
        dispatch(setShowModal(true));
    };

    const deleteAccount = () => {
        const isConfirm = window.confirm("آیا از حذف حساب کاربری خود اطمینان دارید؟");
        if(isConfirm) {
            socket.emit('delete acount', ({ success, message }) => {
                if(!success) makeToast('error', message);
                else {
                    localStorage.removeItem('SCA_TOKEN');
                    socket.disconnect(0);
                    dispatch(setSocket(null));
                    history.push('/auth');
                    makeToast('success', message);
                }
            });
        }
    };

    return (
        <Fragment>
            <div className="profile-header">
                <h3>پروفایل</h3>
                <div className="actions-container">
                    <FaEllipsisV className="action-icon" onClick={() => setShow(!show)} />
                    <div className={ show ? "actions-popover" : "d-none" }>
                        <span className="action" onClick={showEditProfileForm}><FaRegEdit className="ml-2" />ویرایش پروفایل</span>
                        <span className="action" onClick={showChangePasswordForm}><FaKey className="ml-2" />تغییر رمزعبور</span>
                        <span className="action" onClick={deleteAccount}><FaRegTrashAlt className="ml-2" />حذف حساب کاربری</span>
                    </div>
                </div>       
            </div>
            <div className="profile-info">
                <div className="picture-container">
                    <img 
                        className="picture" 
                        src={ user.profilePicture ? `${ENDPOINT}/profilePictures/${user.profilePicture}` : '/images/user.png' } 
                        alt={user.name} 
                    />
                </div>
                <span className="name">{user.name}</span>
            </div>
            <div className="profile-detail">
                <div className="header">
                    <span>مشخصات</span>                    
                </div>
                <div className="item">
                    <span className="text-muted">نام</span>
                    <span>{user.name}</span>                    
                </div>
                <div className="item">
                    <span className="text-muted">ایمیل</span>
                    <span>{user.email}</span>                    
                </div>
                <div className="item">
                    <span className="text-muted">نام‌کاربری</span>
                    <span>{user.username}</span>                    
                </div>
            </div>
        </Fragment>
    );
};