import { Rule } from "./RulesModel";


export default class RulesViewer {
    parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    showRules(rules: Array<Rule>) {
        let html = "";

        rules.forEach((rule) => {
            html += `
<div>
${rule.text}
</div>`;
        });

        this.parent.innerHTML += html;
    }

    clear() {
        this.parent.innerHTML = "";
    }
} 
