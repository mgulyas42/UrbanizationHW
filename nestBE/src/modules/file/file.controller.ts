import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { FileService } from "./file.service";
import { join, resolve } from "path";
import { Readable } from "stream";
import { DataService } from "../data/data.service";

@Controller('')
export class FileController {

  constructor(
    private fileService: FileService,
    private dataService: DataService
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, cb) => {
          return cb(null, file.originalname)
        }
      })
    }) as any
  )
  async uploadFile(@UploadedFile() file, @Res() res) {
    try {
      const datas = await this.dataService.getDataFromCsvs();
      await this.fileService.uploadFile(file, datas, res);
      res.send('OK');

    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Duplicated',
      }, HttpStatus.FORBIDDEN);
    }
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
