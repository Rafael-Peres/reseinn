import { Request, Response, Router } from 'express';
import AuthService from '../services/auth.service';
import ForgotPasswordService from '../services/forgot_password.service';

export default new (class AuthController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post('/login', this.login);
    this.router.post('/forgot', this.forgot);

    return this.router;
  }

  private async login(req: Request, res: Response): Promise<any> {
    try {
      const login = await AuthService.login(req.body);

      res.status(200).json(login);
    } catch (error) {
      const { name: message, statusCode } = error;
      res.status(statusCode || 500).json({ message });
    }
  }

  private async forgot(req: Request, res: Response): Promise<any> {
    try {
      const userPassword = await ForgotPasswordService.forgot(req.body);
      res.status(200).json(userPassword);
    } catch (error) {
      const { name: message, statusCode } = error;
      res.status(statusCode).json({ message });
    }
  }
})();
