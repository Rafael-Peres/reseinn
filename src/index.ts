import Server from './server';
import './database/index';

const server = new Server();
server.listen(3333);
