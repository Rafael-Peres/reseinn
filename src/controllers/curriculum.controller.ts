import { Request, Response, Router } from 'express';
import CurriculumService from '../services/curriculum.service';

export default new (class CurriculumController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/:id/curriculum', this.uploadFile);
    this.router.get('/:id/curriculum', this.show);
    this.router.put('/:id/curriculum', this.updateFile);
    this.router.delete('/:id/curriculum', this.delete);
    return this.router;
  }

  public async uploadFile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const curriculum = await CurriculumService.store(req, Number(id));

      res.status(201).json(curriculum);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const candidate = await CurriculumService.show(Number(id));
      res.status(200).json(candidate);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async updateFile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const candidate = await CurriculumService.update(Number(id), req);

      res.status(200).json(candidate);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const candidate = await CurriculumService.delete(Number(id));

      res.status(200).json({ candidate });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
