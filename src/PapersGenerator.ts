import * as csv from 'papaparse';

import * as Papers from './PapersModel';

export default class PapersGenerator {
    private _csvIndex: number = 0;
    private rawData: any;

    async loadCsv(csvFile: string) {
        return new Promise((resolve: Function, reject: Function) => {
            csv.parse("data/students.csv", {
                download: true,
                header: true,
                complete: (result: any) => {
                    this.rawData = result.data;
                    resolve();
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    }

    set csvIndex(val: number) {
        this._csvIndex = val % this.rawData.length;
    }

    get csvIndex(): number {
        return this._csvIndex;
    }

    getData(attr: string, row: number = this.csvIndex): string {
        return this.rawData[row][attr];
    }

    generatePapers(subPapersRequired: Array<Papers.OptionalPaper>): Papers.Papers {
        this.csvIndex++;

        return {
            //generate all papers lited in subPapersRequired
            paymentCertificate: this._generatePaymentCertificat(),
            studentCard: subPapersRequired.includes(Papers.OptionalPaper.StudentCard) && Math.random() < 0.99 ? this._generateStudentCard() : undefined,
            absencesRecords: subPapersRequired.includes(Papers.OptionalPaper.AbsencesRecords) && Math.random() < 0.99 ? this._generateAbsencesRecords() : undefined,
            projectValidation: subPapersRequired.includes(Papers.OptionalPaper.ProjectValidation) && Math.random() < 0.99 ? this._generateProjectValidation() : undefined,
            tripValidation: subPapersRequired.includes(Papers.OptionalPaper.TripValidation) && Math.random() < 0.99 ? this._generateTripValidation() : undefined,
            prospectionValidation: subPapersRequired.includes(Papers.OptionalPaper.ProspectionValidation) && Math.random() < 0.99 ? this._generateProspectionValidation() : undefined,
            ectsAccount: subPapersRequired.includes(Papers.OptionalPaper.ECTSAccount) && Math.random() < 0.99 ? this._generateECTSAccount() : undefined,
        };
    }

    private _generatePaymentCertificat(): Papers.PaymentCertificate {
        return {
            firstName: this._getDataWithNoise("firstName"),
            lastName: this._getDataWithNoise("lastName"),
            birthDate: new Date(this._getDataWithNoise("birthDate")),
            sex: this._getDataWithNoise("sex") === "M" ? Papers.Sex.M : Papers.Sex.F,
            method: this._getRandomFromEnum(Papers.PaymentMethod),
            date: this._randomDate(new Date("september 9 2017"), new Date()),
            amount: Math.floor(7500* (this.getData("hasPaid") === "1" ? 1: Math.random())),
        }
    }

    private _generateStudentCard(): Papers.StudentCard {
        return {
            firstName: this.getData("firstName"),
            lastName: this.getData("lastName"),
            birthDate: new Date(this.getData("birthDate")),
            sex: this.getData("sex") === "M" ? Papers.Sex.M : Papers.Sex.F,
            photo: this.getData("photo"),
        }
    }
    
    private _generateAbsenceRecord(): Papers.AbsenceRecord {
        return {
            date: this._randomDate(new Date("september 9 2017"), new Date()),
            subject: this._getRandomFromEnum(Papers.Subject),
            professor: this._getRandomFromEnum(Papers.Professor),
        }
    }
    
    private _generateAbsencesRecords(): Papers.AbsencesRecords {
        return {
            firstName: this._getDataWithNoise("firstName"),
            lastName: this._getDataWithNoise("lastName"),
            records: [...Array(this.getData("absenceCount")).keys()].map(() => this._generateAbsenceRecord()),
        }
    }
    
    private _generateProjectValidation(): Papers.ProjectValidation {
        return {
            firstName: this._getDataWithNoise("firstName"),
            lastName: this._getDataWithNoise("lastName"),
            date: this._randomDate(new Date("january 1 2018"), new Date()),
            professor: this._getRandomFromEnum(Papers.Professor),
        }
    }
    
    private _generateTripValidation(): Papers.TripValidation {
        return {
            firstName: this._getDataWithNoise("firstName"),
            lastName: this._getDataWithNoise("lastName"),
            startDate: new Date(this.getData("startDate")),
            remoteDest: this.getData("remoteDest"),
            isValidDest: this.getData("isValidDest") === "1",
            endDate: new Date(this.getData("endDate")),
        }
    }
    
    private _generateProspectionValidation(): Papers.ProspectionValidation {
        return {
            firstName: this._getDataWithNoise("firstName"),
            lastName: this._getDataWithNoise("lastName"),
            isSign: this.getData("hasValidatedProspection") === "1",
        }
    }

    private _generateECTSAccount(): Papers.ECTSAccount {
        return {
            firstName: this._getDataWithNoise("firstName"),
            lastName: this._getDataWithNoise("lastName"),
            birthDate: new Date(this._getDataWithNoise("birthDate")),
            sieste: Number(this.getData("sieste")),
            soiree: Number(this.getData("soiree")),
            procrastination: Number(this.getData("procrastination")),
            prise_en_main_grug: Number(this.getData("prise_en_main_grug")),
            minimisation_de_l_effort: Number(this.getData("minimisation_de_l_effort")),
            total: Number(this.getData("total")),
        }
    }

    /**
     * Return a random value within a typescript Enum
     * @param anEnum Enum
     */
    private _getRandomFromEnum(anEnum: any): any {
        const keys = Object.keys(anEnum);
        return anEnum[keys[this._getRandomInt(0, keys.length)]];
    }

    /**
     * Return an integer beetween min included and max excluded
     * @param min number included
     * @param max number excluded
     */
    private _getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * return getData(attr) if Math.random() < treshold else 
     * return an erroned value from the same column in the csv
     * 
     * @param attr 
     * @param treshold 
     */
    private _getDataWithNoise(attr: string, treshold: number = 0.97): string {
        if(Math.random() < treshold) return this.getData(attr);

        let i:number;
        for(i = this.csvIndex + 1; 
            this.getData(attr, i % this.rawData.length) == this.getData(attr, this.csvIndex); 
            i++);

        return this.getData(attr, i % this.rawData.length);
    }

    /**
     * Return a random date beetween two dates
     * 
     * @param start Date
     * @param end Date
     */
    private _randomDate(start: Date, end: Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}
