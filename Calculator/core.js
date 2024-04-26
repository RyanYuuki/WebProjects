const Result = document.getElementById("display");

let value;
let DisplayValue;
let optional;
let index = 0;
function AppendtoDisplay(value)
{

    if(value == "()"  ){
        if(index == 1)
        {
            Result.value += ")";
            index = 0;
        }
        else {
            index++;
            Result.value += "(";
        }
    }
    else{
        Result.value += `${value}`;
    }
}

function Calculate() {
    let length = Result.value.length;
    if (Result.value[length - 1] == "%") {
        let number = Number(eval(Result.value.slice(0, -1)))/100;
        parseFloat(number);
        Result.value = `${parseFloat(number)}`;
    } else {
        Result.value = `${eval(Result.value)}`;
    }
}

function BackspaceDisplay()
{
    Result.value = Result.value.slice(0,-1);
}

function ClearDisplay(){
    Result.value = '';
}

const btn = document.getElementsByTagName('button');

document.body.addEventListener("keydown", (event) => {
    if(event.key == '1')
    {
        AppendtoDisplay('1');
    }
    if(event.key == '2')
    {
        AppendtoDisplay('2');
    }
    if(event.key == '3')
    {
        AppendtoDisplay('3');
    }
    if(event.key == '4')
    {
        AppendtoDisplay('4');
    }
    if(event.key == '5')
    {
        AppendtoDisplay('5');
    }
    if(event.key == '6')
    {
        AppendtoDisplay('6');
    }
    if(event.key == '7')
    {
        AppendtoDisplay('7');
    }
    if(event.key == '8')
    {
        AppendtoDisplay('8');
    }
    if(event.key == '9')
    {
        AppendtoDisplay('9');
    }
    if(event.key == '0')
    {
        AppendtoDisplay('0');
    }
    if(event.key == 'Backspace')
    {
        BackspaceDisplay();
    }
});