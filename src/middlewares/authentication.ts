import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../app/models/user.model';

// eslint-disable-next-line import/prefer-default-export
export const authMiddleware = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Nenhum token informado' });
    return;
  }
  const [, token] = authHeader.split(' ');

  jwt.verify(
    token,
    '6d28bf37110eb766d1e5f5a93a7bb1fe',
    async (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: err.message });
        return;
      }
      // eslint-disable-next-line dot-notation
      req['user'] = decoded;

      const user = await User.findByPk(decoded.userId);
      if (!user) {
        res.status(401).json({ message: 'Usuário inexistente' });
        return;
      }
      next();
    }
  );
};
