import { Papers, OptionalPaper } from './PapersModel';

export interface Rule {
    text: string,
    errorMessage(papers: Papers): string,
    validate(papers: Papers): boolean,
    papersUsed: Array<OptionalPaper>
}
