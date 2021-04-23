import { namePattern, emailPattern, usernamePattern, imageMaxSize } from './constants';

export const validateSignupReq = data => {
    if(data.name === '') return { success: false, message: 'نام خود را وارد کنید' };
    else if(!namePattern.test(data.name) || !(data.name.length>=3)) 
        return { success: false, message: 'لطفا نام خود را به صورت صحیح وارد کنید' };
    
    else if(data.email === '') return { success: false, message: 'ایمیل خود را وارد کنید' };
    else if(!emailPattern.test(data.email)) 
        return { success: false, message: 'لطفا یک ایمیل معتبر وارد کنید' };
    
    else if(data.username === '') return { success: false, message: 'نام‌کاربری خود را وارد کنید' };
    else if(!usernamePattern.test(data.username)) 
        return { success: false, message: 'نام‌کاربری می‌تواند شامل حروف لاتین و اعداد باشد' };
    
    else if(data.password === '') return { success: false, message: 'رمزعبور خود را وارد کنید' };
    else if(data.password.length<8) 
        return { success: false, message: 'رمزعبور باید حداقل شامل 8 کاراکتر باشد' };
    
    else if(data.confirmPassword !== data.password) return { success: false, message: 'رمزعبور و تکرار آن یکسان نیست' };
    
    else if(data.profilePicture && !(data.profilePicture.type === 'image/jpeg' || data.profilePicture.type === 'image/jpg' || data.profilePicture.type === 'image/png')) 
        return { success: false, message: 'عکس موردنظر باید یکی از فرمت‌های jpg یا jpeg یا png باشد' };
    else if(data.profilePicture && data.profilePicture.size>imageMaxSize) 
        return { success: false, message: `حجم عکس موردنظر باید کمتر از ${Math.floor(imageMaxSize/1000000)}MB باشد` };

    else return { success: true };
};

export const validateSigninReq = data => {
    if(data.username === '') return { success: false, message: 'نام‌کاربری خود را وارد کنید' };
    else if(!usernamePattern.test(data.username)) return { success: false, message: 'نام‌کاربری یا رمزعبور نامعتبر است' };
    else if(data.password === '') return { success: false, message: 'رمزعبور خود را وارد کنید' };
    else if(data.password.length<8) return { success: false, message: 'نام‌کاربری یا رمزعبور نامعتبر است' };
    else return { success: true }
};

export const validateResetPasswordReq = data => {
    if(data.email === '') return { success: false, message: 'ایمیل خود را وارد کنید' };
    else if(!emailPattern.test(data.email)) 
        return { success: false, message: 'لطفا یک ایمیل معتبر وارد کنید' };
    else return { success: true };
};

export const validateCreateRoomReq = data => {
    if(data.roomName === '') return { success: false, message: 'نام گروه را وارد کنید' };
    
    else if(data.roomPicture.data && !(data.roomPicture.mimetype === 'image/jpeg' || data.roomPicture.mimetype === 'image/jpg' || data.roomPicture.mimetype === 'image/png')) 
        return { success: false, message: 'عکس موردنظر باید یکی از فرمت‌های jpg یا jpeg یا png باشد' };
    else if(data.roomPicture.data && data.roomPicture.size>imageMaxSize) 
        return { success: false, message: `حجم عکس موردنظر باید کمتر از ${Math.floor(imageMaxSize/1000000)}MB باشد` };

    else return { success: true };
};

export const validateEditProfileReq = data => {
    if( (data.name !== '') && (!namePattern.test(data.name) || !(data.name.length>=3))) 
        return { success: false, message: 'لطفا نام خود را به صورت صحیح وارد کنید' };

    else if( data.email !== '' && !emailPattern.test(data.email) ) 
        return { success: false, message: 'لطفا یک ایمیل معتبر وارد کنید' };

    else if( data.username !== '' && !usernamePattern.test(data.username) ) 
        return { success: false, message: 'نام‌کاربری می‌تواند شامل حروف لاتین و اعداد باشد' };
    
    else return { success: true };
};

export const validateChangePasswordReq = data => {
    if(data.oldPassword === '') return { success: false, message: 'رمزعبور فعلی خود را وارد کنید' };
    
    else if(data.newPassword === '') return { success: false, message: 'رمزعبور جدید خود را وارد کنید' };
    else if(data.newPassword.length<8) 
        return { success: false, message: 'رمزعبور باید حداقل شامل 8 کاراکتر باشد' };
    
    else if(data.confirmNewPassword !== data.newPassword) return { success: false, message: 'رمزعبور و تکرار آن یکسان نیست' };

    else return { success: true };
};

export const validateEditGroupReq = data => {
    if(data.roomPicture.data && !(data.roomPicture.mimetype === 'image/jpeg' || data.roomPicture.mimetype === 'image/jpg' || data.roomPicture.mimetype === 'image/png')) 
        return { success: false, message: 'عکس موردنظر باید یکی از فرمت‌های jpg یا jpeg یا png باشد' };
    else if(data.roomPicture.data && data.roomPicture.size>imageMaxSize) 
        return { success: false, message: `حجم عکس موردنظر باید کمتر از ${Math.floor(imageMaxSize/1000000)}MB باشد` };
    else return { success: true };
};