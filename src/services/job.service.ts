import { ApiError } from '../middlewares/ApiError';
import Job from '../models/job.model';

export default class JobService {
  public static async index(): Promise<any> {
    try {
      const jobs = await Job.findAll({});
      return jobs;
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }

  public static show(id: number): Promise<Job> {
    return Job.findByPk(id, {});
  }

  public static async store(body): Promise<Job> {
    const job = await Job.create({
      ...body,
    }).catch(error => {
      throw new ApiError(error, 400);
    });

    return job;
  }

  public static async update(id: number, body): Promise<Job> {
    const job = await Job.findByPk(id);

    if (!job) {
      throw new ApiError('Vaga não localizada', 404);
    }

    await job.update({ ...body }).catch(error => {
      throw new ApiError(error, 400);
    });
    await job.save();

    return Job.findByPk(job.id);
  }

  public static async delete(id: number): Promise<any> {
    const job = await Job.findByPk(id);

    if (!job) {
      throw new ApiError('Vaga não localizada para o ID informado', 404);
    }

    await job.destroy({ force: true });
  }
}
