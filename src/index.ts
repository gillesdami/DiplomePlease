import PapersGenerator from './PapersGenerator';
import RulesGenerator from './RulesGenerator';
import { OptionalPaper, Papers } from './PapersModel';
import { Validator } from './Validator';
import { Rule } from './RulesModel';

const papersGenerator = new PapersGenerator();

papersGenerator.loadCsv("data/students.csv").then(
    () => {
        const rulesGenerator: RulesGenerator = new RulesGenerator();
        const rules: Array<Rule> = [];
        const papers: Papers = papersGenerator.generatePapers([
            OptionalPaper.StudentCard,
            OptionalPaper.AbsencesRecords,
            OptionalPaper.ProjectValidation,
            OptionalPaper.TripValidation,
            OptionalPaper.ProspectionValidation]);
            
        rules.push(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

        rules.push(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

        rules.push(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

        rules.push(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

        rules.push(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

        rules.push(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

        rules.push(rulesGenerator.generateRule([OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));

        console.log(rules);
        console.log(papers);

        console.log(Validator.validate(papers, rules, [OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation]));
    }
);