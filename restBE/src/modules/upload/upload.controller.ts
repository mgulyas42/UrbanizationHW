import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join, resolve } from "path";
import { diskStorage } from 'multer';
import * as extract from "extract-zip";
import * as fs from "fs";

@Controller()
export class UploadController {

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('filename', {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, cb) => {
          return cb(null, file.originalname)
        }
      })
    }) as any
    // workaround while the FileInterceptor gives back type not directly the interceptor (but it works)
  )
  async uploadFile(@UploadedFile() file) {
    await extract(file.path, {dir: resolve(join(__dirname, `../../datas/${file.filename.split('.').slice(0, -1).join('.')}`))})
    await fs.unlinkSync(file.path);
  }
}
