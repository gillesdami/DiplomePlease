export enum Subject {
    PRESENTISME = "Presentisme",
    HEARTHSTONE = "Hearthstone",
    GAME_OF_THRONE = "GameOfThrone",
}

export enum Professor {
    JML = "JML",
    MMAA = "MMAA",
    HDM = "HDM",
    NGA = "NGA",
    NF = "NF",
}

export enum PaymentMethod {
    CB = "CB",
    CHEQUE = "Cheque",
    VIREMENT = "Virement",
    SUPPLICATIONS = "Supplications",
}

export interface StudentCard {
    firstName: string,
    lastName: string,
    birthDate: Date,
    sex: boolean, //0 men, 1 women
    photo: string,
}

export interface AbsenceRecord {
    date: Date,
    subject: Subject,
    professor: Professor,
}

export interface AbsencesRecords {
    firstName: string,
    lastName: string,
    records: Array<AbsenceRecord>,
}

export interface PaymentCertificat {
    firstName: string,
    lastName: string,
    birthDate: Date,
    sex: boolean,
    method: PaymentMethod,
    date: Date,
    amount: Number,
}

export interface ProjectValidation {
    firstName: string,
    lastName: string,
    date: Date,
    professor: Professor,
}

export interface TripValidation {
    firstName: string,
    lastName: string,
    startDate: Date,
    remoteDest: string,
    isValidDest: boolean,
    endDate: Date,
    homeDest: string,
}

export interface ProspectionValidation {
    firstName: string,
    lastName: string,
    isSign: boolean,
}

export interface ECTSAccount {
    sieste: number,
    soiree: number,
    procrastination: number,
    prise_en_main_grig: number,
    minimisation_de_l_effort: number,
    total: number,
}

export interface Papers {
    paymentCertificat: PaymentCertificat,
    studentCard?: StudentCard,
    absencesRecords?: AbsencesRecords,
    projectValidation?: ProjectValidation,
    tripValidation?: TripValidation,
    prospectionValidation?: ProspectionValidation,
}

export enum OptionalPaper {
    StudentCard,
    AbsencesRecords,
    ProjectValidation,
    TripValidation,
    ProspectionValidation,
}