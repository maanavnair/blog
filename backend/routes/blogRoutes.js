const {Router} = require('express');
const blogControllers = require('../controllers/blogControllers');

const router = Router();
router.post('/createblog', blogControllers.create_blog);
router.get('/home', blogControllers.home);
router.get('/blog/:id', blogControllers.blog);
router.delete('/deleteblog/:id', blogControllers.delete_blog);
router.put('/edit/:id', blogControllers.edit_blog);

module.exports = router;