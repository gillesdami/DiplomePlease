import PapersGenerator from './PapersGenerator';
import RulesGenerator from './RulesGenerator';
import { OptionalPaper } from './PapersModel';

/*
const papersGenerator = new PapersGenerator();

papersGenerator.loadCsv("data/students.csv").then(
    () => {
        console.log(papersGenerator.generatePapers([
            OptionalPaper.StudentCard,
            OptionalPaper.AbsencesRecords,
            OptionalPaper.ProjectValidation,
            OptionalPaper.TripValidation,
            OptionalPaper.ProspectionValidation]));
            console.log(papersGenerator.generatePapers([OptionalPaper.StudentCard]));
        console.log(papersGenerator);
    }
);
*/

const rulesGenerator = new RulesGenerator();

console.log(rulesGenerator.generateRule([]));
console.log(rulesGenerator.generateRule([]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));
console.log(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

console.warn(rulesGenerator);
