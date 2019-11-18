import { Request, Response, Router } from 'express';
import UserService from '../services/user.service';
import ChangePasswordService from '../services/change_password.service';

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
    this.router.put('/:id/password', this.updatePassword);
    return this.router;
  }

  private async index(req: Request, res: Response): Promise<any> {
    try {
      const users = await UserService.index();
      res.status(200).json(users);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async show(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await UserService.show(Number(id));
      res.status(200).json(user);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async store(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.store(req.body);
      res.status(201).json(user);
    } catch (error) {
      const { name: message, statusCode } = error;
      res.status(statusCode).json({ message });
    }
  }

  private async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await UserService.update(Number(id), req.body);

      res.status(200).json(user);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.delete(Number(id));

      res.status(200).json({ user });
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }

  private async updatePassword(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await ChangePasswordService.update(req.body, id);

      res.status(200).json(user);
    } catch (error) {
      const { name: message, statusCode } = error;

      res.status(statusCode).json({ message });
    }
  }
})();
