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

  // REQUETES SUR LES USERS
  /**
   *
   * @param {*} firstname le nom de l'utilisateur à modifier
   * @param {*} name le prénom de l'utilisateur à modifier
   * @param {*} password la password de l'utilisateur à modifier
   * @param {*} email l'email de l'utilisateur à modifier
   * @param {*} userId l'id de l'utilisateur
   * @returns retourne les nouvelles informations de l'utilisateur
   */
  async updateUser(firstname, name, password, email, userId, token) {
    let resultUpdate = null;
    // voir plus tard avec le Back si on utilise le mot "Bearer"
    // Mise en place du TOKEN dans le header de notre requête
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;
    try {
      resultUpdate = await axiosInstance.put(`/users/${userId}`, {
        firstname,
        name,
        password,
        email,
      });
    } catch (error) {
      console.error(error);
    }
    return resultUpdate;
  },

  /**
   *
   * @param {*} userId ID de l'utilisateur à rechercher dans la base de données
   * @returns Retourne les informations de l'utilisateur
   */
  async getUser(userId) {
    let resultUser = null;
    try {
      resultUser = axiosInstance.get(`/users/${userId}`);
    } catch (error) {
      console.error(error);
    }
    return resultUser;
  },
};

export default api;
