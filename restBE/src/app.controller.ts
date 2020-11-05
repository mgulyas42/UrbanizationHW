import {Controller, Get, Logger, Param, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { join, resolve } from 'path';
var Jimp = require('jimp');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/proxy/:z/:x/:y")
  getImage(@Req() request, @Res() res) {//10339,7330
    //if(request.params.z == 14 && request.params.x == 10339 && request.params.y == 7330) {
      console.log('SIKEEEEER');
      /*Jimp.read(resolve(join(__dirname, `./datas/1/01.bmp`))).then(image => {
        console.log(image);
        image.res
          res.download(image);
      });*/


      Jimp.read(resolve(join(__dirname, `./datas/1/01.bmp`)), function (err, test:any) {
          if (err) throw err;
          /*test.resize(256, 256)
              .quality(50)
              .write(__dirname + "./new.jpg");*/
          res.download(resolve(join(__dirname + "./new.jpg")));
      });
      //res.download(resolve(join(__dirname, `./datas/1/01.bmp`)));
      return;
    //}


    Logger.debug('send 01.bmp');
    Logger.debug(request.params)
    //res.download(resolve(join(__dirname, `./datas/${request.params.x}/01.bmp`)));
    //res.type('image/bmp').send(createReadStream(resolve(join(__dirname, './datas/1/01.bmp'))));
    res.send('almafa');
  }
}
