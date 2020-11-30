import { Request, Response, Router } from 'express';
import CurriculumService from '../services/curriculum.service';

export default new (class CurriculumController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/', this.store);
    this.router.get('/:candidateId', this.show);
    this.router.put('/:candidateId', this.update);
    this.router.delete('/:candidateId', this.delete);
    return this.router;
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { candidateId } = req.params;
      const curriculum = await CurriculumService.show(Number(candidateId));
      res.status(200).json(curriculum);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async store(req: Request, res: Response): Promise<any> {
    try {
      const curriculum = await CurriculumService.store(req.body);
      res.status(201).json(curriculum);
    } catch (error) {
      const { name: message, statusCode } = error;
      res.status(statusCode).json({ message });
    }
  }

  private async update(req: Request, res: Response): Promise<any> {
    try {
      const { candidateId } = req.params;
      const curriculum = await CurriculumService.update(
        Number(candidateId),
        req.body
      );

      res.status(200).json(curriculum);
    } catch (error) {
      console.log(error);

      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { candidateId } = req.params;
      const curriculum = await CurriculumService.delete(Number(candidateId));

      res.status(200).json({ curriculum });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
