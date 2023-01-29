#!/usr/bin/env node
// This lines tells Node.js to execute the code with the Node version
// installed on the user's local system.

// Chalk colors the output text in the terminal
import chalk from "chalk";

// Inquirer collects user inputs
import inquirer from "inquirer";

// Creates a color gradient on text outputed in the terminal
import gradient from "gradient-string";

// Chalk Animation animates the color on the ouputed text in the terminal
import chalkAnimation from "chalk-animation";

// Figlet generates ASCII art from text
import FIGlet from "figlet";

import { createSpinner } from "nanospinner";
import figlet from "figlet";

let playerName;

// We need a promise based timeout
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "How Wants To Be A JavaScript Millionaire? \n"
  );

  // We need to wait for the animation to finish
  // since the terminal can only do one thing at a time.
  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on\n",
    choices: ["May 23rd 1955", "Nov 24th 1995", "Dec 4th 1995", "Dec 17 1996"],
    default() {
      return "Player";
    },
  });

  return handleAnswer(answers.question_1 === "Nov 24th 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();

  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}! That's a legit answer.`,
    });
  } else {
    spinner.error({ text: `💥💥💥 Game over. You loose ${playerName}.` });
    // when a process exits it usually has a code of 0 (success) and 1 (error).
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const message = `Congrats, ${playerName} !\n You Win\n $ 1 , 000, 000`;

  figlet(message, (error, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

// Node.js supports top level await as per version 14
await welcome();
await askName();
await question1();
await winner();
