import { Request, Response, Router } from 'express';
import AvatarService from '../services/avatar.service';

export default new (class AvatarController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/:id/avatar', this.uploadFile);
    this.router.get('/:id/avatar', this.show);
    this.router.put('/:id/avatar', this.updateFile);
    this.router.delete('/:id/avatar', this.delete);
    return this.router;
  }

  public async uploadFile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const avatar = await AvatarService.store(req, Number(id));

      res.status(201).json(avatar);
    } catch (error) {
      console.log(error);
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await AvatarService.show(Number(id));
      res.status(200).json(user);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async updateFile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await AvatarService.update(Number(id), req);

      res.status(200).json(user);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await AvatarService.delete(Number(id));

      res.status(200).json({ user });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
