import { HttpException, HttpStatus, Injectable, UploadedFile } from '@nestjs/common';
import * as extract from "extract-zip";
import { join, resolve } from "path";
import * as path from "path";
import * as fs from "fs";
import * as AdmZip from "adm-zip";
import { Parser } from "json2csv";
import { Data } from "../data/models/data";
import * as CSV from 'csv-string';

const StreamZip = require('node-stream-zip');

@Injectable()
export class FileService {

  public uploadFile(@UploadedFile() file, datas: { [key: string]: Data[] }, res) {
    return new Promise((resolve, reject) => {
      const zip = new StreamZip({
        file: file.path,
        storeEntries: true
      });

      return zip.on('ready', async () => {
        const dataCSV = this.fetchCSVFromZip(zip);
        let duplicatedFound: boolean = false;
        dataCSV.forEach((data) => {
          Object.keys(datas).forEach((key) => {
            const duplicated = datas[key].filter((d) => d.lng === data[1] && d.lat === data[2]);
            if (duplicated.length) reject();
          })
        });

        await extract(file.path, {dir: path.resolve(join(__dirname, `../../datas/${file.filename.split('.').slice(0, -1).join('.')}`))})
        await fs.unlinkSync(file.path);
        resolve()

      });
    })
  }

  public downloadZip(items): AdmZip {
    const zip = this.createZipWithItems(items);

    const csv = this.createCsv(items);
    zip.addFile('data.csv', Buffer.alloc(csv.length, csv));
    return zip;
  }

  public createCsv(items) {
    const opts = {header: false, delimiter: ';', quote: ''};

    const parser = new Parser(opts);
    return parser.parse(items);
  }

  public createZipWithItems(items): AdmZip {
    let zip = new AdmZip();

    items.forEach((item, i) => {
      const itemFolder = resolve(join(__dirname, `../../datas/${item.packageName}/${item.id}`));
      zip.addLocalFolder(itemFolder, `${i + 1}`);
      item.id = i + 1;
      delete item.packageName;
    })

    return zip;
  }

  private fetchCSVFromZip(zip) {
    const dataCSVEntry = zip.entry("data.csv")
    const dataCSVBuffer = zip.entryDataSync(dataCSVEntry)
    const dataCSVString = Buffer.from(dataCSVBuffer).toString();

    return CSV.parse(dataCSVString);
  }
}
