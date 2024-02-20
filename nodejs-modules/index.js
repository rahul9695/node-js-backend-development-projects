const { log } = require("node:console");
const readline = require("node:readline");
const fs = require("node:fs").promises;
const path = require("path");

const filePath = path.join(__dirname, 'todo.txt');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    })
}

async function addNewTask () {
    const task = await getInput("Write your task :- ");
    fs.appendFile(filePath, task, () => {})
}

function viewTask () {
    console.log("view task called");
}

function markTaskAsComplete () {
    console.log("mark task as complete called");
}

function removeTask () {
    console.log("remove task called");
}


async function main () {
    while(true) {
        console.log("\n1. Add a new task");
        console.log("2. View tasks");
        console.log("3. Mark a task as complete");
        console.log("4. Remove a task");
        console.log("5. Exit");

        const choice = parseInt(await getInput("Enter your choice :- "));
        // console.log(typeof choice);
        switch(choice) {
            case 1:
                addNewTask();
                break;
            case 2:
                viewTask();
                break;
            case 3:
                markTaskAsComplete();
                break;
            case 4:
                removeTask();
                break;
            case 5:
                console.log("Program Closed");
                // rl.close();
                process.exit(0);
            default:
                console.log("Wrong Input")
        }
    }
}

main();