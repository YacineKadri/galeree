const Express = require("express");
const app = Express();
const cors = require("cors");
const router = require("./router");
const port = 4000;

app.use(cors());
app.use(Express.json());
app.use(router);
app.listen(port, () => console.log(`Server is running on port ${port}`));
