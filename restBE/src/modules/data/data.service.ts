import { Injectable } from '@nestjs/common';
import { CsvParser } from "nest-csv-parser";
import { glob } from "glob";
import { join, resolve } from "path";
import * as fs from "fs";
import { Data } from "./models/data";
import { Metadata } from "./models/metadata";
import * as path from "path";

@Injectable()
export class DataService {
  constructor(
    private readonly csvParser: CsvParser
  ) {}

  async getDataFromCsvs() {
    let promises = [];

    const files = glob.sync(resolve(join(__dirname, `../../datas/**/data.csv`)));
    console.log(resolve(join(__dirname, `../../datas/**/data.csv`)))
    files.forEach((file) => {
      promises.push(
        this.csvParser.parse(
          fs.createReadStream(file),
          Data,
          null,
          null,
          {headers: ["id", "lng", "lat", "title", "valami1", "valami2"], skipLines: 1})
      );
    });

    return Promise.all(promises)
      .then((all) => {
        let response = {};
        all.forEach((e, i) => {
          response[path.basename(path.dirname(files[i]))] = e.list;
        })
        return response;
      })
      .catch((e) => {
        console.error(e);
        return [];
      })
  }

  async getMetaData(path: string, id: number): Promise<any> {
    const stream = fs.createReadStream(resolve(join(__dirname, `../../datas/${path}/${id}/teaching.csv`)));
    return (await this.csvParser.parse(stream, Metadata)).list;
  }
}
