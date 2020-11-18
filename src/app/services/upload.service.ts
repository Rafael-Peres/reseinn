import * as express from 'express';
import * as multer from 'multer';
import * as faker from 'faker';
import * as fs from 'fs';
import { resolve } from 'path';
import { ApiError } from '../../middlewares/ApiError';

export interface IOptions {
  allowExtenstions?: Array<string>;
  maxSize?: number;
}

export default class UploadService {
  public static async store(
    request: express.Request,
    path: string,
    options?: IOptions
  ): Promise<any> {
    this.verifyFolder(path);
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, `./storage/${path}`);
      },
      filename(req, file, cb) {
        cb(
          null,
          faker.random.uuid() +
            file.originalname
              .substr(file.originalname.lastIndexOf('.'))
              .toLowerCase()
        );
      },
    });

    const multerSingle = multer({
      storage,
      limits: { fileSize: options.maxSize ? options.maxSize : 1024 * 2048 },
      fileFilter: (req, file, cb) => {
        if (options.allowExtenstions) {
          const allowExtentions = [...options.allowExtenstions];

          if (
            allowExtentions.includes(
              file.originalname
                .substr(file.originalname.lastIndexOf('.'))
                .toLowerCase()
            )
            // eslint-disable-next-line no-empty
          ) {
          } else {
            const erro = new Error();
            erro.message = 'Extensão não permitida';
            cb(null, false);
          }
        }
        cb(null, true);
      },
    }).single('file');

    // eslint-disable-next-line no-shadow
    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async (error) => {
        if (error) {
          reject(new ApiError(error.message, 400));
        }
        resolve(request);
      });
    });
  }

  private static async verifyFolder(path: string) {
    fs.readdirSync(resolve(__dirname, '..', '..', '..', 'storage', path));
  }
}
