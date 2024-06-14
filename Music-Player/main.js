// Local Variable & Arrays
let index = 6;
let isShuffled = false;
let isLooping = false;
let colorAccent;
let prevNum;
let currentTheme;
const MusicList = [
  { name: "Mine", source: "Musics/Mine.mp3", artistName: "Bazzi", imgSource: "./MusicCovers/Mine.png", Duration: '02:14' },
  { name: "Beautiful", source: "Musics/Beautiful.mp3", artistName: "Bazzi", imgSource: "./MusicCovers/Beautiful.jpeg", Duration: '03:00' },
  { name: "Hurts So Good", source: "./Musics/Hurts So Good.mp3", artistName: "Alyssa", imgSource: "./MusicCovers/Hurts So Good.jpg", Duration: '03:28' },
  { name: "Lost On You", source: "./Musics/Lost On You.mp3", artistName: "LP", imgSource: "./MusicCovers/Lost On You.jpg", Duration: '04:30' },
  { name: "Let The World Burn", source: "./Musics/Let The World Burn.mp3", artistName: "Chris Grey", imgSource: "./MusicCovers/LetTheWorldBurn.jpg", Duration: '02:43' },
  { name: "Outrunning Karma", source: "./Musics/Outrunning Karma.mp3", artistName: "Alec Benjamin", imgSource: './MusicCovers/Outrunning Karma.jpg', Duration: '03:08' },
  { name: "Runaway", source: "./Musics/Runaway.mp3", artistName: "Aurora", imgSource: "./MusicCovers/Runaway.png", Duration: '04:09' },
  { name: "OverNight", source: "./Musics/Overnight.mp3", artistName: "Queen Herby", imgSource: "./MusicCovers/Overnight.png", Duration: '02:41' }
];
const TransparentThemes = [
  { Name: "Light", Accent: "rgb(255, 255, 255, 0.3)", textColor: "black" },
  { Name: "Dark", Accent: "rgb(0, 0, 0, 0.1)", textColor: "white" },
  { themeName: 'Transparent' }
];
const MaterialThemes = [
  { Name: "Light", Accent: "white", textColor: "#171717" },
  { Name: "Dark", Accent: "#202020", textColor: "#eee" },
  { themeName: 'Material' },
];
const DarkModeCode = `
<div id="switch-button" class="theme-toggle" title="Toggle theme">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke-linecap="round"
    class="theme-toggle__classic"
    viewBox="0 0 32 32"
  >
    <clipPath id="theme-toggle__classic__cutout">
      <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
    </clipPath>
    <g clip-path="url(#theme-toggle__classic__cutout)">
      <circle cx="16" cy="16" r="9.34" />
      <g stroke="currentColor" stroke-width="1.5">
        <path d="M16 5.5v-4" />
        <path d="M16 30.5v-4" />
        <path d="M1.5 16h4" />
        <path d="M26.5 16h4" />
        <path d="m23.4 8.6 2.8-2.8" />
        <path d="m5.7 26.3 2.9-2.9" />
        <path d="m5.8 5.8 2.8 2.8" />
        <path d="m23.4 23.4 2.9 2.9" />
      </g>
    </g>
  </svg> `;
// End

// Elmt Declarations 
const MusicListELmt = document.getElementById('MusicList');
const Songs = document.getElementsByClassName("ListSongs");
const songImages = document.getElementsByClassName("songImage");
const playElmt = document.getElementById("Play");
const pauseElmt = document.getElementById("Pause");
const NextSongElmt = document.getElementById("NextSong");
const PrevSongElmt = document.getElementById("PrevSong");
const durationElmt = document.getElementsByClassName("duration")[0];
const MusicCardElmt = document.getElementsByClassName("MusicCard")[0];
const MainContainer = document.getElementsByClassName("Main")[0];
const musicCoverElmt = document.getElementById("Image");
const rangeElmt = document.getElementById("progress");
const rangeBarElmt = document.getElementById("progress-bar");
const songElmt = document.getElementById("Song");
const icon = document.getElementById("icon");
const sideBar = document.getElementById("sidebar");
const sideBarBtn = document.getElementById("sidebar-button");
const ionIcons = document.getElementsByTagName("ion-icon");
const awesomeIcons = document.getElementsByTagName("i");
const themeBar = document.getElementById("theme-popup");
const ThemesOptions = document.getElementsByClassName("Themes");
// End

// Functions
function createSongs() {
  for (let i = 1; i < MusicList.length; i++) {
    MusicListELmt.innerHTML += `
        <div class="ListSongs Songs--Light">
                <div style="background-image: url('${MusicList[i].imgSource}');" class="songImage"></div>
                <div class="songInfo">
                    <div class="Title">${MusicList[i].name}</div>
                    <div class="artistName">${MusicList[i].artistName}</div>
                </div>
                <div class="songDuration">
                    <h4>${MusicList[i].Duration}</h4>
                </div>
            </div>
        `;
  }
  for (let i = 0; i < songImages.length; i++) {
    Songs[i].addEventListener("click", () => {
      applySongEffect();
      index = i;
      PlaySong();
    });
  }
}

createSongs();

function applySongEffect() {
  for (let i = 0; i < Songs.length; i++) {
    Songs[i].classList.remove("activeSong");
    Songs[i].children[0].classList.remove("activeSongImage");
  }
  Songs[index].classList.add("activeSong");
  Songs[index].children[0].classList.add("activeSongImage");
}

function seekColor() {
  try {
    colorjs.prominent(`${MusicList[index].imgSource}`, { amount: 1 }).then(color => {
      rangeElmt.style.backgroundColor = `rgb(${color.toString()})`;
      colorAccent = `rgb(${color.toString()}, 0.3)`;
      if (isLooping) {
        document.getElementById("Loop").style.backgroundColor = colorAccent;
      }
      if (isLooping) {
        document.getElementById("Shuffle").style.backgroundColor = colorAccent;
      }
    });
  }
  catch (err) { console.log(err); }
}

function InitializeSongs() {
  applySongEffect();
  seekColor();
  songElmt.src = MusicList[index].source;
  document.body.style.backgroundImage = `url('${MusicList[index].imgSource}')`;
  MusicCardElmt.innerHTML = `
    <div style="background-image: url('${MusicList[index].imgSource}');" id="Image" class="Image"></div>
    <div class="Info">
        <h2 class="songTitle">${MusicList[index].name}</h2>
        <h3 class="songArtist">${MusicList[index].artistName}</h3>
    </div>
    `

  setInterval(function () {
    var Second = parseInt(songElmt.currentTime % 60);
    var Minute = parseInt((songElmt.currentTime / 60) % 60);
    let percentage = (songElmt.currentTime / songElmt.duration) * 100;
    let durationMinutes = Math.floor(songElmt.duration / 60);
    let durationSeconds = Math.floor(songElmt.duration % 60);
    let formattedDuration = `${(durationMinutes).toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
    rangeElmt.style.width = `${percentage}%`;
    rangeBarElmt.addEventListener('click', (e) => {
      let derivedDuration = (e.layerX * 100) / 420;
      rangeElmt.style.width = `${derivedDuration}%`;
      songElmt.currentTime = (derivedDuration / 100) * songElmt.duration;
    });
    durationElmt.innerHTML = `
        <div class="currDuration">${(Minute.toString()).padStart(2, "0")}:${(Second.toString()).padStart(2, "0")}</div>
        <div class="fullDuration">${formattedDuration}</div>`
  }, 1000);
}

InitializeSongs();

function PlaySong() {
  songElmt.play();
  playElmt.style.display = "none";
  pauseElmt.style.display = "grid";
  songElmt.addEventListener('ended', () => {
    if (isLooping) {
      songElmt.currentTime = 0;
      songElmt.play();
    }
    else {
      applySongEffect();
      NextSong();
    }
  });
}

function PauseSong() {
  songElmt.pause();
  playElmt.style.display = "grid";
  pauseElmt.style.display = "none";
}

function NextSong() {
  if (isShuffled) {
    do {
      index = Math.floor(Math.random() * MusicList.length);
      songElmt.src = MusicList[index].source;
    } while (index == prevNum)
    prevNum = index;
    PlaySong();
  }
  else {
    index++;
    if (index > MusicList.length - 1) {
      index = 0;
      songElmt.src = MusicList[index].source;
      PlaySong();
    }
    else {
      songElmt.src = MusicList[index].source;
      PlaySong();
    }
  }
}

function PrevSong() {
  index--;
  if (isShuffled) {
    index = Math.floor(Math.random() * MusicList.length) + 1;
    songElmt.src = MusicList[index].source;
    PlaySong();
  }
  else {
    if (index < 0) {
      index = MusicList.length - 1;;
      songElmt.src = MusicList[index].source;
      PlaySong();
    }
    else {
      songElmt.src = MusicList[index].source;
      PlaySong();
    }
  }
}

function ShuffleSong() {
  if (isShuffled) {
    document.getElementById("Shuffle").style.background = `rgba(255, 255, 255, 0.1)`;
    document.getElementById("Shuffle").style.color = "white";
  }
  else {
    document.getElementById("Shuffle").style.backgroundColor = colorAccent;
    document.getElementById("Shuffle").style.color = "white";
  }
  isShuffled = !isShuffled;
}
function LoopSong() {
  if (isLooping) {
    document.getElementById("Loop").style.background = `rgba(255, 255, 255, 0.1)`;
    document.getElementById("Loop").style.color = "white";
  }
  else {
    document.getElementById("Loop").style.backgroundColor = colorAccent;
    document.getElementById("Loop").style.color = "white";
  }
  isLooping = !isLooping;
}
let isDarkButtonPressed = false;
let isDarkModeOn = false;
const Theme = document.getElementById("mode-switcher");
Theme.addEventListener("click", () => {
  const switchButton = document.getElementById("switch-button");
  if (isDarkButtonPressed) {
    switchButton.classList.remove("theme-toggle--toggled");
    currentTheme == "Transparent" ? changeThemes(TransparentThemes, "Light") : changeThemes(MaterialThemes, "Light");
  }
  else {
    switchButton.classList.add("theme-toggle--toggled");
    currentTheme == "Transparent" ? changeThemes(TransparentThemes, "Dark") : changeThemes(MaterialThemes, "Dark");
  }
  isDarkButtonPressed = !isDarkButtonPressed;
});

let isSideBarOpen = false;
sideBarBtn.addEventListener("click", () => {
  if (isSideBarOpen) {
    sideBar.classList.replace("sidebar--open", "sidebar--close");
    MainContainer.style.transform = "translateX(0%)";
    icon.style.transform = "rotate(0deg)";
    sideBar.style.scale = "1";
    sideBar.style.width = '30%';
    MainContainer.style.display = "flex";
  }
  else {
    sideBar.classList.replace("sidebar--close", "sidebar--open");
    MainContainer.style.transform = "translateX(35%)";
    icon.style.transform = "rotate(180deg)";
    if (window.screen.width < 800) {
      sideBar.style.scale = "0.8";
      sideBar.style.width = "105%";
      MainContainer.style.transform = "translateX(200%)";
    }
  }
  isSideBarOpen = !isSideBarOpen;
});
function evokeTheme() {
  sideBar.classList.replace("sidebar--open", "sidebar--close");
  themeBar.style.display = "flex";
  icon.style.transform = "rotate(0deg)";
  for (let i = 0; i < ThemesOptions.length; i++) {
    ThemesOptions[i].addEventListener("click", function () {
      themeBar.style.display = "none";
      MainContainer.style.transform = "translateX(0)";
      MainContainer.style.display = "flex";
      if (i == 0) { changeThemes(TransparentThemes, "Light"); }
      else { changeThemes(MaterialThemes, "Light"); }
    });
  }

}

Theme.innerHTML = DarkModeCode;


// Responsive Code 

if (window.screen.width > 800 && window.screen.width < 1000) {
  MainContainer.style.scale = "0.8";
}
else if (window.screen.width < 600) {
  MainContainer.style.scale = "0.7";
}
else if (window.screen.width < 400) {
  MainContainer.style.scale = "0.6";
}
else if (window.screen.width > 1000 && window.screen.width < 1500) {
  MainContainer.style.scale = "0.9";
}
else {
  MainContainer.style.scale = "1";
}
function changeThemes(Mode, theme) {
  const themeButton = document.getElementsByClassName("theme-button")[0];
  const switchButton = document.getElementById("switch-button");
  const modeSwitcher = document.getElementById("mode-switcher");
  const ThemingElements = [MainContainer, sideBar, sideBarBtn, themeButton, modeSwitcher];
  if (theme == "Dark") {
    switchButton.classList.add("theme-toggle--toggled");
    let x = 1;
    for (let i = 0; i < ThemingElements.length; i++) {
      ThemingElements[i].style.backgroundColor = Mode[x].Accent;
      ThemingElements[i].style.color = Mode[x].textColor;
    }
    durationElmt.style.color = Mode[x].textColor;
    for (let i = 0; i < ionIcons.length; i++) {
      ionIcons[i].style.color = Mode[x].textColor
    }
    for (let a = 0; a < awesomeIcons.length; a++) {
      awesomeIcons[a].style.color = Mode[x].textColor;
    }
    if (Mode[2].themeName == "Transparent") { for (let i = 0; i < Songs.length; i++) { Songs[i].style.backgroundColor = Mode[x].Accent; Songs[i].style.color = Mode[x].textColor; } }
    else { for (let i = 0; i < Songs.length; i++) { Songs[i].style.backgroundColor = ''; Songs[i].style.color = ''; Songs[i].classList.replace("Songs--Light", "Songs--Dark"); } }
  }
  else {
    let x = 0;
    switchButton.classList.remove("theme-toggle--toggled");
    for (let i = 0; i < ThemingElements.length; i++) {
      ThemingElements[i].style.backgroundColor = Mode[x].Accent;
      ThemingElements[i].style.color = Mode[x].textColor;
    }
    durationElmt.style.color = Mode[x].textColor;
    for (let i = 0; i < ionIcons.length; i++) {
      ionIcons[i].style.color = Mode[x].textColor
    }
    for (let a = 0; a < awesomeIcons.length; a++) {
      awesomeIcons[a].style.color = Mode[x].textColor;
    }
    if (Mode[2].themeName == "Transparent") { for (let i = 0; i < Songs.length; i++) { Songs[i].style.backgroundColor = Mode[x].Accent; Songs[i].style.color = Mode[x].textColor } }
    else { for (let i = 0; i < Songs.length; i++) { Songs[i].style.backgroundColor = ''; Songs[i].style.color = ''; Songs[i].classList.replace("Songs--Dark", "Songs--Light"); } }
  }
  Mode[2].themeName == "Transparent" ? currentTheme = "Transparent" : currentTheme = "Material";
}

changeThemes(TransparentThemes, "Light");