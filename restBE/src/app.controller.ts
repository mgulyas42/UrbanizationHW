import { Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { join, resolve } from 'path';
import * as AdmZip from "adm-zip";
import { Readable } from "stream";
import { Parser } from 'json2csv';

@Controller()
export class AppController {

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

  @Post("/almafa")
  generateZip(@Req() request, @Res() res) {
    let zip = new AdmZip();

    request.body.forEach((item,i) => {
      const itemFolder = resolve(join(__dirname, `./datas/${item.packageName}/${item.id}`));
      zip.addLocalFolder(itemFolder, `${i+1}`);
      item.id = i+1;
      delete item.packageName;
    })

    const opts = { header: false, delimiter: ';', quote: '' };

    const parser = new Parser(opts);
    const csv = parser.parse(request.body);
    zip.addFile('data.csv', Buffer.alloc(csv.length, csv))

    let stream = new Readable();
    stream.push(zip.toBuffer());
    stream.push(null);

    res.set({'Content-Type': 'application/zip', 'Content-Length': zip.toBuffer().length})
    stream.pipe(res);
  }
}
