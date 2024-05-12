const spriteElmt = document.getElementsByClassName("Sprite")[0];
const adsElmt = document.getElementsByClassName("Num");
const pokemonTypeElmt = document.getElementsByClassName("Type")[0]; 
const hpElmt = document.getElementsByClassName("HP")[0];
const pokemonNameElmt = document.getElementsByClassName("Name")[0];
const curveElmt = document.getElementsByClassName("Curve")[0];
const generateElmt = document.getElementsByClassName("Generate")[0];
async function fetchData()
{
    let randomNumber = Math.floor(Math.random() * 150) + 1;
    const Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
    const Data = await Response.json();
    spriteElmt.innerHTML = `<img src='${Data.sprites.other.dream_world.front_default}' />`;
    pokemonNameElmt.textContent = Data.forms[0].name;
    curveElmt.style.display = "block";
    hpElmt.innerHTML = `HP<span>${Data.stats[0].base_stat}</span>`;
    if(Data.types[0].type.name == "Wind")
    {
        pokemonTypeElmt.style.background = "orangered";
        curveElmt.style.background = "orangered";     
    }
    if(Data.types[0].type.name == "grass" || Data.types[0].type.name == "bug") {
        pokemonTypeElmt.style.background = "lightgreen";
        curveElmt.style.background = "lightgreen";
    }
    if(Data.types[0].type.name == "fire") {
        pokemonTypeElmt.style.background = "tomato";
        curveElmt.style.background = "tomato";
    }
    if(Data.types[0].type.name == "water") {
        pokemonTypeElmt.style.background = "lightblue";
        curveElmt.style.background = "lightblue";
    }
    if(Data.types[0].type.name == "electric") {
        pokemonTypeElmt.style.background = "yellow";
        curveElmt.style.background = "yellow";
    }
    if(Data.types[0].type.name == "ghost" || Data.types[0].type.name == "psychic")
    {
        pokemonTypeElmt.style.background = "purple"; 
        curveElmt.style.background = "purple";
    }
    if(Data.types[0].type.name == "dragon" || Data.types[0].type.name == "dark")
    {
        pokemonTypeElmt.style.background = "black"; 
        curveElmt.style.background = "black";
    }
    if(Data.types[0].type.name == "ground" || Data.types[0].type.name == "rock" || Data.types[0].type.name == "normal")
    {
        pokemonTypeElmt.style.background = "lightsalmon"; 
        curveElmt.style.background = "lightsalmon";
    }
    if(Data.types[0].type.name == "steel") {
        pokemonTypeElmt.style.background = "grey"; 
        curveElmt.style.background = "grey";
    }
    for(let x = 1; x < 4; x++)
    {
        adsElmt[x-1].textContent = Data.stats[x].base_stat;
    }
    pokemonTypeElmt.textContent = Data.types[0].type.name; 
    console.log(Data);
}