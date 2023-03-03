const postController = {};
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { uploadFileToBucket, getSignedUrl } = require("../storage");
const getUserId = require("../clerkManager");

postController.postPosts = async (req, res) => {
  const { description, userId } = req.body;
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
        userId: userId,
      },
    });

    console.log(newPost);

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
        likes: {
          _count: "desc",
        }
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Posts not found" });
  }
};

postController.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await prisma.imagePost.findMany({
      where: {
        userId: userId,
      },
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

postController.postComments = async (req, res) => {
  const { message, author, postId } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        message: message,
        author: author,
        postId: postId,
      },
    });
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Comment not created" });
  }
};

postController.getComments = async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Comments not found" });
  }
};

postController.postLikes = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const newLike = await prisma.like.create({
      data: {
        userId: userId,
        imagePost: {
          connect: {
            id: postId,
          },
        },
      },
    });
    console.log(newLike)
    res.status(200).json(newLike);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Like not created" });
  }
};

module.exports = postController;
