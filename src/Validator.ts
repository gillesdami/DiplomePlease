import { Rule } from "./RulesModel";
import { Papers, OptionalPaper } from "./PapersModel";

export interface Validation {
    errorMessage?: string,
    isValid: boolean
}

export class Validator {

    static validate(papers: Papers, rules: Array<Rule>, requiredPapers: Array<OptionalPaper>): Validation {
        
        if(!requiredPapers.every((requiredPaper: OptionalPaper) => 
            !!papers[requiredPaper])) {
                return {
                    errorMessage: "Des papiers était manquants",
                    isValid: false
                };
        }

        for(let i = 0; i < rules.length; i++) {
            if(!rules[i].validate(papers)) {
                return {
                    errorMessage: rules[i].errorMessage(papers),
                    isValid: false
                }
            }
        }

        return {
            isValid: true
        };
    }
}