import Server from './server';
import Connection from './database/index';

const PORT = process.env.PORT || 3333;
new Connection();

const server = new Server();
server.listen(Number(PORT));
