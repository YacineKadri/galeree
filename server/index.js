const Express = require("express");
const app = Express();
const cors = require("cors");
const router = require("./router");
const port = 4000;


app.use(cors());
app.use(Express.json());
// Set up multer middleware

app.use(router);
app.listen(port, () => console.log(`Server is running on port ${port}`));




