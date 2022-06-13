const axios = require('axios');
// MORCEAU DE CODE QUI VAS SERVIR POUR LA CREATION DE TRECK
// IL VA NOUS PERMETTRE DE CHERCHER LES VRAIS NOM DE VILLES
// PENSEZ A LE MODIFIER AFIN DE RECUPERER LES INFORMATIONS
// QU'ON SOUHAITE STOCKER EN BDD (nom de ville, code postal, etc)
const apiGouv = {

  async requestGetCity(cityName) {
    let returnData = null;
    try {
      const dataCities = {
        cities: [],
      };

      const resData = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${cityName}&type=municipality&autocomplete=1`);

      // j'ajoute les villes provenant dans l'API dans l'objet dataCities
      resData.data.features.forEach((city) => {
        dataCities.cities.push(city.properties.city);
      });

      // Suppression des doublons renvoyé par l'API
      const removeDuplicate = [];

      // Je parcours chaque ville contenu dans le tableau cities de l'objet dataCities
      dataCities.cities.forEach((city) => {
        // Je recherche dans le tableau removeDuplicate si la valeur existe
        const isDuplicateCityName = removeDuplicate.find((duplicateCity) => duplicateCity === city);
        if (!isDuplicateCityName) {
          removeDuplicate.push(city);
        }
      });

      // j'affecte le tableau sans doublon à mon objet dataCities puis je retourne cette valeur
      dataCities.cities = removeDuplicate;

      returnData = dataCities;
    } catch (error) {
      console.error(error);
    }

    return returnData;
  },

};

export default apiGouv;
