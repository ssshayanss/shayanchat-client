import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyForm from '../form';
import { validateChangePasswordReq, makeToast } from '../../services';
import { setShowModal, setLoadingForm } from '../../redux';

const ChangePassword = () => {
    
    const socket = useSelector(state => state.setting.socket);
    const dispatch = useDispatch();

    const oldPasswordRef = useRef('');
    const newPasswordRef = useRef('');
    const confirmNewPasswordRef = useRef('');

    const changePassword = e => {
        e.preventDefault();
        const data = {
            oldPassword: oldPasswordRef.current.value.trim(),
            newPassword: newPasswordRef.current.value.trim(),
            confirmNewPassword: confirmNewPasswordRef.current.value.trim()
        };
        const { success, message } = validateChangePasswordReq(data);
        if(!success) makeToast('error', message);
        else {
            dispatch(setLoadingForm(true));
            socket.emit('change password', data, ({ success, message }) => {
                if(!success) makeToast('error', message);
                else {
                    makeToast('success', message);
                    dispatch(setShowModal(false));
                }
                dispatch(setLoadingForm(false));
            });
        }
    };

    return (
        <div className="modal-form">
            <h6 className="header">تغییر رمزعبور</h6>
            <MyForm 
                name="تغییر رمزعبور"
                items={[
                    { name: 'oldPassword', type: 'password', title: 'رمزعبور فعلی', placeholder: 'رمزعبور فعلی را وارد کنید', fieldRef: oldPasswordRef },
                    { name: 'newPassword', type: 'password', title: 'رمزعبور جدید', placeholder: 'رمزعبور جدید را وارد کنید', fieldRef: newPasswordRef },
                    { name: 'confirmNewPassword', type: 'password', title: 'تکرار رمزعبور جدید', placeholder: 'رمزعبور جدید را تکرار کنید', fieldRef: confirmNewPasswordRef }
                ]}
                submitHandler={changePassword}
            />
        </div>
    );
};

export default ChangePassword;