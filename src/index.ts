import PapersGenerator from './PapersGenerator';
import { OptionalPaper } from './PapersModel';

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