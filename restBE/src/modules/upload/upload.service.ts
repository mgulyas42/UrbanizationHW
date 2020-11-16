import { Injectable } from '@nestjs/common';
import * as CSV from 'csv-string';

@Injectable()
export class UploadService {

  fetchDataCSV(zip) {
    const dataCSVEntry = zip.entry("data.csv")
    const dataCSVBuffer = zip.entryDataSync(dataCSVEntry)
    const dataCSVString = Buffer.from(dataCSVBuffer).toString();

    return CSV.parse(dataCSVString);
  }

  fetchTeachingCSVs(zip, dirs){
    return dirs.map(dir => dir + "/teaching.csv")
      .map(zip.entry)
      .map(entry => zip.entryDataSync(entry))
      .map(Buffer.from)
      .map(x => x.toString())
      .map(CSV.parse);
  }

  fetchBMPs(zip, dirs){
    return dirs.map(dir => dir + "/01.bmp")
      .map(zip.entry)
      .map(entry => zip.entryDataSync(entry));
  }
}
