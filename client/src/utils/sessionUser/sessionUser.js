const authentification = {

  /**
 * setLoggin nous permet de définir la connexion d'un utilisateur
 * ce statut va être enregistré dans le localStorage du navigateur
 * @param {*} token Token reçu via notre API
 */
  setLoggin(token) {
    if (token) {
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('access_token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);
    } else {
      localStorage.setItem('isLogged', 'false');
    }
  },

  /**
   * discconnectUser nous permet de passer la valeur de "isLogged" de notre localStorage
   * à false afin de déconnecter notre utilisateur de l'application
   */
  disconnectUser() {
    localStorage.setItem('isLogged', 'false');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  /**
   * checkLoggin va nous permettre de vérifier l'état de connexion de l'utilisateur à l'application
   * @param {*} token Token reçu via notre API
   * @returns true || false si l'utilisateur est bien connecté on retourne la valeur true sinon false
   */
  checkLoggin(token = null) {
    if ((token) && (localStorage.getItem('isLogged') === 'true')) {
      return true;
    }
    return false;
  },

};

export default authentification;
