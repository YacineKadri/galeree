const Express = require('express');
const router = Express.Router();
const postController = require('./controllers/postController');


router.post('/create', postController.postPosts);


module.exports = router;

