export default (err, req, res) => {
  res.sendStatus(err.status || 500);
};
