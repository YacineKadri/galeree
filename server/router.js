const Express = require("express");
const router = Express.Router();
const postController = require("./controllers/postController");

const multer = require("multer");
// const multerGoogleStorage = require("multer-cloud-storage");

// var uploadHandler = multer({
//   storage: multerGoogleStorage.storageEngine({
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//     bucket: "galeree",
//     projectId: "turing-ember-379411",
//     keyFilename: "./key.json",

//   })
// });

//Set up multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage
});

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
router.put("/edit/:postId", postController.editPost)
router.delete("/delete/:postId", postController.deletePost)
router.get('/galeree-posts/:userName', postController.getUserGaleree)

module.exports = router;




// TODO : WORK ON THE PUTTING THE MULTER STORAGE ONLINE

// const Express = require("express");
// const router = Express.Router();
// const postController = require("./controllers/postController");
// const fs = require("fs");

// const multer = require("multer");

// //Set up multer middleware
// const {
//   Storage
// } = require('@google-cloud/storage');
// const storage = new Storage({
//   keyFilename: './key.json',
// });

// const bucketName = 'galeree'; // Replace with your bucket name
// const bucket = storage.bucket(bucketName);

// const storageMiddleware = multer({
//   storage: multer.memoryStorage(),
//   fileFilter: function (req, file, cb) {
//     // Gonna try to implement AI Generated Content Detector
//     cb(null, true);
//   }
// });

// const uploadFile = (file) => {
//   const {
//     originalname,
//     buffer
//   } = file;

//   console.log(originalname)

//   return new Promise((resolve, reject) => {
//     const blob = bucket.file(originalname);
//     const blobStream = blob.createWriteStream({
//       resumable: false
//     },);
//     console.log(blobStream)

//     blobStream.on('finish', () => {
//         const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
//         resolve(publicUrl);
//       })
//       .on('error', (err) => {
//         console.log(`Unable to upload file ${originalname}: ${err}`);
//         reject(err);
//       })
//       .end(buffer);
//   });
// }

// const upload = storageMiddleware.fields([{
//   name: 'picture'
// }, {
//   name: 'description'
// }]);
// const uploadToGCS = async (req, res, next) => {
//   try {
//     if (req.files) {
//       const files = Object.values(req.files);
//       const urls = [];

//       for (let i = 0; i < files.length; i++) {
//         const fileArray = files[i];

//         for (let j = 0; j < fileArray.length; j++) {
//           const file = fileArray[j];
//           const publicUrl = await uploadFile(file);
//           urls.push(publicUrl);
//         }
//       }

//       req.body.urls = urls;
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// router.post(
//   "/create",
//   upload,
//   uploadToGCS,
//   postController.postPosts
// );

// router.get("/create", postController.getPosts)

// router.get("/create/:userId", postController.getUserPosts)

// router.post("/comments/:postId", postController.postComments)
// router.get("/comments/:postId", postController.getComments)
// router.post("/like/:postId", postController.postLikes)
// router.put("/edit/:postId", postController.editPost)
// router.delete("/delete/:postId", postController.deletePost)

module.exports = router;