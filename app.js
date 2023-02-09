"use strict";
import {showConsoleTable} from "./service.js"
//switch-theme
document.querySelector("#switch-theme").addEventListener("click", () => {
    console.log(document.getElementById("html"));
    document.getElementById("html").classList.toggle("dark");
});

//calculator
const numberPanel = document.querySelector('.number_panel');
console.log(numberPanel);

let inputScoreboard = document.querySelector(".input-scoreboard");
let inputResult = document.querySelector(".input-result");
const clean = document.querySelector(".clean");

let firstNumber = '';
let secondNumber = '';
let sing = '';
let isAddSign = false;
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '/', 'x', '+/-'];
const additionalAction = ['%'];

clean.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    sing = '';
    isAddSign = false;
    finish = false;
    inputScoreboard.value = "";
    inputResult.value = "";
    console.clear();
});


numberPanel.addEventListener('click', function (e) {
    if (!e.target.classList.contains("btn-calc")) return;
    if (e.target.classList.contains("clean")) return;
    const key = e.target.dataset.key;
   

    //чи натиснуто цифрову кнопку
    if (digit.includes(key)) {
        if (secondNumber === "" && sing === "") {
            inputScoreboard.value += key;
            firstNumber = inputScoreboard.value;
            console.log("firstNumber:", firstNumber);

        } else {
            inputScoreboard.value += key;
            secondNumber += e.target.dataset.key;
            console.log("secondNumber:", secondNumber);
        }
        showConsoleTable(firstNumber, secondNumber, sing);
        return;
    }
    //чи натиснуто кнопку знаку
    if (action.includes(key)) {
        sing = key;
        inputScoreboard.value += key;
        return;
    }

    if(additionalAction.includes(key)) {
        isAddSign = true;
        inputScoreboard.value += key;
        return;
    }
    if (key == "=") {
        if (secondNumber === '') secondNumber = firstNumber;

        if (isAddSign) {
            if (sing === '') inputResult.value = +firstNumber / 100;
            switch (sing) {
                case "+":
                    inputResult.value = +firstNumber + ((+secondNumber/100) * +firstNumber);
                    break;
                case "-":
                    inputResult.value = +firstNumber - ((+secondNumber/100) * +firstNumber);
                    break;
                case "x":
                    inputResult.value = (+firstNumber * +secondNumber) / 100;
                    console.log(inputResult.value);
                    break;
                case "/":
                    if (secondNumber === "0") {
                        inputResult.value = "Error";
                        firstNumber = '';
                        secondNumber = '';
                        sing = '';
                        inputScoreboard.value = '';
                        return;
                    }
                    inputResult.value = (+firstNumber / +secondNumber) * 100 ;
                    break;
            }
        } else {
            switch (sing) {
                case "+":
                    inputResult.value = +firstNumber + +secondNumber;
                    break;
                case "-":
                    inputResult.value = +firstNumber - +secondNumber;
                    break;
                case "x":
                    inputResult.value = +firstNumber * +secondNumber;
                    break;
                case "/":
                    if (secondNumber === "0") {
                        inputResult.value = "Error";
                        firstNumber = '';
                        secondNumber = '';
                        sing = '';
                        inputScoreboard.value = '';
                        return;
                    }
                    inputResult.value = +firstNumber / +secondNumber;
                    break;
            }
        }
    }
});

