module.exports = function(err, req, res, next){
  console.error('Error:', err);
  res.status(500).render('error', { error: err });
};
