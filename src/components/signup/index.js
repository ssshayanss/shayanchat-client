import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';

import { validateSignupReq, makeToast } from '../../services';
import MyForm from '../form';
import { setIsRegistered } from '../../redux';

export const SignupForm = ({ submitHandler }) => {
    
    const dispatch = useDispatch();

    const nameRef = useRef('');
    const emailRef = useRef('');
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const profilePictureRef = useRef('');
    
    const signup = e => {
        e.preventDefault();
        const data = { 
            name: nameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            username: usernameRef.current.value.trim(),
            password: passwordRef.current.value.trim(),
            confirmPassword: confirmPasswordRef.current.value.trim(),
            profilePicture: profilePictureRef.current.files[0]
        };
        const { success, message } = validateSignupReq(data);
        if(!success) makeToast('error', message);
        else submitHandler(data);
    };

    return (
        <div>
            <Card className="auth-card">
                <MyForm 
                    name="ثبت‌نام"
                    items={[
                        { name: 'name', type: 'text', title: 'نام‌', placeholder: 'نام‌ و نام‌خانوادگی خود را وارد کنید', fieldRef: nameRef },
                        { name: 'email', type: 'email', title: 'ایمیل', placeholder: 'ایمیل خود را وارد کنید', fieldRef: emailRef },
                        { name: 'username', type: 'text', title: 'نام‌کاربری', placeholder: 'نام‌کاربری خود را وارد کنید', fieldRef: usernameRef },
                        { name: 'password', type: 'password', title: 'رمزعبور', placeholder: 'رمزعبور خود را وارد کنید', fieldRef: passwordRef },
                        { name: 'confirmPassword', type: 'password', title: 'تکرار رمزعبور', placeholder: 'رمزعبور خود را تکرار کنید', fieldRef: confirmPasswordRef },
                        { name: 'profilePicture', type: 'file', title: 'تصویر پروفایل', fieldRef: profilePictureRef }
                    ]}
                    submitHandler={signup}
                /> 
                <div className="formActions">
                    <span className="formAction" onClick={() => dispatch(setIsRegistered(true))}>ورود</span>
                </div>
            </Card>          
        </div>
    );
};