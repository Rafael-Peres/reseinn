import Server from './server';
import Connection from './database/index';

const { PORT } = process.env;

new Connection();

const server = new Server();
server.listen(Number(PORT));
