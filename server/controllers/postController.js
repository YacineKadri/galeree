const postController = {};
const Prisma = require("../database/model");

postController.postPosts = async (req, res) => {
  try {
    const { description, picture} = req.body;
    console.log(req.body)
    if (description && picture) {
      newPost = await Prisma.ImagePost.create({
        data: {
          description: description,
          picture: picture,
        },
      });
    } else {
      throw new Error("Description or picture is missing");
    }
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Post not created" });
  }
};

module.exports = postController;
