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
            paymentCertificat: this._generatePaymentCertificat(),
            studentCard: subPapersRequired.includes(Papers.OptionalPaper.StudentCard) ? this._generateStudentCard() : undefined,
            absencesRecords: subPapersRequired.includes(Papers.OptionalPaper.AbsencesRecords) ? this._generateAbsencesRecords() : undefined,
            projectValidation: subPapersRequired.includes(Papers.OptionalPaper.ProjectValidation) ? this._generateProjectValidation() : undefined,
            tripValidation: subPapersRequired.includes(Papers.OptionalPaper.TripValidation) ? this._generateTripValidation() : undefined,
            prospectionValidation: subPapersRequired.includes(Papers.OptionalPaper.ProspectionValidation) ? this._generateProspectionValidation() : undefined,
        };
    }

    //TODO
    private _generatePaymentCertificat(): Papers.PaymentCertificat {
        return {
            firstName: "todo",
            lastName: "todo",
            birthDate: new Date(),
            sex: Papers.Sex.F,
            method: this._getRandomFromEnum(Papers.PaymentMethod),
            date: new Date(),
            amount: 0,
        }
    }

    //TODO
    private _generateStudentCard(): Papers.StudentCard {
        return {
            firstName: this.getData("firstName"),
            lastName: this.getData("lastName"),
            birthDate: new Date(this.getData("birthDate")),
            sex: this.getData("sex") === "M" ? Papers.Sex.M : Papers.Sex.F,
            photo: this.getData("photo"),
        }
    }
    
    //TODO
    private _generateAbsenceRecord(): Papers.AbsenceRecord {
        return {
            date: new Date(),
            subject: Papers.Subject.GAME_OF_THRONE,
            professor: Papers.Professor.HDM,
        }
    }
    
    //TODO
    private _generateAbsencesRecords(): Papers.AbsencesRecords {
        return {
            firstName: "string",
            lastName: "string",
            records: [...Array(20).keys()].map(() => this._generateAbsenceRecord()),
        }
    }
    
    //TODO
    private _generateProjectValidation(): Papers.ProjectValidation {
        return {
            firstName: "string",
            lastName: "string",
            date: new Date(),
            professor: Papers.Professor.HDM,
        }
    }
    
    //TODO
    private _generateTripValidation(): Papers.TripValidation {
        return {
            firstName: "string",
            lastName: "string",
            startDate: new Date(),
            remoteDest: "string",
            isValidDest: false,
            endDate: new Date(),
        }
    }
    
    //TODO
    private _generateProspectionValidation(): Papers.ProspectionValidation {
        return {
            firstName: "string",
            lastName: "string",
            isSign: false,
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

    /**
     * return getData(attr) if Math.random() > treshold else 
     * return an erroned value from the same column in the csv
     * 
     * @param attr 
     * @param treshold 
     */
    private _getDataWithNoise(attr: string, treshold: number = 0.98): string {
        if(Math.random() < treshold) return this.getData(attr);

        let i:number;
        for(i = this.csvIndex + 1; 
            this.getData(attr, i % this.rawData.length) == this.getData(attr, this.csvIndex); 
            i++);

        return this.getData(attr, i % this.rawData.length);
    }
}