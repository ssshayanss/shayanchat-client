import { useRef, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { validateSigninReq, makeToast } from '../../services';
import { setIsRegistered } from '../../redux';
import MyForm from '../form';

export const SigninForm = ({ submitHandler }) => {
    
    const dispatch = useDispatch();

    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const remindMeRef = useRef();

    useEffect(() => {
        const username = localStorage.getItem('SCA_USERNAME');
        const password = localStorage.getItem('SCA_PASSWORD');
        if(username && password) {
            usernameRef.current.value = username;
            passwordRef.current.value = password;
            remindMeRef.current.checked = true;
        }
    }, []);

    const signin = e => {
        e.preventDefault();
        const data = { username: usernameRef.current.value.trim(), password: passwordRef.current.value.trim() };
        const { success, message } = validateSigninReq(data);
        if(!success) makeToast('error', message);
        else {
            if(remindMeRef.current.checked) {
                localStorage.setItem('SCA_USERNAME', data.username);
                localStorage.setItem('SCA_PASSWORD', data.password);
            } else {
                localStorage.removeItem('SCA_USERNAME');
                localStorage.removeItem('SCA_PASSWORD');
            }
            submitHandler(data);
        }
    };

    return (
        <div>
            <Card className="auth-card">
                <MyForm 
                    name="ورود"
                    items={[
                        { name: 'username', type: 'text', title: 'نام‌کاربری', placeholder: 'نام‌کاربری خود را وارد کنید', fieldRef: usernameRef },
                        { name: 'password', type: 'password', title: 'رمزعبور', placeholder: 'رمزعبور خود را وارد کنید', fieldRef: passwordRef },
                        { name: 'remindMe', type: 'checkbox', placeholder: 'من را به خاطر بسپار', fieldRef: remindMeRef }
                    ]}
                    submitHandler={signin}
                />
                <div className="formActions">
                    <span className="formAction ml-1">بازیابی رمزعبور</span>
                    /
                    <span className="formAction mr-1" onClick={() => dispatch(setIsRegistered(false))}>ثبت‌نام</span>
                </div>
            </Card>          
        </div>
    );
};