import axios from 'axios';

export const signup = data => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("profilePicture", data.profilePicture);
    return axios.post('/api/auth/signup', formData);
};

export const signin = data => axios.post('/api/auth/signin', data);

export const verifyUser = async () => {
    try {
        const token = localStorage.getItem('SCA_TOKEN');
        if(token) {
            const { data } = await axios.get('/api/auth', { headers: { Authorization: `Bearer ${token}` } });
            if(data.success) return { success: true, user: data.user };
            else return { success: false };
        } else return { success: false };
    } catch (error) {
        return { success: false };
    }
};

export const sendResetLink = data => axios.post('/api/auth/reset-password', data);