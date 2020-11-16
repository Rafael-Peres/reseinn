import * as bcryptjs from 'bcryptjs';
import { ApiError } from '../../middlewares/ApiError';

import User from '../models/user.model';

export default class ChangePasswordService {
  public static async update(request, userId: string) {
    const user = await User.findByPk(userId);

    const { currentPassword, newPassword, confirmation } = request;

    if (newPassword !== confirmation) {
      throw new ApiError('As senhas não combinam.', 400);
    }

    const validate = await bcryptjs.compare(currentPassword, user.password);

    if (!validate) {
      throw new ApiError('Senha inválida.', 400);
    }

    user.password = await bcryptjs.hash(newPassword, 8);

    await user.save();

    return user;
  }
}
