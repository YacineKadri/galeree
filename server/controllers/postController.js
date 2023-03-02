const postController = {};
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { uploadFileToBucket, getSignedUrl } = require("../storage");


postController.postPosts = async (req, res) => {
  const { description } = req.body;
  const file = req.files.picture[0];

  try {
    // Save image file to Google Cloud Storage
    const fileName = `${Date.now()}_${file.originalname}`;
    await uploadFileToBucket(file, fileName);

     // Get signed URL for the image
     const imageUrl = await getSignedUrl(fileName);


    // Save image post to database
    const newPost = await prisma.imagePost.create({
      data: {
        description: description,
        picture: imageUrl,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Post not created" });
  }
};


postController.getPosts = async (req, res) => {
  try {
    const posts = await prisma.imagePost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Posts not found" });
  }
};

module.exports = postController;

