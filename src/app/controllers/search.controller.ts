import { Request, Response, Router } from 'express';

import SearchService from '../services/search.service';

export default new (class SearchController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.get('/search', this.index);
    return this.router;
  }

  private async index(req: Request, res: Response): Promise<any> {
    try {
      const { search } = req.query;
      const posts = await SearchService.index(String(search));
      res.status(200).json(posts);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
