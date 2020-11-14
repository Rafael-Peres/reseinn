import { ApiError } from './../middlewares/ApiError';
import * as express from 'express';
import * as multer from 'multer';
import * as faker from 'faker';
import * as fs from 'fs';
import { resolve } from 'path';

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
      destination: function(req, file, cb) {
        cb(null, `./storage/${path}`);
      },
      filename: function(req, file, cb) {
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
          ) {
          } else {
            const erro = new Error();
            erro.message = 'Extensão não permitida';
            cb(erro, false);
          }
        }
        cb(null, true);
      },
    }).single('file');

    return new Promise((resolve, reject) => {
      multerSingle(request, undefined, async error => {
        if (error) {
          reject(new ApiError(error.message, 400));
        }
        resolve(request);
      });
    });
  }

  private static async verifyFolder(path: string) {
    fs.readdirSync(resolve(__dirname, '..', '..', 'storage', path));
  }
}
