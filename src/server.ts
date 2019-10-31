import express from 'express';
import routes from './routes/routes';

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  routes() {
    this.app.use('/api', routes);
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`Server rodando na porta ${port}`));
  }
}
