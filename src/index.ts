import PapersGenerator from './PapersGenerator';

const papersGenerator = new PapersGenerator();

papersGenerator.loadCsv("data/students.csv").then(
    () => {
        console.log(papersGenerator.generatePapers([]));
        console.log(papersGenerator);
    }
);