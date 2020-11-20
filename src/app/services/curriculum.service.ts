import { ApiError } from '../../middlewares/ApiError';
import Curriculum from '../models/curriculum.model';

export default class CurriculumService {
  public static async show(candidateId: number): Promise<Curriculum> {
    const curriculum = await Curriculum.findByPk(candidateId);
    if (!curriculum) {
      throw new ApiError('Curriculo nao encontrado.', 404);
    }
    return curriculum;
  }

  public static async store(body): Promise<Curriculum> {
    const curriculum = await Curriculum.create({
      ...body,
    }).catch((error) => {
      throw new ApiError(error, 400);
    });

    return curriculum;
  }

  public static async update(body, candidateId: number) {
    const curriculum = await Curriculum.findByPk(candidateId);

    if (!curriculum) {
      throw new ApiError('Curriculo não localizado para o ID informado', 404);
    }

    await curriculum.update({ ...body }).catch((error) => {
      throw new ApiError(error, 400);
    });

    return curriculum;
  }

  public static async delete(candidateId: number): Promise<any> {
    const curriculum = await Curriculum.findByPk(candidateId);

    if (!curriculum) {
      throw new ApiError('Curriculo não localizado para o ID informado', 404);
    }

    return curriculum.destroy({ force: true });
  }
}
