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
    successRedirect : '/trackers',
    failureRedirect : '/trackers'
  }
));
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/trackers');
});
router.get('/trackers/new', trackersCtrl.new)
router.get('/trackers', trackersCtrl.index)
router.get('/trackers/search', trackersCtrl.search);
router.get('/trackers/:id', trackersCtrl.show);
router.delete('/trackers/:id', trackersCtrl.delete);
router.put('/trackers/:id', trackersCtrl.update)
router.get('/trackers/:id/details', trackersCtrl.profile)

//router.post('/', trackersCtrl.create);

module.exports = router;
