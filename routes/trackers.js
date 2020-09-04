var express = require('express');
var router = express.Router();
const passport = require('passport');
const trackersCtrl = require('../controllers/tracker');





/* GET users listing. */
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
router.get('/new', trackersCtrl.new)
router.get('/', trackersCtrl.index)
router.get('/search', trackersCtrl.search);
router.get('/:id', trackersCtrl.show);
router.delete('/:id', trackersCtrl.delete);
router.put('/:id', trackersCtrl.update)
router.get('/:id/details', trackersCtrl.profile)

//router.post('/', trackersCtrl.create);

module.exports = router;
