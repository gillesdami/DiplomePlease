import PapersGenerator from './PapersGenerator';
import RulesGenerator from './RulesGenerator';
import { OptionalPaper, Papers } from './PapersModel';
import { Validator, Validation } from './Validator';
import { Rule } from './RulesModel';
import PapersViewer from './PapersViewer';

import '../style.less';
import RulesViewer from './RulesViewer';

async function main():Promise<void> {
    const diplomesElement = document.getElementById("diplomes");
    const fricElement = document.getElementById("fric");
    const lifesElement = document.getElementById("lifes");

    const papersGenerator = new PapersGenerator();
    await papersGenerator.loadCsv("data/students.csv");

    const rulesGenerator: RulesGenerator = new RulesGenerator();
    const rules: Array<Rule> = [rulesGenerator.generateRule([])];

    const papersViewer = new PapersViewer(document.getElementById("papers"));
    const rulesViewer = new RulesViewer(document.getElementById("rules"));
    rulesViewer.showRules(rules);

    let subPepersUsed: Array<OptionalPaper> = [OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ECTSAccount, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation];
    let subPepersUnused: Array<OptionalPaper> = [];
    let errors: number = 0;
    for (let turn: number = 0; errors < 3; turn++) {
        
        const papers:Papers = papersGenerator.generatePapers(subPepersUsed);
        papersViewer.showPapers(papers); 

        //user action
        const choice:boolean = await new Promise<boolean>((resolve: Function) => {
            document.getElementById("diplomer").onclick = () => {
                resolve(true);
                diplomesElement.textContent = (Number(diplomesElement.textContent) +1) + "";
            }
            document.getElementById("redoubler").onclick = () => {
                resolve(false);
                fricElement.textContent = (Number(fricElement.textContent) + 7500) + "";
            }
        });

        papersViewer.clear();

        //action validation
        const validation: Validation = Validator.validate(papers, rules, subPepersUsed)
        if(choice !== validation.isValid) {
            errors++;
            lifesElement.textContent = (3-errors)+"";
            alert(choice ? "Mr Flintz n'est pas content: "+validation.errorMessage : "Mr Flintz n'est pas content: Les papiers de l'éléve étaient valides");
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
                rulesViewer.clear();
                rulesViewer.showRules(rules);
            }
        }
    }

    alert("GAME OVER: Flintz vous a viré !");
}

main();
