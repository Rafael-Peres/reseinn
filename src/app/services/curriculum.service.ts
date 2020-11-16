import * as express from 'express';
import { ApiError } from '../../middlewares/ApiError';
import UploadService from './upload.service';
import StorageService from './storage.service';
import Curriculum from '../models/curriculum.model';

export default class CurriculumService {
  public static async show(candidateId): Promise<Curriculum> {
    const curriculum = await Curriculum.findOne({ where: { candidateId } });

    if (!curriculum) {
      throw new ApiError('Curriculo nao encontrado.', 404);
    }

    return curriculum;
  }

  public static async store(body: express.Request, candidateId: number) {
    const curriculumExists = await Curriculum.findOne({
      where: { candidateId },
    });

    if (curriculumExists) {
      throw new ApiError('candidado ja possui curriculo cadastrado', 400);
    }

    const { file } = await UploadService.store(body, 'Curriculum', {
      allowExtenstions: ['.docx', '.doc', '.pdf'],
      maxSize: 1024 * 2048,
    });

    const curriculum = await Curriculum.create({
      filename: file.filename,
      extension: file.originalname.substr(file.originalname.lastIndexOf('.')),
      path: `/Curriculum/${file.filename}`,
      candidateId,
    }).catch((error) => {
      throw new ApiError(error, 400);
    });

    return curriculum.save();
  }

  public static async update(candidateId: number, body) {
    const { file } = await UploadService.store(body, 'Curriculum', {
      allowExtenstions: ['.docx', '.doc', '.pdf'],
      maxSize: 1024 * 2048,
    });

    const curriculum = await Curriculum.findOne({ where: { candidateId } });

    await StorageService.remove(curriculum.path);

    await curriculum
      .update({
        filename: file.filename,
        extension: file.originalname.slice(-4),
        path: `/Curriculum/${file.filename}`,
      })
      .catch((error) => {
        throw new ApiError(error, 400);
      });

    return curriculum.save();
  }

  public static async delete(candidateId: number): Promise<any> {
    const curriculum = await Curriculum.findOne({ where: { candidateId } });
    StorageService.remove(curriculum.path);
    return curriculum.destroy({ force: true });
  }
}
