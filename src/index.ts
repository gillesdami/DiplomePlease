import PapersGenerator from './PapersGenerator';
import RulesGenerator from './RulesGenerator';
import { OptionalPaper, Papers } from './PapersModel';
import { Validator, Validation } from './Validator';
import { Rule } from './RulesModel';
import PapersViewer from './PapersViewer';

import '../style.less';
import RulesViewer from './RulesViewer';

class Game {
    diplomesElement: HTMLElement = document.getElementById("diplomes");
    fricElement: HTMLElement = document.getElementById("fric");
    lifesElement: HTMLElement = document.getElementById("lifes");

    diplomerElement: HTMLElement = document.getElementById("diplomer");
    redoublerElement: HTMLElement = document.getElementById("redoubler");

    private _papersGenerator: PapersGenerator;
    private _rulesGenerator: RulesGenerator;
    private _papersViewer: PapersViewer;
    private _rulesViewer: RulesViewer;

    private _rules: Array<Rule>;
    private _lifes: number = 3;
    private _turns: number = 0;

    private _subPepersUnused: Array<OptionalPaper> = [OptionalPaper.StudentCard, OptionalPaper.AbsencesRecords, OptionalPaper.TripValidation, OptionalPaper.ECTSAccount, OptionalPaper.ProjectValidation, OptionalPaper.ProspectionValidation];
    private _subPepersUsed: Array<OptionalPaper> = [];

    constructor() {
        this._papersGenerator = new PapersGenerator();
        this._rulesGenerator = new RulesGenerator();

        this._papersViewer = new PapersViewer(document.getElementById("papers"));
        this._rulesViewer = new RulesViewer(document.getElementById("rules"));

        this._rules = [this._rulesGenerator.generateRule([])];
    }

    async start() {
        await this._papersGenerator.loadCsv("data/students.csv");
        this._rulesViewer.showRules(this._rules);

        this.info('Si les documents des élèves suivent les régles cliquez sur "diplômer" sinon cliquez sur "7500€"');

        while(this._lifes) {
            const papers:Papers = this._papersGenerator.generatePapers(this._subPepersUsed);
            this._papersViewer.showPapers(papers);

            const choice:boolean = await this.getUserChoice();

            this._papersViewer.clear();

            this.validateChoice(choice, papers);

            if((this._turns+6) % 6 === 1 && this._subPepersUnused.length) {
                this.addPaper();
            }

            if((this._turns+6) % 3 === 1) {
                this.addRule();
            }

            this._turns++;
        }

        this.info("GAME OVER: Flintz vous a viré !");
    }

    info(msg: string) {
        alert(msg);
    }

    getUserChoice(): Promise<boolean> {
        return new Promise<boolean>((resolve: Function) => {

            this.diplomerElement.onclick = () => {
                resolve(true);
                this.diplomesElement.textContent = (Number(this.diplomesElement.textContent) +1) + "";
            }

            this.redoublerElement.onclick = () => {
                resolve(false);
                this.fricElement.textContent = (Number(this.fricElement.textContent) + 7500) + "";
            }
        });
    }

    validateChoice(choice: boolean, papers: Papers) {

        const validation: Validation = Validator.validate(papers, this._rules, this._subPepersUsed)
        if(choice !== validation.isValid) {
            this._lifes--;
            this.lifesElement.textContent = this._lifes+"";

            this.info(choice ? "Mr Flintz n'est pas content: "+validation.errorMessage : "Mr Flintz n'est pas content: Les papiers de l'éléve étaient valides");
        }
    }

    addPaper() {
        this._subPepersUsed.push(this._subPepersUnused.shift());
        alert("Les élèves doivent désormais présenter le document: "+ this._subPepersUsed[this._subPepersUsed.length-1]);
    }

    addRule() {
        const rule = this._rulesGenerator.generateRule(this._subPepersUsed);
        if(rule) {
            this._rules.push(rule);
            this._rulesViewer.clear();
            this._rulesViewer.showRules(this._rules);
            this.info("Nouvelle régle: "+ rule.text);
        }
    }
}

const game = new Game();
game.start().catch(() => alert("fatal error :'("));
