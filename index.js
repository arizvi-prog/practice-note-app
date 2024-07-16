const inquirer = require('inquirer');
const fs = require('fs').promises;

const questions = [
    {
        name: 'title',
        message: 'Please enter a title'
    },
    {
        name: 'description',
        message: 'Please enter a description'
    }
];

function askStartingQuestions() {
    return inquirer.prompt(questions)
}

function askForInstallSteps(initialAnswersObj) {
    const steps = [];
    const addStep = () => {
        return inquirer.prompt({
            name: 'step',
            message: 'Please enter the step text'
        }).then(stepAnswerObj => {
            steps.push(stepAnswerObj.step)
        });
    }

    return inquirer.prompt({
        name: 'choice',
        message: 'Please select an installation step option',
        type: 'list',
        choices: ['Add an installation step', 'Finish Installation Steps']
    }).then(choiceAnswer => {
        switch (choiceAnswer.choice) {
            case 'Add an installation step':
                return addStep()
                    .then(askForInstallSteps);
                break;
            default:
                return finalQuestions(initialAnswersObj, steps);
        }
    })
}

function finalQuestions(initialAnswers, steps) {
    console.log(initialAnswers, steps);
    console.log('Final prompt to complete the README before we generate');

    const md = `
    # Title
    ${initialAnswers.title}
    
    # Description
    ${initialAnswers.description}
    
    # Installation Steps
    ${steps.map(step => `-${step}`).join('\n')}
    `;

    return fs.writeFile('./README.md', md);

}

function init() {
    askStartingQuestions()
        .then(askForInstallSteps)
        .then(() => {
            console.log('Readme Generated')
        })
}

init();