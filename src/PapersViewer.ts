import * as Draggabilly from 'draggabilly';
import {
    Papers,
    PaymentCertificate,
    StudentCard,
    AbsencesRecords,
    AbsenceRecord,
    ECTSAccount,
    ProjectValidation,
    TripValidation,
    ProspectionValidation,
    Sex
} from './PapersModel';

export default class PapersViewer {
    parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    showPapers(papers: Papers) {
        let html = "";
        if(papers.paymentCertificate) html += this._showPaymentCertificate(papers.paymentCertificate);
        if(papers.studentCard) html += this._showStudentCard(papers.studentCard);
        if(papers.absencesRecords) html += this._showAbsencesRecords(papers.absencesRecords);
        if(papers.ectsAccount) html += this._showECTSAccount(papers.ectsAccount);
        if(papers.projectValidation) html += this._showProjectValidation(papers.projectValidation);
        if(papers.tripValidation) html += this._showTripValidation(papers.tripValidation);
        if(papers.prospectionValidation) html += this._showProspectionValidation(papers.prospectionValidation);

        this.parent.innerHTML = html;

        Array.from(this.parent.children).forEach(function(item) {
            new Draggabilly(item);
        });
    }

    private _showPaymentCertificate(paymentCertificate: PaymentCertificate) {
        return `
<div id="PaymentCertificate">
    <p class="name">${paymentCertificate.firstName} ${paymentCertificate.lastName}</p>
    <p class="birthDate">${this._printDate(paymentCertificate.birthDate)}</p>
    <p class="sex">${paymentCertificate.sex}</p>
    <p class="method">${paymentCertificate.method}</p>
    <p class="date">${this._printDate(paymentCertificate.date)}</p>
    <p class="amount">${paymentCertificate.amount} €</p>
</div>`;
    }

    private _showStudentCard(studentCard: StudentCard) {
        return `
<div id="StudentCard">
    <p class="name">${studentCard.firstName} ${studentCard.lastName}</p>
    <p class="birthDate">${this._printDate(studentCard.birthDate)}</p>
    <p class="sex">${studentCard.sex}</p>
    <div class="photo"><img src="${studentCard.photo ? studentCard.photo : "assets/cards/face.png"}"/></div>
</div>`;
    }

    private _showAbsenceRecordLines(absencesRecords: Array<AbsenceRecord>): string {
        let records:string = '';

        absencesRecords.forEach((absenceRecord:AbsenceRecord) => {
            records += `
<div class="AbsenceRecordLine">
    <p class="date">${this._printDate(absenceRecord.date)}</p>
    <p class="subject">${absenceRecord.subject}</p>
    <p class="professor">${absenceRecord.professor}</p>
    <p class="hours">1</p>
</div>`;
        });
        
        return records;
    }

    private _showAbsencesRecords(absencesRecords: AbsencesRecords) {
        return `
<div id="AbsencesRecords">
    <img id="AbsencesRecordsTop" src="assets/cards/absencehaut.png"/>
    <p class="name">${absencesRecords.firstName} ${absencesRecords.lastName}</p>
    <div class="records">
    ${this._showAbsenceRecordLines(absencesRecords.records)}
    </div>
    <p class="total">${absencesRecords.records.length}</p>
    <img id="AbsencesRecordsBottom" src="assets/cards/absencebas.png"/>
</div>`;
    }

    private _showECTSAccount(ectsAccount: ECTSAccount) {
        return `
<div id="ECTSAccount">
    <p class="name">${ectsAccount.firstName} ${ectsAccount.lastName}</p>
    <p class="birthDate">${this._printDate(ectsAccount.birthDate)}</p>
    <p class="sieste">${ectsAccount.sieste}</p>
    <p class="soiree">${ectsAccount.soiree}</p>
    <p class="procrastination">${ectsAccount.procrastination}</p>
    <p class="prise_en_main_grug">${ectsAccount.prise_en_main_grug}</p>
    <p class="minimisation_de_l_effort">${ectsAccount.minimisation_de_l_effort}</p>
</div>`;
    }

    private _showProjectValidation(projectValidation: ProjectValidation) {
        return `
<div id="ProjectValidation">
    <p class="name">${projectValidation.firstName} ${projectValidation.lastName}</p>
    <p class="date">${this._printDate(projectValidation.date)}</p>
    <p class="professor">${projectValidation.professor}</p>
</div>`;
    }

    private _showTripValidation(tripValidation: TripValidation) {
        return `
<div id="TripValidation">
    <p class="name">${tripValidation.firstName} ${tripValidation.lastName}</p>
    <p class="startDate">${this._printDate(tripValidation.startDate)}</p>
    <p class="endDate">${this._printDate(tripValidation.endDate)}</p>
    <p class="remoteDest">${tripValidation.remoteDest}</p>
</div>`;
    }

    private _showProspectionValidation(prospectionValidation: ProspectionValidation) {
        return `
<div id="ProspectionValidation">
    <p class="name">${prospectionValidation.firstName} ${prospectionValidation.lastName}</p>
    ${prospectionValidation.isSign? '<img class="sign" src="assets/cards/signature.png"/>': ''}
</div>`;
    }

    clear() {
        this.parent.innerHTML = "";
    }

    private _printDate(date: Date): string {
        return `${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()-2000}`
    }
}
