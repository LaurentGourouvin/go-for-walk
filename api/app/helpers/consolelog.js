module.exports = () => async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.file);
  next();
};
