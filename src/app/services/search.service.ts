import { Op } from 'sequelize';
import { ApiError } from '../../middlewares/ApiError';
import Candidate from '../models/candidate.model';
import Curriculum from '../models/curriculum.model';
import User from '../models/user.model';

export default class SearchService {
  public static async index(search: string): Promise<any> {
    try {
      const posts = await User.findAll({
        // attributes: ['profession'],
        include: [
          {
            model: Candidate,
            include: [{ model: Curriculum }],
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
          },
        ],
      });
      return posts;
    } catch (error) {
      throw new ApiError(error, 500);
    }
  }
}
