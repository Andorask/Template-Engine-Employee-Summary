const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const managerQuestions = inquirer.prompt([
    {
        type: "input",
        message: "Enter the Manager's Name.",
        name: "managerName",
    },
    {
        type: "input",
        message: "Enter the Manager's ID.",
        name: "managerID",
    },
    {
        type: "input",
        message: "Enter the Manager's email.",
        name: "managerEmail",
    },
    {
        type: "input",
        message: "Enter the Manager's office number. ",
        name: "officeNumber",
    },
    {
        type: "list",
        message: "Do you have a team?",
        name: "teamChoice",
        choices: ["Yes", "No"]
    }
]).then(function(data){
    var managerDetails = new Manager(data.managerName, data.managerID, data.managerEmail, data.officeNumber);
    employees.push(managerDetails);

    if(data.teamChoice === "Yes") {
        displayEmployeeQuestions();
    }
    else{
        buildHtml();
    }
})

function displayEmployeeQuestions(){
    const employeeQuestions = inquirer.prompt([
        {
            type: "input",
            message: "Enter the Employee's name.",
            name: "name",
        },
        {
            type: "input",
            message: "Enter the employee's ID.",
            name: "id",
        },
        {
            type: "input",
            message: "Enter the employee's email.",
            name: "email",
        },
        {
            type: "list",
            message: "Please choose the desired employee Job.",
            name: "employeeJob",
            choices: ["Intern", "Engineer"]
        }
    ]).then(function(data){
        if(data.employeeJob === "Intern"){
            displayInternQuestions(data);
        }
        else{
            displayEngineerQuestions(data);
        }
    })
};

function displayInternQuestions(details){
    const internQuestions = inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of your school.",
            name: "school",
        }
    ]).then(function(data){
        var internDetails = new Intern(details.name, details.id, details.email, data.school);
        employees.push(internDetails);
        addAdditionalemployees();
    })
}

function displayEngineerQuestions(details){
    const engineerQuestions = inquirer.prompt([
        {
            type: "input",
            message: "Enter your Github username.",
            name: "Github",
        }
    ]).then(function(data){
        var engineerDetails = new Engineer(details.name, details.id, details.email, data.Github);
        employees.push(engineerDetails);
        addAdditionalemployees();
    })
}

function addAdditionalemployees(){
    const additionalQuestions = inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add any more employees?",
            name: "additionalemployees",
            choices: ["Yes", "No"]
        }
    ]).then(function(data){
        if(data.additionalemployees === "Yes"){
            displayEmployeeQuestions();
        }
        else{
            buildHtml();
        }
    })
}

function buildHtml(){
    var htmlPage = render(employees);

    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    fs.writeFile(outputPath, htmlPage, function(err){
        if(err){
            return console.log(err);
        }
        console.log("Successful!");
    });
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
