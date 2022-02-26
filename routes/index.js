const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/welcome', isLoggedIn, (req, res) => {
  const {currentUser} = req.session;
  console.log(currentUser);

  res.render('user/welcome', currentUser);
});

router.get('/main', isLoggedIn, (req, res) => {
  const {currentUser} = req.session;
  console.log(currentUser);

  res.render('user/main', currentUser);
});

router.get('/private', isLoggedIn, (req, res) => {
  const {currentUser} = req.session;
  console.log(currentUser);

  res.render('user/private', currentUser);
});

module.exports = router;
