import { ApiError } from '../../middlewares/ApiError';
import Curriculum from '../models/curriculum.model';
import Candidate from '../models/candidate.model';
import Job from '../models/job.model';
import User from '../models/user.model';

export default class CandidateService {
  public static async index(): Promise<any> {
    try {
      const candidates = await Candidate.findAll({
        include: [{ model: Curriculum }, { model: User }],
      });
      return candidates;
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }

  public static show(id: number): Promise<Candidate> {
    return Candidate.findByPk(id, {
      include: [{ model: Curriculum }, { model: User }, { model: Job }],
    });
  }

  public static async store(body): Promise<Candidate> {
    const candidate = await Candidate.create({
      ...body,
    }).catch((error) => {
      throw new ApiError(error, 400);
    });

    return candidate;
  }

  public static async update(id: number, body): Promise<Candidate> {
    const candidate = await Candidate.findByPk(id);

    if (!candidate) {
      throw new ApiError('Candidato não localizado', 404);
    }

    await candidate.update({ ...body }).catch((error) => {
      throw new ApiError(error, 400);
    });
    await candidate.save();

    return Candidate.findByPk(candidate.id, {
      include: [{ model: Curriculum }],
    });
  }

  public static async delete(id: number): Promise<any> {
    const candidate = await Candidate.findByPk(id);

    if (!candidate) {
      throw new ApiError('Candidato não localizado para o ID informado', 404);
    }

    await candidate.destroy({ force: true });
  }

  public static async associateJobs(
    candidateId: number,
    jobId: number
  ): Promise<any> {
    const candidate = await Candidate.findByPk(candidateId);
    const job = await Job.findByPk(jobId);

    if (!job) {
      throw new ApiError('Vagas não localizadas para os IDS informados', 404);
    }
    await candidate.$add('jobs', job);

    return await Candidate.findByPk(candidateId, {
      include: [{ model: Job }],
    });
  }
}
