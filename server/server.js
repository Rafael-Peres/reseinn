"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const routes_1 = require("./routes/routes");
class Server {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.routes();
    }
    routes() {
        this.app.use('/', routes_1.default);
    }
    listen(port) {
        this.app.listen(port, () => console.log(`Server rodando na porta ${port}`));
    }
}
exports.default = Server;
