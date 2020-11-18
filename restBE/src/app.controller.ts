import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { join, resolve } from 'path';

@Controller()
export class AppController {

  @Get("/debug/:z/:x/:y")
  debugTiles(@Req() request, @Res() res) {
    Logger.debug(request.params);
    Logger.debug(`longitude: ${this.tile2long(request.params.x, request.params.z)}`);
    Logger.debug(`longitude: ${this.tile2lat(request.params.y, request.params.z)}`);

    res.send('almafa');
  }


  /*@Get("/proxy/:z/:x/:y")
  getImage(@Req() request, @Res() res) {//10339,7330

    /*TODO:
      Vectorlayer, arra helyezek egy pontot, mint a markert, oda rakjuk be a layert.
      Az eredeti képek a google térképről származnak, nem kell pontosan megjelenniük.
      A skálázással / zoomszinttel frontend oldalon kell majd játszani, a kép középpontja az adott latlong


    if(request.params.z == 16 && request.params.x == 36151 && request.params.y == 22999) {
      res.download(resolve(join(__dirname, `./datas/1/01.bmp`)));
      Logger.debug(request.params);
      Logger.debug(`calculated longitude: ${this.tile2long(request.params.x, request.params.z)}`);
      Logger.debug(`calculated latitude: ${this.tile2lat(request.params.y, request.params.z)}`);
      Logger.debug(`Original latLong: ${[47.190287,18.584784]}`);
    }
    else {
      res.send('almafa');
    }
  } */

  @Get("/almafa/:path/:id")
  getImage(@Req() request, @Res() res) {
    const imgPath = resolve(join(__dirname, `./datas/${request.params.path}/${request.params.id}/01.bmp`));
    res.download(imgPath);
    Logger.log(`Image loaded: ${imgPath}`);
  }

  tile2long(x, z): number {
    return (x / Math.pow(2, z) * 360 - 180);
  }

  tile2lat(y, z): number {
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
  }
}
