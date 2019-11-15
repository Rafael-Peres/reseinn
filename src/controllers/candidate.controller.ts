import { Request, Response, Router } from 'express';
import CandidateService from '../services/candidate.service';

export default new (class CandidateController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/', this.store);
    this.router.get('/', this.index);
    this.router.get('/:id', this.show);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
    this.router.put('/:id/associateJobs', this.associateJobs);

    return this.router;
  }

  private async index(req: Request, res: Response): Promise<any> {
    try {
      const candidates = await CandidateService.index();
      res.status(200).json(candidates);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const candidade = await CandidateService.show(Number(id));
      res.status(200).json(candidade);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async store(req: Request, res: Response): Promise<any> {
    try {
      const candidade = await CandidateService.store(req.body);
      res.status(201).json(candidade);
    } catch (error) {
      const { name: message, statusCode } = error;
      res.status(statusCode).json({ message });
    }
  }

  private async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const candidade = await CandidateService.update(Number(id), req.body);

      res.status(200).json(candidade);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const candidade = await CandidateService.delete(Number(id));

      res.status(200).json({ candidade });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async associateJobs(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { jobId } = req.body;
      const userAssociate = await CandidateService.associateJobs(
        Number(id),
        jobId
      );
      res.status(200).json(userAssociate);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
