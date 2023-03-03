const Express = require("express");
const router = Express.Router();
const postController = require("./controllers/postController");

const multer = require("multer");

//Set up multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/create",
  upload.fields([{ name: 'picture' }, { name: 'description' }]),
  postController.postPosts
);

router.get("/create", postController.getPosts)

router.get("/create/:userId", postController.getUserPosts)

router.post("/comments/:postId", postController.postComments)
router.get("/comments/:postId", postController.getComments)
router.post("/like/:postId", postController.postLikes)

module.exports = router;
