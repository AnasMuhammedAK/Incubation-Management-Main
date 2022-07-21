const express = require('express')
const router = express.Router()

const {registerUser,loginUser,getmyform, addApplication} = require('../helpers/user-helpers')
const { protect } = require('../middlewares/authMiddleware')

router.post('/signup', registerUser)
router.post('/login',loginUser)
router.post('/addApplication',addApplication)
router.get('/getmyform/:id',getmyform)
router.get("/logout", (req, res) => {
  res.status(200).send();
});

module.exports = router
