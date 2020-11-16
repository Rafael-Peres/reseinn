import { Request, Response, Router } from 'express';
import RecruiterService from '../services/recruiter.service';

export default new (class RecruiterController {
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
      const recruiters = await RecruiterService.index();
      res.status(200).json(recruiters);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const recruiter = await RecruiterService.show(Number(id));
      res.status(200).json(recruiter);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async store(req: Request, res: Response): Promise<any> {
    try {
      const recruiter = await RecruiterService.store(req.body);
      res.status(201).json(recruiter);
    } catch (error) {
      const { name: message, statusCode } = error;
      res.status(statusCode).json({ message });
    }
  }

  private async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const recruiter = await RecruiterService.update(Number(id), req.body);

      res.status(200).json(recruiter);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const recruiter = await RecruiterService.delete(Number(id));

      res.status(200).json({ recruiter });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async associateJobs(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { jobId } = req.body;
      const userAssociate = await RecruiterService.associateJobs(
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
