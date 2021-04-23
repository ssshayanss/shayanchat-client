import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';

import { validateResetPasswordReq, sendResetLink, makeToast } from '../../services';
import MyForm from '../form';
import { setResetPassword, setLoadingForm, setIsRegistered } from '../../redux';

export const ResetPasswordForm = () => {
    
    const dispatch = useDispatch();

    const emailRef = useRef('');
    
    const getResetEmail = async e => {
        e.preventDefault();
        try {
            const data = { email: emailRef.current.value.trim() };
            const { success, message } = validateResetPasswordReq(data);
            if(!success) makeToast('error', message);
            else {
                dispatch(setLoadingForm(true));
                const response = await sendResetLink(data);
                makeToast('success', response.data.message);
                dispatch(setLoadingForm(false));
            }
        } catch (error) {
            dispatch(setLoadingForm(false));
            makeToast('error', error.response.data.message);
        }
    };

    return (
        <div>
            <Card className="auth-card">
                <MyForm 
                    name="بازیابی رمز عبور"
                    items={[
                        { name: 'email', type: 'email', title: 'ایمیل', placeholder: 'ایمیل خود را وارد کنید', fieldRef: emailRef }
                    ]}
                    submitHandler={getResetEmail}
                /> 
                <div className="formActions">
                    <span 
                        className="formAction" 
                        onClick={() => {
                            dispatch(setIsRegistered(true));
                            dispatch(setResetPassword(false));
                        }}
                    >ورود</span>
                </div>
            </Card>          
        </div>
    );
};