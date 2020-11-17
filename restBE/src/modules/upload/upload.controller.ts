import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Connection } from 'mongoose';
import { diskStorage } from 'multer';
import * as StreamZip from "node-stream-zip";
import { UploadService } from './upload.service';


@Controller()
export class UploadController {

  constructor(
    private service: UploadService,
    @InjectConnection() private connection: Connection
  ) {
    this.connection.db.collections().then(collection => console.log(collection.map(coll => coll.collectionName)));
  }

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
