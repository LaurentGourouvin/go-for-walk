module.exports = {
  uppercaseFirstLetter: function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  checkLength: function checkLength(arr) {
    return arr.length < 5;
  },
};
