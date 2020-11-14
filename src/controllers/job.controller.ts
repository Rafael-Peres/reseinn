import { Request, Response, Router } from 'express';
import JobService from '../services/job.service';

export default new (class UserController {
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
    return this.router;
  }

  private async index(req: Request, res: Response): Promise<any> {
    try {
      const jobs = await JobService.index();
      res.status(200).json(jobs);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const job = await JobService.show(Number(id));
      res.status(200).json(job);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async store(req: Request, res: Response): Promise<any> {
    try {
      const job = await JobService.store(req.body);
      res.status(201).json(job);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const job = await JobService.update(Number(id), req.body);

      res.status(200).json(job);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const job = await JobService.delete(Number(id));

      res.status(200).json({ job });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
