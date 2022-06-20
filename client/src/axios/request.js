import axiosInstance from './config';

const api = {

  // AUTHENTIFICATION
  // ======================
  /**
   *
   * @param {*} email email de l'utilisateur permettant la connexion à son espace privé
   * @param {*} password mot de passe l'utilisateur
   * @returns me retourne un Token contenant les informations de mon utilisateurs
   */
  async login(email, password) {
    let login = null;
    try {
      login = await axiosInstance.post('/auth/login', {
        email: email,
        password: password,
      });
      if (login.data) {
        axiosInstance.defaults.headers.common.Authorization = `bearer ${login.data.access_token}`;
      }

      return login;
    } catch (error) {
      console.error(error);
    }

    return login;
  },

  /**
   *
   * @param {*} firstname firstname de l'utilisateur à créer
   * @param {*} name prénom de l'utilisateur à créer
   * @param {*} email email de l'utilisateur à créer
   * @param {*} password password de l'utilisateur à créer
   * @returns me retourne les informations de l'utilisateur crée
   */
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

  // REQUETES SUR LES TREKS
  /**
   *
   * @returns Retourne la liste de toutes les randonnées stockées dans la base de données
   */
  async getAllTreks() {
    let treks = null;
    try {
      treks = await axiosInstance.get('/treks');
    } catch (error) {
      console.error(error);
    }
    return treks;
  },

  /**
   *
   * @param {*} cityName le nom de la ville qui va nous permettre d'effectuer la recherche dans la base de données
   * @returns Retourne la liste de toutes les randonées stockées dans la base de donnée concernant la ville
   */
  async getTreksByCity(cityName) {
    let treksByCity = null;
    try {
      treksByCity = await axiosInstance.get(`/treks/${cityName}`);
    } catch (error) {
      console.error(error);
    }
    return treksByCity;
  },

};

export default api;
