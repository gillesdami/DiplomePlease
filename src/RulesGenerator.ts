import { Rule } from './RulesModel';
import { Papers, OptionalPaper } from './PapersModel'

const rules: Array<Rule> = [
    {
        text: "Le certificat de paiement indique que l'étudiant a payé 7500€",
        errorMessage: (papers: Papers) => `L'étudiant n'a payé que ${papers.paymentCertificat.amount}€`,
        validate: (papers: Papers) => papers.paymentCertificat.amount === 7500,
        papersUsed: []
    },
    {
        text: "Le prenom, le nom, la date de naissance et le sexe de la carte etudiant correspondent avec le certificat de paiement",
        errorMessage: (papers: Papers) => "Le prenom, le nom, la date de naissance ou le sexe de la carte etudiant ne correspondent pas avec le certificat de paiement",
        validate: (papers: Papers) => 
            papers.paymentCertificat.firstName === papers.studentCard.firstName
            && papers.paymentCertificat.lastName === papers.studentCard.lastName
            && papers.paymentCertificat.birthDate === papers.studentCard.birthDate
            && papers.paymentCertificat.sex === papers.studentCard.sex,
        papersUsed: [OptionalPaper.StudentCard]
    },
    {
        text: "Le prenom et le nom de la carte etudiant correspondent avec le relevé d'absences",
        errorMessage: (papers: Papers) => `Le prenom ou le nom de la carte etudiant ne correspondent pas avec le relevé d'absences`,
        validate: (papers: Papers) => 
            papers.absencesRecords.firstName === papers.studentCard.firstName
            && papers.absencesRecords.lastName === papers.studentCard.lastName,
        papersUsed: [OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords]
    },
    {
        text: "L'etudiant à moins de 30 absences",
        errorMessage: (papers: Papers) => `L'etudiant à ${papers.absencesRecords.records.length} absences`,
        validate: (papers: Papers) => 
            papers.absencesRecords.records.length < 30,
        papersUsed: [OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords]
    },
    {
        text: "Le prenom et le nom de la carte etudiant correspondent avec ceux des billets de voyage",
        errorMessage: (papers: Papers) => `Le prenom ou le nom de la carte etudiant ne correspondent pas avec ceux des billets de voyage`,
        validate: (papers: Papers) => 
            papers.tripValidation.firstName === papers.studentCard.firstName
            && papers.tripValidation.lastName === papers.studentCard.lastName,
        papersUsed: [OptionalPaper.StudentCard, OptionalPaper.TripValidation]
    },
    {
        text: "La date du billet de retour est après la date du billet d'aller",
        errorMessage: (papers: Papers) => `La date du billet de retour ${papers.tripValidation.startDate.toDateString()} est précède la date du billet d'aller ${papers.tripValidation.endDate.toDateString()}`,
        validate: (papers: Papers) => 
            papers.tripValidation.startDate < papers.tripValidation.endDate,
        papersUsed: [OptionalPaper.StudentCard, OptionalPaper.TripValidation]
    },
    {
        text: "La destination du billet est coherente",
        errorMessage: (papers: Papers) => `La destination est ${papers.tripValidation.remoteDest} est absurde`,
        validate: (papers: Papers) => papers.tripValidation.isValidDest,
        papersUsed: [OptionalPaper.StudentCard, OptionalPaper.TripValidation]
    },
    {
        text: "Le prenom et le nom de la carte etudiant correspondent avec le rendu du projet",
        errorMessage: (papers: Papers) => `Le prenom ou le nom de la carte etudiant ne correspondent pas avec le rendu du projet`,
        validate: (papers: Papers) => 
            papers.projectValidation.firstName === papers.studentCard.firstName
            && papers.projectValidation.lastName === papers.studentCard.lastName,
        papersUsed: [OptionalPaper.StudentCard, OptionalPaper.ProjectValidation]
    },
    {
        text: "Le prenom et le nom de la carte etudiant correspondent avec le certificat de prospection et le certificat est signé",
        errorMessage: (papers: Papers) => `Les noms sur le certificat de prospection ne correspondent pas ou le certificat n'est pas signé`,
        validate: (papers: Papers) => 
            papers.prospectionValidation.firstName === papers.studentCard.firstName
            && papers.prospectionValidation.lastName === papers.studentCard.lastName
            && papers.prospectionValidation.isSign,
        papersUsed: [OptionalPaper.StudentCard, OptionalPaper.ProspectionValidation]
    },
];

export default class RulesGenerator {
    private alreadyUsedRules: Array<Rule> = [];

    /**
     * Return a new rule using the papers used in the game
     * @param subPapersUsed Array of paper identifier currently used in the game
     * @returns rule A rule or null if all rules are already used
     */
    generateRule(subPapersUsed: Array<OptionalPaper>): Rule|null {
        const usableRules = 
            rules
                .filter((rule: Rule) => 
                    rule.papersUsed.every((paperUsed: OptionalPaper) => 
                        subPapersUsed.includes(paperUsed)))
                .filter((rule: Rule) => 
                    !this.alreadyUsedRules.includes(rule));

        if(!usableRules.length) return null;

        this.alreadyUsedRules.push(usableRules[0]);
        return usableRules[0];
    }
}