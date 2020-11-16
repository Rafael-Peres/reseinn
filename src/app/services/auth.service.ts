import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ApiError } from '../../middlewares/ApiError';
import User from '../models/user.model';

export default class AuthService {
  public static async login(body): Promise<any> {
    const { username, password } = body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      throw new ApiError('Usuário não localizado.', 404);
    }

    const validate = await bcryptjs.compare(password, user.password);

    if (!validate) {
      throw new ApiError('Senha inválida.', 400);
    }

    const token = this.getToken(user);

    return {
      user: {
        ...user.toJSON(),
        password: undefined,
      },
      token,
    };
  }

  private static getToken(user: User) {
    try {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        '6d28bf37110eb766d1e5f5a93a7bb1fe',
        { expiresIn: '1d' }
      );
      return token;
    } catch (error) {
      console.log(error);
      throw new ApiError('Não foi possível gerar o token', 500);
    }
  }
}
