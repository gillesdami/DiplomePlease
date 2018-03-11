import PapersGenerator from './PapersGenerator';
import RulesGenerator from './RulesGenerator';
import { OptionalPaper, Papers } from './PapersModel';
import { Validator, Validation } from './Validator';
import { Rule } from './RulesModel';
import '../style.less';

async function main():Promise<void> {
    const papersGenerator = new PapersGenerator();
    await papersGenerator.loadCsv("data/students.csv");

    const rulesGenerator: RulesGenerator = new RulesGenerator();
    const rules: Array<Rule> = [rulesGenerator.generateRule([])];

    let subPepersUnused: Array<OptionalPaper> = [OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ECTSAccount, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation];
    let subPepersUsed: Array<OptionalPaper> = [];
    let errors: number = 0;
    for (let turn: number = 0; errors < 3; turn++) {
        
        const papers:Papers = papersGenerator.generatePapers(subPepersUsed);
        console.log(papers);

        //user action
        const choice:boolean = await new Promise<boolean>((resolve: Function) => {
            (<any>window).answer = (bool: boolean) => {
                resolve(bool);
            }
        });

        //action validation
        const validation: Validation = Validator.validate(papers, rules, subPepersUsed)
        if(choice !== validation.isValid) {
            errors++;
            console.warn(choice ? validation.errorMessage : 'Papers where valid');
        } else {
            console.log("Good job !");
        }

        //must present a new peper
        if((turn+6) % 6 === 1 && subPepersUnused.length) {
            subPepersUsed.push(subPepersUnused.shift());
            console.warn("students must present a "+ subPepersUsed[subPepersUsed.length-1]);
        }

        //must follow a new rule
        if((turn+6) % 3 === 1) {
            const rule = rulesGenerator.generateRule(subPepersUsed);
            if(rule) {
                rules.push(rule);
                console.warn("students must follow a new rule: "+ rules[rules.length-1].text);
            }
            
        }
    }

    console.log("GAME OVER");
}

main();
