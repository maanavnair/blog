const { Router } = require('express');
const authControllers = require('../controllers/authControllers');

const router = Router();
router.post('/signup', authControllers.signup_post);
router.post('/login', authControllers.login_post);
router.post('/logout', authControllers.logout);
router.get('/user', authControllers.userProfile);

module.exports = router;