import axiosInstanceAuth from './config';
import authentification from '../../utils/sessionUser/sessionUser';

const api = {

  // authentification API

  async login(email, password) {
    try {
      const login = await axiosInstanceAuth.post('/login', { 
        email: email,
        password: password
      };

    } catch (error) {
      console.error(error);
    }
  },

};

export default api;
