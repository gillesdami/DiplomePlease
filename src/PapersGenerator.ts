import * as csv from 'papaparse';

import * as Papers from './PapersModel';

export default class PapersGenerator {
    private csvIndex: number;
    private rawData: any;

    constructor() {
        this.csvIndex = 0;
    }

    async loadCsv(csvFile: string) {
        return new Promise((resolve: Function) => {
            csv.parse("data/students.csv", {
                download: true,
                header: true,
                complete: (result: any) => {
                    this.rawData = result.data;
                    resolve();
                }
            });
        });
    }

    generatePapers(subPapersRequired: Array<Papers.OptionalPaper>): Papers.Papers {
        this.csvIndex++;

        return {
            paymentCertificat: this._generatePaymentCertificat()
        };
    }

    //TODO
    private _generatePaymentCertificat(): Papers.PaymentCertificat {
        return {
            firstName: "todo",
            lastName: "todo",
            birthDate: new Date(),
            sex: false,
            method: this._getRandomFromEnum(Papers.PaymentMethod),
            date: new Date(),
            amount: 0,
        }
    }


    private _getRandomFromEnum(anEnum: any): any {
        const keys = Object.keys(anEnum);
        return anEnum[keys[this._getRandomInt(0, keys.length)]];
    }

    private _getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}