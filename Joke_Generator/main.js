const jokeElmt = document.getElementsByClassName("Joke")[0];
const emojiElmt = document.getElementsByClassName("Emoji")[0];
const jokeBtn = document.getElementsByClassName("jokeBtn")[0];
const punchlineBtnElmt = document.getElementsByClassName("punchlineBtn")[0];
let tempPunchLine;
let tempSetup;
async function fetchData()
{
    const response = await fetch(`https://official-joke-api.appspot.com/random_joke`);
    const data = await response.json();
    tempPunchLine = data.punchline;
    tempSetup = data.setup;
}
jokeBtn.addEventListener("click", () => {
    jokeBtn.style.display = "none";
    emojiElmt.style.display = "none";
    punchlineBtnElmt.style.display = "block";
    jokeElmt.innerHTML = tempSetup;
});

punchlineBtnElmt.addEventListener("click", () => {
    jokeBtn.style.display = "block";
    punchlineBtnElmt.style.display = "none";
    jokeElmt.innerHTML = tempPunchLine;
    emojiElmt.style.display = "grid";
    fetchData();
});

fetchData();