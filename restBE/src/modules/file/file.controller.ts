import { Controller, Get, Logger, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { FileService } from "./file.service";
import { join, resolve } from "path";
import { Readable } from "stream";

@Controller('')
export class FileController {

  constructor(
    private fileService: FileService
  ) {}

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
  )
  async uploadFile(@UploadedFile() file) {
    await this.fileService.uploadFile(file);
  }

  @Post("download")
  downloadZip(@Req() request, @Res() res) {
    const zip = this.fileService.downloadZip(request.body);

    let stream = new Readable();
    stream.push(zip.toBuffer());
    stream.push(null);

    res.set({'Content-Type': 'application/zip', 'Content-Length': zip.toBuffer().length});
    stream.pipe(res);
  }

  @Get("/image/:path/:id")
  getImage(@Req() request, @Res() res) {
    const imgPath = resolve(join(__dirname, `./../../datas/${request.params.path}/${request.params.id}/01.bmp`));
    res.download(imgPath);
    Logger.log(`Image loaded: ${imgPath}`);
  }
}
