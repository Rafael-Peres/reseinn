"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const index_1 = require("./database/index");
const { PORT } = process.env;
new index_1.default();
const server = new server_1.default();
server.listen(Number(PORT) || 3333);
