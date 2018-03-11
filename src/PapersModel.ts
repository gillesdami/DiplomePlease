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

export enum Sex {
    M = "M",
    F = "F"
}

export interface StudentCard {
    firstName: string,
    lastName: string,
    birthDate: Date,
    sex: Sex,
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

export interface PaymentCertificate {
    firstName: string,
    lastName: string,
    birthDate: Date,
    sex: Sex,
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
}

export interface ProspectionValidation {
    firstName: string,
    lastName: string,
    isSign: boolean,
}

export interface ECTSAccount {
    firstName: string,
    lastName: string,
    birthDate: Date,
    sieste: number,
    soiree: number,
    procrastination: number,
    prise_en_main_grig: number,
    minimisation_de_l_effort: number,
    total: number,
}

export interface Papers {
    paymentCertificate: PaymentCertificate,
    studentCard?: StudentCard,
    absencesRecords?: AbsencesRecords,
    ectsAccount?: ECTSAccount,
    projectValidation?: ProjectValidation,
    tripValidation?: TripValidation,
    prospectionValidation?: ProspectionValidation,
}

export enum OptionalPaper {
    StudentCard = "studentCard",
    AbsencesRecords = "absencesRecords",
    ProjectValidation = "projectValidation",
    TripValidation = "tripValidation",
    ProspectionValidation = "prospectionValidation",
    ECTSAccount = "ectsAccount"
}
