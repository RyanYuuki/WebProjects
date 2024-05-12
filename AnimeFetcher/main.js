const fetchTypeElmt = document.getElementsByClassName("searchType")[0];
let searchType;
function fetchType(Type)
{
    if(Type == 'Random')
    {
        fetchTypeElmt.children[1].classList.remove('Active');
        fetchTypeElmt.children[2].classList.remove('Active');
        fetchTypeElmt.children[0].classList.add('Active');
        document.getElementsByClassName("inputBox")[0].style.display = 'none'; 
        searchAnime(0);
    }
    if(Type == 'Anime')
    {
        fetchTypeElmt.children[0].classList.remove('Active');
        fetchTypeElmt.children[2].classList.remove('Active');
        fetchTypeElmt.children[1].classList.add('Active');
        document.getElementsByClassName("inputBox")[0].style.display = 'grid'; 
        searchType = 1;
    }
    if(Type == 'Character')
    {
        fetchTypeElmt.children[1].classList.remove('Active');
        fetchTypeElmt.children[0].classList.remove('Active');
        fetchTypeElmt.children[2].classList.add('Active');
        document.getElementsByClassName("inputBox")[0].style.display = 'grid'; 
        searchType = 2;
    }
}
async function searchAnime(searchType)
{
    const searchBarElmt = document.getElementsByClassName("searchBar")[0];
    const quoteElmt = document.getElementsByClassName("Quote")[0];
    const referenceElmt = document.getElementsByClassName("Reference")[0]; 
    if(searchType == 0)
    {
        const Response = await fetch("https://animechan.xyz/api/random");
        const Data = await  Response.json();
        quoteElmt.textContent = `${Data.quote}`;
        referenceElmt.textContent = `- ${Data.character}`;
    }
    if (searchType == 1) {
        const Response = await fetch("https://animechan.xyz/api/random/anime?title=" + searchBarElmt.value);
        const Data = await Response.json();
        quoteElmt.textContent = `${Data.quote}`
        referenceElmt.textContent = `- ${Data.character}`;
    } 
    if (searchType == 2) {
        const Response = await fetch(`https://animechan.xyz/api/random/character?name=${searchBarElmt.value}`)
        const Data = await Response.json();
        quoteElmt.textContent = `${Data.quote}`;
        referenceElmt.textContent = `- ${Data.anime}`;        
    }

}
