const mainDiv = document.getElementsByClassName('Main')[0];
const nextPageElmt = document.getElementsByClassName('NextPage')[0];
function NextPage() {
    mainDiv.style.display = 'none';
    nextPageElmt.style.display = 'grid'; 
}

function PrevPage()
{
    mainDiv.style.display = 'grid';
    nextPageElmt.style.display = 'none'; 
}
