import swal from 'sweetalert';
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
      switch (error.response.status) {
        case 500:
          swal('Oups, Veuillez réessayer une erreur innatendu s\'est produite', '', 'error');
          console.log(error.response);
          break;
        case 401:
          swal('Veuillez vérifier vos indentifiants', '', 'error');
          console.log(error.request);
          break;
        case 404:
          swal('Service indisponible pour le moment, veuillez nous excuser', '', 'info');
          console.log(error.request);
          break;
        default:
          swal('Une erreur innatendu s\'est produite, veuillez nous escuser du dérangement', '', 'error');
          console.log(error);
      }
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
      switch (error.response.status) {
        case 500:
          swal('Oups, Veuillez réessayer une erreur innatendu s\'est produite', '', 'error');
          console.log(error.response);
          break;
        case 401:
          swal('Cette adresse mail est déjà utilisé', '', 'error');
          console.log(error.request);
          break;
        case 404:
          swal('Service indisponible pour le moment, veuillez nous excuser', '', 'info');
          console.log(error.request);
          break;
        default:
          swal('Une erreur innatendu s\'est produite, veuillez nous escuser du dérangement', '', 'error');
          console.log(error);
      }
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
   * @summary Fonction qui permet de rechercher un trek en fonction de son id dans la base de données
   * @param {*} id l'identifiant du trek à rechercher dans la base de données
   * @returns une élément HTTP contenant la randonnée qui correspond à cet id
   */
  async getTrekById(id) {
    let trek = null;
    try {
      trek = await axiosInstance.get(`/treks/${id}`);
    } catch (error) {
      console.log(error);
    }
    return trek;
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
   * @summary Fonction qui permet de créer une randonnée
   * @param {*} token Token afin d'avoir l'autorisation de back pour la création d'une randonnée
   * @param {*} formData Formulaire contenant toute les informations necéssaires à la création d'une randonnée
   * @returns Une réponse HTTP contenant les informations de la randonnée créée
   */
  async createTrek(token, formData) {
    let resultCreateTrek = null;
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;
    try {
      resultCreateTrek = await axiosInstance.post('/treks', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      if (resultCreateTrek.status === 200) {
        swal('Votre randonnée a bien été créée', '', 'success');
      }
    } catch (error) {
      switch (error.response.status) {
        case 500:
          swal('Oups, Veuillez réessayer une erreur innatendu s\'est produite', '', 'error');
          console.log(error.response);
          break;
          // si l'on pas authorisé
        case 401:
          swal('Problème d\'autorisation veuillez recommencez', '', 'error');
          console.log(error.request);
          break;
        case 404:
          swal('Service indisponible pour le moment, veuillez nous excuser', '', 'info');
          console.log(error.request);
          break;
        default:
          swal('Une erreur innatendu s\'est produite, veuillez nous escuser du dérangement', '', 'error');
          console.log(error);
      }
    }
    return resultCreateTrek;
  },
  /**
   * @summary Fonction qui permet de mettre a jour un les informations d'une randonnée
   * @param {*} token Token afin d'avoir l'autorisation de back pour la modification d'une randonnée
   * @param {*} trekId ID de la randonnée necéssaire à la base de données pour la modifier
   * @param {*} userId ID de l'utilisateur qui à créer cette randonnée
   * @param {*} updateTitle Titre de la randonnée mis à jour
   * @param {*} updateDescription Description de la randonnée mis à jour
   * @param {*} updateDistance Distance de la randonnée mis à jour
   * @param {*} updateDuration Durée de la randonnée mis à jour
   * @param {*} updateCity Ville de la randonnée mis à jour
   * @param {*} updateCoordinate Coordonées de la randonnée mis à jour
   * @param {*} updateDifficulty Difficulté de la randonnée mis à jour
   * @returns Une réponse HTTP contenant les informations de la randonnées mis à jour et la validation des modifications
   */
  async updateTrek(token, trekId, userId, updateTitle, updateDescription, updateDistance, updateDuration, updateCity, updateCoordinate) {
    let updateTrekResult = null;
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;
    try {
      updateTrekResult = await axiosInstance.put(`/treks/${trekId}`, {
        title: updateTitle,
        description: updateDescription,
        distance: updateDistance,
        duration: updateDuration,
        city: updateCity,
        coordinate: updateCoordinate,
      });
    } catch (error) {
      console.log(error);
    }
    return updateTrekResult;
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
      if (password === '') {
        resultUpdate = await axiosInstance.put(`/users/${userId}`, {
          firstname,
          name,
          email,
        });
      } else {
        resultUpdate = await axiosInstance.put(`/users/${userId}`, {
          firstname,
          name,
          password,
          email,
        });
      }
    } catch (error) {
      console.error(error);
    }
    return resultUpdate;
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
   * @summary Fonction qui permet de désactivé le compte de l'utilisateur dans la base de données
   * @param {*} userId ID de l'utilisateur à rechercher dans la base de données
   * @param {*} token Token afin d'avoir l'autorisation de back pour la désactivation du profil
   * @returns Une réponse HTTP contenant la validation de suppression du compte
   */
  async disableUser(userId, token) {
    let resultDisableUser = null;
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;
    try {
      resultDisableUser = await axiosInstance.delete(`/users/${userId}`);
    } catch (error) {
      console.error(error);
    }
    return resultDisableUser;
  },
  // REQUETES SUR LES PICTURES
  // ==========================
  /**
 * @summary Fonction qui permet de supprimer une photo d'une randonnée dans la base de données
 * @param {*} userId ID de l'utilisateur à rechercher dans la base de données
 * @param {*} picture String contenant un lien pour pour une image
 * @param {*} token Token afin d'avoir l'autorisation de back pour la suppression d'une image
 * @returns Une réponse HTTP contenant la validation de suppression de l'image
 */
  async deletePicture(userId, picture, token) {
    let resultDeletePicture = null;
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;
    try {
      resultDeletePicture = await axiosInstance.put('/treks/deleteImage', { id: userId, image: picture });
    } catch (error) {
      console.log(error);
    }
    return resultDeletePicture;
  },
  /**
 * @summary Fonction qui permet d'ajouter une photo d'une randonnée dans la base de données
 * @param {*} id ID du trek pour rechercher dans la base de données
 * @param {*} token Token afin d'avoir l'autorisation de back pour l'ajout d'une image
 * @param {*} formData Formulaire contenant les données necessaires à la base de données
 * @returns Une réponse HTTP contenant la validation de l'ajout de l'image
 */
  async addPicture(id, token, formData) {
    let resultAddPicture = null;
    axiosInstance.defaults.headers.common.access_token = `${token.access_token}`;

    try {
      resultAddPicture = await axiosInstance.put(`/treks/addImage/${id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
    return resultAddPicture;
  },
  // REQUETES SUR LES LABELS
  // ==========================
  /**
   * @summary Fonction qui permet de récupérer tout les Labels dans la base de données
   * @returns une réponse HTTP contenant la liste des labels
   */
  async getLabel() {
    let resultGetLabel = null;

    try {
      resultGetLabel = await axiosInstance.get('/labels');
    } catch (error) {
      console.log(error);
    }
    return resultGetLabel;
  },
  /**
 * @summary Fonction qui permet de récupérer le nom du label en fonction de son id
 * @param {*} id identifiant qui nous permet de rechercher le label dans la base de données
 * @returns une réponse HTTP contenant le label qui correspond à cet id
 */
  async getLabelById(id) {
    let resultGetOneLabel = null;

    try {
      resultGetOneLabel = await axiosInstance.get(`/labels/${id}`);
    } catch (error) {
      console.log(error);
    }
    return resultGetOneLabel;
  },
};

export default api;

// Review ok ( Dorian )
