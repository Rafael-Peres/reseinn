import Server from './server';
import Connection from './database/index';

new Connection();

const server = new Server();
server.listen(3535);
