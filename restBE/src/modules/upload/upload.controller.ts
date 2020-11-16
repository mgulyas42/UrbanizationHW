// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';

const StreamZip = require('node-stream-zip');

@Controller()
export class UploadController {

  constructor(private service: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './dist/uploads',
      filename: (req, file, cb) => {
        return cb(null, file.originalname)
      }
    })
  }))
  uploadFile(@UploadedFile() file) {
    const zip = new StreamZip({
      file: file.path,
      storeEntries: true
    });


    zip.on('ready', () => {

      const dataCSV = this.service.fetchDataCSV(zip);

      const directories = dataCSV.map(row => row[0]).splice(1);

      const bmpFiles = this.service.fetchBMPs(zip, directories);

      const teachingCSVs = this.service.fetchTeachingCSVs(zip, directories);

      /*
        TODO: Upload to database
       */

      console.log(dataCSV);

      zip.close()
    });
  }
}
