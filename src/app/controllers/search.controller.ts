import { Request, Response, Router } from 'express';

import SearchService from '../services/search.service';

export default new (class SearchController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.get('/candidates', this.indexUser);
    this.router.get('/jobs', this.indexJobs);
    return this.router;
  }

  private async indexUser(req: Request, res: Response): Promise<any> {
    try {
      const { search } = req.query;
      const user = await SearchService.indexUser(String(search));
      res.status(200).json(user);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async indexJobs(req: Request, res: Response): Promise<any> {
    try {
      const { search } = req.query;
      const job = await SearchService.indexJobs(String(search));
      res.status(200).json(job);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
