import Server from './server';
import Connection from './database/index';

const PORT = process.env.PORT || 3333 || 8080;
new Connection();

const server = new Server();
server.listen(PORT);
