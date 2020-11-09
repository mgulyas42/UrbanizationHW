import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join, resolve } from "path";
import { CsvParser } from "nest-csv-parser";
import { Marker } from "./models/marker";
import { Metadata } from "./models/metadata";

@Injectable()
export class MarkerService {

    constructor(
        private readonly csvParser: CsvParser
    ) {
    }

    async getDataFromCsv(): Promise<Marker[]> {
        const stream = fs.createReadStream(resolve(join(__dirname, `../../datas/data.csv`)))
        return (await this.csvParser.parse(stream, Marker)).list;
    }

    async getMetaData(id): Promise<any> {
        const stream = fs.createReadStream(resolve(join(__dirname, `../../datas/${id}/teaching.csv`)));
        return (await this.csvParser.parse(stream, Metadata)).list;
    }
}
