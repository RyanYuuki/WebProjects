const Result = document.getElementById("display");

let value;
let DisplayValue;
let optional;
let index = 0;

function Calculate() {
    let length = Result.value.length;
    if (Result.value[length - 1] == "%") {
        let number = Number(eval(Result.value.slice(0, -1))) / 100;
        parseFloat(number);
        Result.value = `${parseFloat(number)}`;
    } else {
        Result.value = `${eval(Result.value)}`;
    }
}

function BackspaceDisplay() {
    Result.value = Result.value.slice(0, -1);
}

const btn = document.getElementsByTagName('button');

function applyMethods() {
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', (e) => {
            let Temp = parseInt(e.target.textContent);
            if (isNaN(Temp)) {
                if (e.target.textContent == "C") {
                    Result.value = "";
                }
                if (e.target.textContent == "=") {
                    Calculate();
                }
                if (e.target.textContent == "/" || e.target.textContent == "*" || e.target.textContent == "-" || e.target.textContent == "+" || e.target.textContent == "-") {
                    if (Result.value[Result.value.length - 1] == "/" || Result.value[Result.value.length - 1] == "*" || Result.value[Result.value.length - 1] == "-" || Result.value[Result.value.length - 1] == "+" || Result.value[Result.value.length - 1] == "-") {
                        window.alert("Cannot use 2 Operators Simultaneously!");
                    }
                    else {
                        Result.value += e.target.textContent;
                    }
                   
                }
            }
            else {
                Result.value += e.target.textContent;
            }

        });
    }
}

applyMethods();