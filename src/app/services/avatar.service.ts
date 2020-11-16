import * as express from 'express';
import Avatar from '../models/avatar.model';
import { ApiError } from '../../middlewares/ApiError';
import UploadService from './upload.service';
import StorageService from './storage.service';

export default class AvatarService {
  public static async show(userId): Promise<Avatar> {
    const avatar = await Avatar.findOne({ where: { userId } });

    if (!avatar) {
      throw new ApiError('Foto não encontrada.', 404);
    }

    return avatar;
  }

  public static async store(body: express.Request, userId: number) {
    const avatarExists = await Avatar.findOne({ where: { userId } });

    if (avatarExists) {
      throw new ApiError('usuário ja possui uma foto cadastrada', 400);
    }

    const { file } = await UploadService.store(body, 'Avatar', {
      allowExtenstions: ['.png', '.jpg', '.jpeg'],
      maxSize: 1024 * 2048,
    });

    const avatar = await Avatar.create({
      filename: file.filename,
      extension: file.originalname.substr(file.originalname.lastIndexOf('.')),
      path: `/Avatar/${file.filename}`,
      userId,
    }).catch((error) => {
      throw new ApiError(error, 400);
    });

    return avatar.save();
  }

  public static async update(userId: number, body) {
    const { file } = await UploadService.store(body, 'Avatar', {
      allowExtenstions: ['.png', '.jpg', '.jpeg'],
      maxSize: 1024 * 2048,
    });

    const avatar = await Avatar.findOne({ where: { userId } });

    await StorageService.remove(avatar.path);

    await avatar
      .update({
        filename: file.filename,
        extension: file.originalname.slice(-4),
        path: `/Avatar/${file.filename}`,
      })
      .catch((error) => {
        throw new ApiError(error, 400);
      });

    return avatar.save();
  }

  public static async delete(userId: number): Promise<any> {
    const avatar = await Avatar.findOne({ where: { userId } });
    StorageService.remove(avatar.path);
    return avatar.destroy({ force: true });
  }
}
