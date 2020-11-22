import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join, resolve } from "path";
import * as path from "path";
import { CsvParser } from "nest-csv-parser";
import { Marker } from "./models/marker";
import { Metadata } from "./models/metadata";
import { glob } from "glob";

@Injectable()
export class MarkerService {

  constructor(
    private readonly csvParser: CsvParser
  ) {
  }

  async getDataFromCsvs() {
    let promises = [];

    const files = glob.sync(resolve(join(__dirname, `../../datas/**/data.csv`)));
    files.forEach((file) => {
      promises.push(
        this.csvParser.parse(
          fs.createReadStream(file),
          Marker,
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
