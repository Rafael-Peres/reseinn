import { Request, Response, Router } from 'express';
import CurriculumService from '../services/curriculum.service';

export default new (class CurriculumController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/:id/curriculum', this.store);
    this.router.get('/:id/curriculum', this.show);
    this.router.put('/:id/curriculum', this.update);
    this.router.delete('/:id/curriculum', this.delete);
    return this.router;
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const recruiter = await CurriculumService.show(Number(id));
      res.status(200).json(recruiter);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async store(req: Request, res: Response): Promise<any> {
    try {
      const recruiter = await CurriculumService.store(req.body);
      res.status(201).json(recruiter);
    } catch (error) {
      const { name: message, statusCode } = error;
      res.status(statusCode).json({ message });
    }
  }

  private async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const recruiter = await CurriculumService.update(Number(id), req.body);

      res.status(200).json(recruiter);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const recruiter = await CurriculumService.delete(Number(id));

      res.status(200).json({ recruiter });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
