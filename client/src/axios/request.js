import axiosInstance from './config';

const api = {

  // authentification API

  async login(email, password) {
    let login = null;
    try {
      login = await axiosInstance.post('/auth/login', {
        email: email,
        password: password,
      });
      if (login.data) {
        axiosInstance.defaults.headers.common.Authorization = login.data;
      }

      return login;
    } catch (error) {
      console.error(error);
    }

    return login;
  },

  async register(firstname, name, email, password) {
    let register = null;
    try {
      register = await axiosInstance.post('/auth/register', {
        firstname,
        name,
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }

    return register;
  },

};

export default api;
