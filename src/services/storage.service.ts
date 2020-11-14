import * as fs from 'fs';
import { ApiError } from '../middlewares/ApiError';

export default class StorageService {
  public static remove(path: string): void {
    try {
      return fs.unlinkSync(`./storage${path}`);
    } catch (error) {
      throw new ApiError('Não é posssivel encontrar o arquivo', 404);
    }
  }
}
