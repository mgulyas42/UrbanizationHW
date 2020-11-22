import { Injectable, UploadedFile } from '@nestjs/common';
import * as extract from "extract-zip";
import { join, resolve } from "path";
import * as fs from "fs";
import AdmZip from "adm-zip";
import { Parser } from "json2csv";

@Injectable()
export class FileService {

  public async uploadFile(@UploadedFile() file) {
    await extract(file.path, {dir: resolve(join(__dirname, `../../datas/${file.filename.split('.').slice(0, -1).join('.')}`))})
    await fs.unlinkSync(file.path);
  }

  public downloadZip(items): AdmZip {
    const zip = this.createZipWithItems(items);

    const csv = this.createCsv(items);
    zip.addFile('data.csv', Buffer.alloc(csv.length, csv));
    return zip;
  }

  public createCsv(items) {
    const opts = { header: false, delimiter: ';', quote: '' };

    const parser = new Parser(opts);
    return parser.parse(items);
  }

  public createZipWithItems(items): AdmZip {
    let zip = new AdmZip();

    items.forEach((item,i) => {
      const itemFolder = resolve(join(__dirname, `./datas/${item.packageName}/${item.id}`));
      zip.addLocalFolder(itemFolder, `${i+1}`);
      item.id = i+1;
      delete item.packageName;
    })

    return zip;
  }
}
