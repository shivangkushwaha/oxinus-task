require('./env/env.js')
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logger = require("./utils/winston");
var http = require("http");
const db = require("./models");
const Fs = require("fs");
const app = express();
const appConstant =require("./appConstant.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.NODE_PORT || 8080;


var corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));
let routes = []
let routerPath = process.cwd() + "/routes";
Fs.readdirSync(routerPath).filter(function (file) {
    let routers_data = require(routerPath + `/${file}`);
    routes.push(routers_data);
});



const server = http.createServer(app);
server.listen(PORT, async () => {
    try {
        process.env.NODE_ENV === "test"
            ? await db.sequelize.sync({ force: true })
            : await db.sequelize.sync({ force: false }); 
            logger.info(`Database Connected Successfully`);
            logger.info(`Server is running on port http://localhost:${PORT}.`);
    } catch (error) {
        console.log("Error in Connecting Database", error.toString());
        process.exit(1);
    }
});

app.get("/", (req, res) => {
    res.status(appConstant.STATUS_CODE.OK).send({ message : "Home Page" });
});


app.use("/api", routes);

