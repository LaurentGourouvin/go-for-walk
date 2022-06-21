import axiosInstance from './config';

const api = {

  // AUTHENTIFICATION
  // ======================
  /**
   * @summary Fonction qui retourne un Token contenant les informations de mon utilisateurs
   * @param {*} email email de l'utilisateur permettant la connexion à son espace privé
   * @param {*} password mot de passe l'utilisateur
   * @returns Retourne un jsonwebtoken
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
   * @summary Fonction permettant de s'inscrire à l'application
   * @param {*} firstname firstname de l'utilisateur à créer
   * @param {*} name prénom de l'utilisateur à créer
   * @param {*} email email de l'utilisateur à créer
   * @param {*} password password de l'utilisateur à créer
   * @returns Retourne un utilisateur
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
  // =========================
  /**
   * @summary Retourne la liste de toutes les randonnées stockées dans la base de données
   * @returns Une réponse HTTP contenant toutes les randonnées de la base de donnée
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
   * @summary Fonction qui retourne la liste de toutes les randonées stockées dans la base de donnée concernant la ville
   * @param {*} cityName le nom de la ville qui va nous permettre d'effectuer la recherche dans la base de données
   * @returns Une réponse HTTP contenant la liste des randonnées recherchées par nom de Ville
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

  /**
   * @summary Fonction qui retourne la liste des randonées crées par cet utilisateur
   * @param {*} userId ID de l'utilistaeur permettant de récupérer les randonnées créer par cet utilisateur
   * @returns Une réponse HTTP contenant les randonnées crées par cet utilisateur
   */
  async getTreksByUserId(userId) {
    let treksByUserId = null;
    try {
      treksByUserId = await axiosInstance.get(`/treks/user/${userId}`);
    } catch (error) {
      console.error(error);
    }
    return treksByUserId;
  },

  /**
   * @summary Fonction qui permet de supprimer une randonnée de la base de donnée
   * @param {*} trekId ID de la randonnée que la fonction va supprimer de la base de données
   * @returns Une réponse HTTP contenant le status code 200 pour une suppression réussie
   */
  async deleteTrek(trekId, token) {
    let deleteTrek = null;
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;
    try {
      deleteTrek = await axiosInstance.delete(`/treks/${trekId}`);
    } catch (error) {
      console.error(error);
    }
    return deleteTrek;
  },
  // REQUETES SUR LES USERS
  // ==========================
  /**
   * @summary Fonction qui permet la modification des données utilisateurs
   * @param {*} firstname le nom de l'utilisateur à modifier
   * @param {*} name le prénom de l'utilisateur à modifier
   * @param {*} password la password de l'utilisateur à modifier
   * @param {*} email l'email de l'utilisateur à modifier
   * @param {*} userId l'id de l'utilisateur
   * @returns Une réponse HTTP contenant les données de l'utilisateur récemment modifiées
   */
  async updateUser(firstname, name, password, email, userId, token) {
    let resultUpdate = null;
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
   * @summary Fonction qui permet de récupérer les informations d'un utilisateur via son ID
   * @param {*} userId ID de l'utilisateur à rechercher dans la base de données
   * @returns Une réponse HTTP contenant les informations de l'utilisateur
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

  /**
   * @summary Fonction qui permet de supprimer le compte de l'utilisateur dans la base de données
   * @param {*} userId ID de l'utilisateur à rechercher dans la base de données
   * @param {*} token Token afin d'avoir l'autorisation de back pour la suppression du profil
   * @returns Une réponse HTTP contenant la validation de suppression du compte
   */
  async deleteUser(userId, token) {
    let resultDeleteUser = null;
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;
    try {
      resultDeleteUser = await axiosInstance.delete(`/users/${userId}`);
    } catch (error) {
      console.error(error);
    }
    return resultDeleteUser;
  },
};

export default api;
