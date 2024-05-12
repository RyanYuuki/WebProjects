const searchBarElmt = document.getElementsByClassName("searchBar")[0];
const wordElmt = document.getElementsByClassName("Word")[0];
const PronounciationElmt = document.getElementsByClassName("Pronounciation")[0];
const MeaningElmt = document.getElementsByClassName("Meaning")[0];
const ExampleElmt = document.getElementsByClassName("Example")[0];
const SoundElmt = document.getElementById("Sound"); 
async function searchWord() {
    let counter = 0;
    const Response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchBarElmt.value}`);
    const Data = await Response.json();
    wordElmt.innerHTML = searchBarElmt.value;
    for(let i = 0; i < Data.length; i++) {
        for(let j = 0; j < Data[i].phonetics.length; j++) { 
            PronounciationElmt.innerHTML = Data[i].phonetics[j].text;
        }
        for (let j = 0; j < Data[i].meanings.length; j++)
        {
            for(let x = 0; x < Data[i].meanings[j].definitions.length; x++)
            {
                if(counter == 0)
                {
                    if (Data[i].meanings[j].definitions[x].definition != '' ) {
                        MeaningElmt.innerHTML = Data[i].meanings[j].definitions[x].definition;
                        counter = 1;
                    }
                }
                if (counter == 1) {
                    if (Data[i].meanings[j].definitions[x].example != '') {
                        ExampleElmt.innerHTML = Data[i].meanings[j].definitions[x].example;
                        counter = 2;
                    }
                }
            }
            
        }
    }
    SoundElmt.src = `${Data[0].phonetics[0].audio}`;
    if (ExampleElmt.textContent == "undefined")
    {
        ExampleElmt.innerHTML = "No Example Found";
    }
}

document.getElementById("audioBtn").addEventListener('click', () => {
    SoundElmt.play();
});