const Express = require("express");
const router = Express.Router();
const postController = require("./controllers/postController");

const multer = require("multer");
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

module.exports = router;
