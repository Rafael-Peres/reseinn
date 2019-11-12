import { ApiError } from '../middlewares/ApiError';
import Recruiter from '../models/recruiter.model';
import Job from '../models/job.model';

export default class RecruiterService {
  public static async index(): Promise<any> {
    try {
      const recruiters = await Recruiter.findAll({});
      return recruiters;
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }

  public static show(id: number): Promise<Recruiter> {
    return Recruiter.findByPk(id, {});
  }

  public static async store(body): Promise<Recruiter> {
    const recruiter = await Recruiter.create({
      ...body,
    }).catch(error => {
      throw new ApiError(error, 400);
    });

    return recruiter;
  }

  public static async update(id: number, body): Promise<Recruiter> {
    const recruiter = await Recruiter.findByPk(id);

    if (!recruiter) {
      throw new ApiError('Usuário não localizado', 404);
    }

    await recruiter.update({ ...body }).catch(error => {
      throw new ApiError(error, 400);
    });
    await recruiter.save();

    return Recruiter.findByPk(recruiter.id, {});
  }

  public static async delete(id: number): Promise<any> {
    const recruiter = await Recruiter.findByPk(id);

    if (!recruiter) {
      throw new ApiError('Usuário não localizado para o ID informado', 404);
    }

    await recruiter.destroy({ force: true });
  }

  public static async associateJobs(
    recruiterId: number,
    jobId: number
  ): Promise<any> {
    const recruiter = await Recruiter.findByPk(recruiterId);
    const job = await Job.findByPk(jobId);

    if (job) {
      throw new ApiError('Vagas não localizadas para os IDS informados', 404);
    }
    await recruiter.$set('jobs', job);

    return Recruiter.findByPk(recruiterId, {
      include: [{ model: Job }],
    });
  }
}
