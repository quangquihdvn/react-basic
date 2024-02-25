import axios from '../axios';

const handlerLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword
    });
}

export { handlerLogin };