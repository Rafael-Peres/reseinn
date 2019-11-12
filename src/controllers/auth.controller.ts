import { Request, Response, Router } from 'express';
import AuthService from '../services/auth.service';

export default new (class AuthController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/login', this.login);

    return this.router;
  }
  private async login(req: Request, res: Response): Promise<any> {
    try {
      const login = await AuthService.login(req.body);

      res.status(200).json(login);
    } catch (error) {
      console.log(error);

      const { name: message, statusCode } = error;
      res.status(statusCode || 500).json({ message });
    }
  }
})();
