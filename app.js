// preLoader function...
setTimeout(function() {
    $('.loader_bg').fadeToggle();
}, 1500);

// main container function....
const music = document.querySelector('audio');
const play = document.getElementById('play');
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist= document.getElementById('artist');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress');
let duration_time = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');

const allMusic = [
    {
        name : "song-1",
        title : "aniket prantor",
        artist : "by artcell"
    },
    {
        name : "song-2",
        title : "abar hashimukh",
        artist : "by shironamhin"
    },
    {
        name : "song-3",
        title : "shey amare",
        artist : "by ashes"
    },
    {
        name : "song-4",
        title : "Nijer jonno",
        artist : "by ashes"
    },
    {
        name : "song-5",
        title : "charpoka",
        artist : "by ashes"
    },
    {
        name : "song-6",
        title : "bhindeshi tara",
        artist : "by ashes"
    }
]


let isPlaying = false;

const playMusic = ()=>{
    music.play();
    isPlaying = true;
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('anime')
};

const pauseMusic = ()=>{
    music.pause();
    isPlaying = false;
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('anime')
};

play.addEventListener('click', ()=>{
    isPlaying ? pauseMusic() : playMusic();
});

const loadSong = (allMusic) =>{
    title.textContent = allMusic.title;
    artist.textContent = allMusic.artist;
    music.src = `musics/${allMusic.name}.mp3`;
    img.src = `images/${allMusic.name}.jpg`;

}
musicIndex = 0;
const nextSong = () =>{
    musicIndex = (musicIndex + 1) % allMusic.length;
    loadSong(allMusic[musicIndex]) ;
    playMusic()
}
const prevSong = () =>{
    musicIndex = (musicIndex + 1 + allMusic.length) % allMusic.length;
    loadSong(allMusic[musicIndex]) ;
    playMusic()
}
// Progress work...
music.addEventListener('timeupdate', (event) =>{
    const {currentTime, duration} = event.srcElement;
    let progress_time = (currentTime / duration) * 100;

    progress.style.width = `${progress_time}%`;

// main time...
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if (duration) {
        duration_time.innerText = `${min_duration}:${sec_duration}`;
    }

// current time...
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (currentTime) {
        current_time.innerText = `${min_currentTime}:${sec_currentTime}`;
    }
});
// progress click song functionality...
progress_div.addEventListener('click',(event)=>{
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;   
    music.currentTime = move_progress;
})

// song end and call next song..
music.addEventListener('ended',nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

