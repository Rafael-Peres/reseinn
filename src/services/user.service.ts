import User from '../models/user.model';
import { ApiError } from '../middlewares/ApiError';
import Avatar from '../models/avatar.model';
import * as bcryptjs from 'bcryptjs';

export default class UserService {
  public static async index(): Promise<any> {
    try {
      const users = await User.findAll({
        include: [{ model: Avatar }],
        attributes: { exclude: ['password'] },
      });
      return users;
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }

  public static show(id: number): Promise<User> {
    return User.findByPk(id, {
      include: [{ model: Avatar }],
      attributes: { exclude: ['password'] },
    });
  }

  public static async store(body): Promise<User> {
    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }
    const user = await User.create({
      ...body,
    }).catch(error => {
      throw new ApiError(error, 400);
    });

    return user;
  }

  public static async update(id: number, body): Promise<User> {
    const user = await User.findByPk(id);

    if (!user) {
      throw new ApiError('Usuário não localizado', 404);
    }

    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }

    await user.update({ ...body }).catch(error => {
      throw new ApiError(error, 400);
    });
    await user.save();

    return User.findByPk(user.id, {
      include: [{ model: Avatar }],
      attributes: { exclude: ['password'] },
    });
  }

  public static async delete(id: number): Promise<any> {
    const user = await User.findByPk(id);

    if (!user) {
      throw new ApiError('Usuário não localizado para o ID informado', 404);
    }

    await user.destroy({ force: true });
  }

  public static async hashPassword(password) {
    if (password) {
      return await bcryptjs.hash(password, 8);
    }
  }
}
