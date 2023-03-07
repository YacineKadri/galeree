const userController = {}
const {
    PrismaClient
  } = require("@prisma/client");
  const prisma = new PrismaClient();

userController.getUsers = async (req, res) => {
    try {
        const uniqueAuthors = await prisma.imagePost.findMany({
            select: {
                author: true
            },
            distinct: ['author']
        });
        console.log(uniqueAuthors)
        res.status(200).json(uniqueAuthors);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Users not found"
        });
    }
};


module.exports = userController;
