import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SigninForm, SignupForm, ResetPasswordForm, Loading } from '../components';
import { signin, signup, verifyUser, makeToast } from '../services';
import { setLoadingPage, setLoadingForm, setIsRegistered } from '../redux';

export const AuthPage = ({ history }) => {
    
    const { loadingPage, isRegister, resetPassword } = useSelector(state => {
        return { loadingPage: state.setting.loadingPage, isRegister: state.setting.isRegister, resetPassword: state.setting.resetPassword };
    });
    const dispatch = useDispatch();

    useEffect(() => {
        verifyUser()
            .then(({ success }) => {
                if(success) history.push('/chat'); 
                setTimeout(() => {
                    dispatch(setLoadingPage(false));
                }, 1000);
            });

        return () => {
            dispatch(setLoadingPage(true));
        }
        // eslint-disable-next-line
    }, []);

    const submitHandler = async data => {
        try {
            dispatch(setLoadingForm(true));
            let response;
            if(data.confirmPassword) {
                response = await signup(data);
                dispatch(setIsRegistered(true));
            } else {
                response = await signin(data);
                localStorage.setItem('SCA_TOKEN', response.data.token);
                history.push('/chat');
            }
            dispatch(setLoadingForm(false));
            makeToast('success', response.data.message);
        } catch (error) {
            dispatch(setLoadingForm(false));
            makeToast('error', error.response.data.message);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center text-center justify-content-center h-100">
            {
                loadingPage
                    ?
                        <Loading />
                    :
                        <Fragment>
                            <h1 className="appBrand mb-3">ShayanChat</h1>
                            <h3 className="mb-3 pb-3">{ resetPassword ? 'بازیابی رمزعبور' : isRegister ? 'ورود' : 'عضویت' }</h3>
                            {
                                resetPassword
                                    ? <ResetPasswordForm />
                                    : isRegister 
                                        ? <SigninForm submitHandler={submitHandler} />
                                        : <SignupForm submitHandler={submitHandler} />
                            }
                        </Fragment>
            }
        </div>
    );
};