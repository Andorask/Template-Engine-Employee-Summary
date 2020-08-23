const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, GitHub){
        super(name, id, email);
        this.GitHub = github;
    }

    getGitHub(){
        return this.GitHub;
    }

    getRole(){
        return "Engineer"
    }
}
module.exports = Engineer;