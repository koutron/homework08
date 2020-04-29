const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// This file will generate the final HTML. You don't need to touch this at all!
const render = require("./lib/htmlRenderer");

// This will be an array of all team member objects created
const teamMembers = [];

// This will be an array of the id values created for each object so there are no duplicates
const idArray = [];


// STUDENT: This function generates all the questions for creating the manager. You need to add more to this.
function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's ID?",
            validate: answer => {
                if (!idArray.includes(answer)) {
                    return true;
                }
                return "Please enter a unique ID.";
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "managerOfficeNum",
            message: "What is your manager's office number?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        // STUDENT: Add other questions here!


    ]).then(({managerName, managerId, managerEmail, managerOfficeNum}) => {
        // STUDENT: Process the response by instatiating a new object in the Manager class
        idArray.push(managerId);
        
        const manager = new Manager(managerName, managerId, managerEmail, managerOfficeNum);
        teamMembers.push(manager);
        // Now call the next question set
        createTeam();
    });
}

// This function starts team creation.
function createTeam() {
    // STUDENT: Ask which type of team member should be created with a list of choices
    inquirer.prompt([
        {
            type: "list",
            message: "Who would you like to add to your team?",
            name: "teamChoice",
            choices: ["Engineer", "Intern", "Team Complete"]
        }

    ]).then(userChoice => {
        // STUDENT: Based on which choice they make, call the correct function to ask more questions.
        // If no choice is made, then go to the rendering function.
        if (userChoice.teamChoice === "Engineer") {
            createEngineer();
        } else if (userChoice.teamChoice === "Intern") {
            createIntern();
        } else {
            // Call render function correctly and pass in team array
            renderHtmlPage();
        }

    });
}

// This function starts team creation.
function createEngineer() {
    inquirer.prompt([
        // STUDENT:  Engineer questions
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
            // Note how the validate function works
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's ID?",
            // Note how the validate function works
            validate: answer => {
                if (!idArray.includes(answer)) {
                    return true;
                }
                return "Please enter a unique ID.";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?",
            // Note how the validate function works
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's Github username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ]).then(({engineerName, engineerId, engineerEmail, engineerGithub}) => {
        idArray.push(engineerId);
        // STUDENT: Make sure the id supplied is unique, then take the data supplied and 
        // instantiate the Engineer constructor.
        const engineer = new Engineer(engineerName, engineerId, engineerEmail, engineerGithub);
        teamMembers.push(engineer);
        // STUDENT: When finished:
        // Add the new object to the team member array
        // Pass control back to the createTeam() function
        createTeam();
    });
}

// STUDENT: Now create a function for creating an Intern using the code above as an example
function createIntern() {
    inquirer.prompt([
        // STUDENT:  Intern questions
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?",
            // Note how the validate function works
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's ID?",
            // Note how the validate function works
            validate: answer => {
                if (!idArray.includes(answer)) {
                    return true;
                }
                return "Please enter a unique ID.";
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?",
            // Note how the validate function works
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        }
    ]).then(({internName, internId, internEmail, internSchool}) => {
        idArray.push(internId);
        // STUDENT: Make sure the id supplied is unique, then take the data supplied and 
        // instantiate the Intern constructor.
        const intern = new Intern(internName, internId, internEmail, internSchool);
        teamMembers.push(intern);

        // STUDENT: When finished:
        // Add the new object to the team member array
        // Pass control back to the createTeam() function
        createTeam();
    });
}

// STUDENT: This function will call the render function required near the top (line 12), 
// and pass INTO it the teamMembers area; from there, write the HTML returned back to a file 
// in a directory called output.
function renderHtmlPage() {
    const html = render(teamMembers);
    fs.writeFile("./output/team.html", html, function(err){
        if (err) throw err;
    });
}

// This is our starter function.
// Note that we use separate functions for different questions in inquirer to 
// help keep code organized.
function startMenu() {

    // Here we start things off by calling the createManager function
    createManager()

}


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


startMenu();