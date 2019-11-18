import * as bcryptjs from 'bcryptjs';

import { ApiError } from '../middlewares/ApiError';
import User from '../models/user.model';
import ForgotPasswordValidation from '../validation/auth/forgot_password.schema';

export default class ForgotPasswordService {
  /**
   * reset the user password
   */
  public static async forgot(request): Promise<any> {
    await new ForgotPasswordValidation().validate(request).catch(error => {
      throw new ApiError(error, 400);
    });
    const { username, document, email } = request;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new ApiError('Usuário não existe', 404);
    }

    if (user.document !== document) {
      throw new ApiError('Documento inválido', 400);
    }

    if (user.email !== email) {
      throw new ApiError('E-mail inválido', 400);
    }

    const newPassword = user.email.slice(0, 3) + user.document.slice(0, 3);

    user.password = await bcryptjs.hash(newPassword, 8);

    await user.save();

    return { newPassword: newPassword.toLowerCase() };
  }
}
