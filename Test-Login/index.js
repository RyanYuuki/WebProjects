let img = '';
const Images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
let index = 0;

function changeTheme() {
    document.getElementById("theme").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("images").style.display = "flex";
    document.getElementById("images").style.flexWrap = "wrap"; 
    document.getElementById("images").style.gap = "10px";
    document.getElementById("theme1").style.display = "flex";
}
function RevertElement() {
  document.getElementById("images").style.display = "none";
  document.getElementById("container").style.display = "flex";
  document.getElementById("theme1").style.display = "none";
  document.getElementById("theme").style.display = "flex";
}

function changeBackground(img) {
  document.body.style.backgroundImage = `url('${img}.jpg')`;
}

let LastNum;

function swapBackground() {
    let Max = Images.length;
    let RandNum = Math.floor((Math.random() * Max) + 1);

    while (LastNum === RandNum) {
        RandNum = Math.floor(Math.random() * Max) + 1;
    }

    document.body.style.backgroundImage = `url('${RandNum}.jpg')`;

    console.log("Last number:", LastNum);
    LastNum = RandNum;
    console.log("Current number:", RandNum);
}
