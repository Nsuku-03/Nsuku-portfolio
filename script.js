document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // WELCOME MESSAGE
  // ========================================

  if (!sessionStorage.getItem("welcomed")) {

    setTimeout(() => {

      alert("Welcome to my personal portfolio website!");

      sessionStorage.setItem("welcomed", "yes");

    }, 300);

  }


  // ========================================
  // DARK / LIGHT MODE
  // ========================================

  const themeBtn = document.getElementById("themeBtn");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {

    document.body.classList.add("dark");

  }


  function updateThemeButton() {

    if (!themeBtn) return;

    themeBtn.textContent =
      document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

  }


  if (themeBtn) {

    updateThemeButton();

    themeBtn.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
          ? "dark"
          : "light"
      );

      updateThemeButton();

    });

  }


  // ========================================
  // DIGITAL CLOCK
  // ========================================

  const clock = document.getElementById("clock");


  function updateClock() {

    if (clock) {

      clock.textContent =
        new Date().toLocaleTimeString();

    }

  }


  updateClock();

  setInterval(updateClock, 1000);


  // ========================================
  // SHOW / HIDE INFORMATION
  // ========================================

  const toggleBtn =
    document.getElementById("toggleBtn");

  const extraInfo =
    document.getElementById("extraInfo");


  if (toggleBtn && extraInfo) {

    toggleBtn.addEventListener("click", () => {

      extraInfo.classList.toggle("hidden");

      toggleBtn.textContent =
        extraInfo.classList.contains("hidden")
          ? "Show More About Me"
          : "Show Less";

    });

  }


  // ========================================
  // CONTACT FORM VALIDATION
  // ========================================

  const form =
    document.getElementById("contactForm");

  const formMessage =
    document.getElementById("formMessage");


  if (form) {

    form.addEventListener("submit", (event) => {

      event.preventDefault();


      const name =
        document.getElementById("name").value.trim();

      const email =
        document.getElementById("email").value.trim();

      const message =
        document.getElementById("message").value.trim();


      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (name.length < 2) {

        alert("Please enter your full name.");

        return;

      }


      if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;

      }


      if (message.length < 5) {

        alert("Please enter a longer message.");

        return;

      }


      if (formMessage) {

        formMessage.style.display = "block";

        formMessage.textContent =
          "Thank you! Your message has been validated successfully.";

      }


      form.reset();

    });

  }


  // ========================================
  // IMAGE SLIDESHOW
  // ========================================

  const slideImage =
    document.getElementById("slideImage");

  const dots =
    document.getElementsByClassName("dot");


  const images = [

    "prophoto.jpg",

    "myFmlphoto.jpg",

    "hobbies1.jpg",

    "hobbies.jpg"

  ];


  let slideIndex = 0;

  let slideInterval;


  // ========================================
  // SHOW IMAGE
  // ========================================

  function showSlide(index) {

    if (!slideImage) return;


    slideIndex = index;


    // Fade out
    slideImage.style.opacity = "0";


    setTimeout(() => {

      slideImage.src =
        images[slideIndex];


      slideImage.style.opacity = "1";

    }, 500);


    // Update dots
    for (let i = 0; i < dots.length; i++) {

      dots[i].classList.remove("active");

    }


    if (dots[slideIndex]) {

      dots[slideIndex].classList.add("active");

    }

  }


  // ========================================
  // NEXT / PREVIOUS
  // ========================================

  window.plusSlides = function (number) {

    slideIndex += number;


    if (slideIndex >= images.length) {

      slideIndex = 0;

    }


    if (slideIndex < 0) {

      slideIndex =
        images.length - 1;

    }


    showSlide(slideIndex);


    restartSlideshow();

  };


  // ========================================
  // DOT NAVIGATION
  // ========================================

  window.currentSlide = function (number) {

    slideIndex = number - 1;


    showSlide(slideIndex);


    restartSlideshow();

  };


  // ========================================
  // AUTOMATIC SLIDESHOW
  // ========================================

  function startSlideshow() {

    slideInterval =
      setInterval(() => {

        slideIndex++;


        if (slideIndex >= images.length) {

          slideIndex = 0;

        }


        showSlide(slideIndex);

      }, 8000); // 5 seconds

  }


  // ========================================
  // RESTART SLIDESHOW
  // ========================================

  function restartSlideshow() {

    clearInterval(slideInterval);

    startSlideshow();

  }


  // Start slideshow only if it exists
  if (slideImage) {

    showSlide(0);

    startSlideshow();

  }

});
/* =========================
   MUSIC PLAYER
========================= */

const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");


const songs = [
  {
    title: "Magwala a Cheche",
    artist: "Kaycherlow NLL feat Shebeshxt, Cliff Kayden, Naqua SA & Inkreys",
    src: "music/magwala-a-cheche.mp3"
  }
];

let currentSong = 0;


/* Load Song */

function loadSong(index) {

  if (!audioPlayer) return;

  const song = songs[index];

  audioPlayer.src = song.src;

  if (songTitle) {
    songTitle.textContent = song.title;
  }

  if (songArtist) {
    songArtist.textContent = song.artist;
  }

  audioPlayer.load();

  if (progressBar) {
    progressBar.value = 0;
  }

  if (currentTimeDisplay) {
    currentTimeDisplay.textContent = "0:00";
  }
}


/* Play Song */

function playSong() {

  if (!audioPlayer) {
    console.log("Audio player not found.");
    return;
  }

  audioPlayer.play()
    .then(() => {
      if (playBtn) {
        playBtn.textContent = "⏸";
      }
    })
    .catch((error) => {
      console.error("Music could not play:", error);
      alert("The music file could not be loaded. Please check the music folder and MP3 filename.");
    });
}


/* Pause Song */

function pauseSong() {

  if (!audioPlayer) return;

  audioPlayer.pause();

  if (playBtn) {
    playBtn.textContent = "▶";
  }
}


/* Play / Pause */

if (playBtn) {

  playBtn.addEventListener("click", () => {

    if (audioPlayer.paused) {
      playSong();
    } else {
      pauseSong();
    }

  });

}


/* Previous Song */

if (prevBtn) {

  prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
      currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

  });

}


/* Next Song */

if (nextBtn) {

  nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
      currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

  });

}


/* Update Progress Bar */

if (audioPlayer) {

  audioPlayer.addEventListener("timeupdate", () => {

    if (!audioPlayer.duration) return;

    const progress =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.value = progress;

    currentTimeDisplay.textContent =
      formatTime(audioPlayer.currentTime);

  });


  /* Show Duration */

  audioPlayer.addEventListener("loadedmetadata", () => {

    durationDisplay.textContent =
      formatTime(audioPlayer.duration);

  });


  /* Automatically play next song */

  audioPlayer.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
      currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

  });

}


/* Change Song Position */

if (progressBar) {

  progressBar.addEventListener("input", () => {

    if (!audioPlayer.duration) return;

    audioPlayer.currentTime =
      (progressBar.value / 100) * audioPlayer.duration;

  });

}


/* Volume */

if (volumeBar) {

  volumeBar.addEventListener("input", () => {

    audioPlayer.volume = volumeBar.value;

  });

}


/* Format Time */

function formatTime(time) {

  if (isNaN(time)) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);

  const seconds = Math.floor(time % 60);

  return minutes + ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}


/* Load First Song */

if (audioPlayer) {

  audioPlayer.volume = 0.7;

  loadSong(currentSong);

}
/* =========================
   DRAGGABLE MUSIC PLAYER
========================= */

const musicPlayer = document.getElementById("musicPlayer");
const musicHeader = document.getElementById("musicHeader");
const minimizeMusic = document.getElementById("minimizeMusic");
const musicContent = document.getElementById("musicContent");


/* Minimize / Restore */

if (minimizeMusic) {

  minimizeMusic.addEventListener("click", () => {

    musicContent.classList.toggle("music-hidden");

    if (musicContent.classList.contains("music-hidden")) {

      minimizeMusic.textContent = "+";

    } else {

      minimizeMusic.textContent = "−";

    }

  });

}


/* Drag Player */

if (musicPlayer && musicHeader) {

  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;


  musicHeader.addEventListener("mousedown", (event) => {

    isDragging = true;

    const rect = musicPlayer.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    musicPlayer.style.right = "auto";

  });


  document.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;


    /* Keep player inside screen */

    const maxX =
      window.innerWidth - musicPlayer.offsetWidth;

    const maxY =
      window.innerHeight - musicPlayer.offsetHeight;


    newX = Math.max(0, Math.min(newX, maxX));

    newY = Math.max(0, Math.min(newY, maxY));


    musicPlayer.style.left = newX + "px";
    musicPlayer.style.top = newY + "px";

  });


  document.addEventListener("mouseup", () => {

    isDragging = false;

  });

}