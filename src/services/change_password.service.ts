import * as bcryptjs from 'bcryptjs';
import { ApiError } from '../middlewares/ApiError';
import PasswordValidation from '../validation/user/change_password.schema';
import User from '../models/user.model';

export default class ChangePasswordService {
  /**
   * Change Password
   */

  public static async update(request, userId: string) {
    await new PasswordValidation().validate(request).catch(error => {
      throw new ApiError(error, 400);
    });

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
