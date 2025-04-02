#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { pastel } from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const title = chalkAnimation.glitch("Hello Player!");

  await sleep();
  title.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process in your computer.
    If you get any question wrong, I will be ${chalk.bgRed("KILLED")}
    So, ${chalk.bgGreen("YOU")} have to get all questions right!!!
    `);
}

// await welcome(); //node js supports top level await

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  return (playerName = answers.player_name);
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on\n",
    choices: ["23 May 1995", "24 Nov 1995", "4 Dec 1995", "17 Dec 1996"],
  });

  return handleAnswer(answers.question_1 === "4 Dec 1995");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Who created JavaScript?\n",
    choices: [
      "Brendan Eich",
      "James Gosling",
      "Guido van Rossum",
      "Dennis Ritchie",
    ],
  });

  return handleAnswer(answers.question_2 === "Brendan Eich");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "What was JavaScript originally called?\n",
    choices: ["Mocha", "LiveScript", "ECMAScript", "JavaScript"],
  });

  return handleAnswer(answers.question_3 === "Mocha");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of these is NOT a JavaScript data type?\n",
    choices: ["undefined", "null", "float", "symbol"],
  });

  return handleAnswer(answers.question_4 === "float");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "What is the result of typeof null?\n",
    choices: ["'null'", "'object'", "'undefined'", "'number'"],
  });

  return handleAnswer(answers.question_5 === "'object'");
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message: "Which method is used to add elements to the end of an array?\n",
    choices: ["push()", "append()", "add()", "insert()"],
  });

  return handleAnswer(answers.question_6 === "push()");
}

async function question7() {
  const answers = await inquirer.prompt({
    name: "question_7",
    type: "list",
    message: "What is the difference between == and ===?\n",
    choices: [
      "=== checks both value and type, == only checks value",
      "== checks both value and type, === only checks value",
      "There is no difference",
      "=== is newer syntax",
    ],
  });

  return handleAnswer(
    answers.question_7 ===
      "=== checks both value and type, == only checks value"
  );
}

async function question8() {
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "list",
    message: "What is the purpose of 'use strict'?\n",
    choices: [
      "Enables strict mode for better error checking",
      "Makes code run faster",
      "Enables new JavaScript features",
      "Makes code more readable",
    ],
  });

  return handleAnswer(
    answers.question_8 === "Enables strict mode for better error checking"
  );
}

async function question9() {
  const answers = await inquirer.prompt({
    name: "question_9",
    type: "list",
    message: "What is a closure in JavaScript?\n",
    choices: [
      "A function with access to variables in its outer scope",
      "A way to close browser windows",
      "A method to end program execution",
      "A way to close database connections",
    ],
  });

  return handleAnswer(
    answers.question_9 ===
      "A function with access to variables in its outer scope"
  );
}

async function question10() {
  const answers = await inquirer.prompt({
    name: "question_10",
    type: "list",
    message: "What is the purpose of the 'this' keyword?\n",
    choices: [
      "Refers to the current object context",
      "Creates a new instance",
      "Defines a class",
      "Imports modules",
    ],
  });

  return handleAnswer(
    answers.question_10 === "Refers to the current object context"
  );
}

async function question11() {
  const answers = await inquirer.prompt({
    name: "question_11",
    type: "list",
    message: "What is the difference between let and var?\n",
    choices: [
      "let has block scope, var has function scope",
      "var is newer syntax",
      "let is deprecated",
      "There is no difference",
    ],
  });

  return handleAnswer(
    answers.question_11 === "let has block scope, var has function scope"
  );
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking your answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Good Work ${playerName}!. That's the right answer.`,
    });
  } else {
    spinner.error({
      text: `💀💀💀 ${chalk.bgRed("GAME OVER")} you lose ${playerName}!`,
    });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats ${playerName}! \n $ 1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
await question11();
winner();
