import { Op } from 'sequelize';
import { ApiError } from '../../middlewares/ApiError';
import Candidate from '../models/candidate.model';
import Curriculum from '../models/curriculum.model';
import Job from '../models/job.model';
import User from '../models/user.model';

export default class SearchService {
  public static async indexUser(search: string): Promise<any> {
    try {
      const candidates = await Candidate.findAll({
        include: [{ model: User }, { model: Curriculum }],
        where: {
          [Op.or]: {
            profession: {
              [Op.iLike]: `%${search}%`,
            },
            levelTraining: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
      });
      return candidates;
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }

  public static async indexJobs(search: string): Promise<any> {
    try {
      const jobs = await Job.findAll({
        where: {
          [Op.or]: {
            company: {
              [Op.iLike]: `%${search}%`,
            },
            title: {
              [Op.iLike]: `%${search}%`,
            },
            workSchedule: {
              [Op.iLike]: `%${search}%`,
            },
            state: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
      });
      return jobs;
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }
}
