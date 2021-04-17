import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyForm from '../form';
import { validateEditProfileReq, makeToast } from '../../services';
import { setShowModal, setUserData, setLoadingForm } from '../../redux';

const EditProfile = () => {
    
    const socket = useSelector(state => state.setting.socket);
    const dispatch = useDispatch();

    const nameRef = useRef('');
    const emailRef = useRef('');
    const usernameRef = useRef('');
    
    const editProfile = e => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            username: usernameRef.current.value.trim()
        };
        const { success, message } = validateEditProfileReq(data);
        if(!success) makeToast('error', message);
        else if(data.name || data.email || data.username) {
            dispatch(setLoadingForm(true));
            socket.emit('edit profile', data, ({ success, message, user }) => {
                if(!success) makeToast('error', message);
                else {
                    makeToast('success', message);
                    dispatch(setUserData(user));
                    dispatch(setShowModal(false));
                }
                dispatch(setLoadingForm(false));
            });
        }
    };

    return (
        <div className="modal-form">
            <h6 className="header">ویرایش پروفایل</h6>
            <MyForm 
                name="ویرایش"
                items={[
                    { name: 'name', type: 'text', title: 'نام‌', placeholder: 'نام‌ خود را وارد کنید', fieldRef: nameRef },
                    { name: 'email', type: 'email', title: 'ایمیل', placeholder: 'ایمیل خود را وارد کنید', fieldRef: emailRef },
                    { name: 'username', type: 'text', title: 'نام‌کاربری', placeholder: 'نام‌کاربری خود را وارد کنید', fieldRef: usernameRef }
                ]}
                submitHandler={editProfile}
            />
        </div>
    );
};

export default EditProfile;