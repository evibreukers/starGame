// ------------------------------
// Anime.js animation around path
// ------------------------------

let score = 0;
let game = false;
let pause = false;
let getSeconds;
const path = anime.path(".world");

let moving = anime({
  targets: "#bike",
  translateX: path("x"),
  translateY: path("y"),
  rotate: path("angle"),
  easing: "linear",
  duration: 12000,
  loop: true,
});

moving.reverse();

// -------------------------------
// Keyboard controls for the puppet
// -------------------------------

const jump = document.getElementById("jump");
const wing = document.getElementById("wing");

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    jump.style.bottom = "180px";
    wing.style.bottom = "190px";
    wing.style.transform = "rotate(-40deg)";
  }

  document.querySelectorAll(".star").forEach((star) => {
    var starOffset = offset(star.firstChild);
    var divOffset = offset(jump.firstChild);
    let jumpX = divOffset.left;
    let jumpY = divOffset.top;

    if (
      jumpX >= starOffset.left - 30 &&
      jumpX <= starOffset.left + 30 &&
      jumpY >= starOffset.top - 30 &&
      jumpY <= starOffset.top + 30
    ) {
      star.style.display = "none";
      score += 1;
      document.querySelector("#stars").innerHTML = score;
      star.classList.remove("show");
      if (document.querySelectorAll(".show").length === 0) {
        game = false;
        const setTime = document.querySelector("#time").innerHTML;
        document.querySelector(
          ".loadtext"
        ).innerHTML = `you won! your time is ${setTime} <p>PRESS 'ENTER' TO PLAY AGAIN</p>`;

        const pageDown = anime({
          targets: ".loadpage",
          height: "100vh",
          duration: 2000,
          delay: 1000,
          easing: "easeInOutSine",
        });

        pageDown.finished.then(function () {
          document.querySelector(".loadtext").style.opacity = 1;
        });
      }
    }
  });
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 32) {
    jump.style.bottom = "18px";
    wing.style.bottom = "30px";
    wing.style.transform = "rotate(10deg)";
  }
});

document.querySelectorAll(".star1").forEach((star) => {
  const randomX = Math.floor(Math.random() * 15);
  const randomY = Math.floor(Math.random() * (80 - 20) + 20);
  star.style.left = `${randomX}%`;
  star.style.top = `${randomY}%`;
});

document.querySelectorAll(".star2").forEach((star) => {
  const randomX = Math.floor(Math.random() * 15);
  const randomY = Math.floor(Math.random() * (80 - 20) + 20);
  star.style.right = `${randomX}%`;
  star.style.top = `${randomY}%`;
});

document.querySelectorAll(".star3").forEach((star) => {
  const randomX = Math.floor(Math.random() * (80 - 20) + 20);
  const randomY = Math.floor(Math.random() * 15);
  star.style.left = `${randomX}%`;
  star.style.top = `${randomY}%`;
});

document.querySelectorAll(".star4").forEach((star) => {
  const randomX = Math.floor(Math.random() * (80 - 20) + 20);
  const randomY = Math.floor(Math.random() * 10);
  star.style.left = `${randomX}%`;
  star.style.bottom = `${randomY}%`;
});

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

/* PRESS UP TO SPEED UP */
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 38) {
    if (anime.speed < 4) {
      anime.speed *= 2;
    }
  }

  /* SPEED SCREEN */
  if (anime.speed === 1) {
    document.querySelectorAll(".speed").forEach((speed) => {
      speed.classList.remove("activespeed");
    });
    document.querySelector(".speed0").classList.add("activespeed");
  } else if (anime.speed === 2) {
    document.querySelectorAll(".speed").forEach((speed) => {
      speed.classList.remove("activespeed");
    });
    document.querySelector(".speed1").classList.add("activespeed");
  } else if (anime.speed === 4) {
    document.querySelectorAll(".speed").forEach((speed) => {
      speed.classList.remove("activespeed");
    });
    document.querySelector(".speed2").classList.add("activespeed");
  }
});

/* PRESS DOWN TO SLOW DOWN */
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 40) {
    if (anime.speed > 1) {
      anime.speed *= 0.5;
    }
  }
  /* SPEED SCREEN */
  if (anime.speed === 1) {
    document.querySelectorAll(".speed").forEach((speed) => {
      speed.classList.remove("activespeed");
    });
    document.querySelector(".speed0").classList.add("activespeed");
  } else if (anime.speed === 2) {
    document.querySelectorAll(".speed").forEach((speed) => {
      speed.classList.remove("activespeed");
    });
    document.querySelector(".speed1").classList.add("activespeed");
  } else if (anime.speed === 4) {
    document.querySelectorAll(".speed").forEach((speed) => {
      speed.classList.remove("activespeed");
    });
    document.querySelector(".speed2").classList.add("activespeed");
  }
});

/* COUNT DOWN */
let COUNT = 60;
let t;

function displayTime() {
  document.getElementById("time").innerHTML = `00:${COUNT}`;
}

function countDown() {
  displayTime();
  if (COUNT === 0) {
    document.querySelector(
      ".loadtext"
    ).innerHTML = `GAME OVER <p>PRESS 'ENTER' TO PLAY AGAIN</p>`;

    const pageDown = anime({
      targets: ".loadpage",
      height: "100vh",
      duration: 3000,
      delay: 1000,
      easing: "easeInOutSine",
    });

    pageDown.finished.then(function () {
      document.querySelector(".loadtext").style.opacity = 1;
    });
  } else {
    t = setTimeout(() => {
      COUNT--;
      countDown();
    }, 1000);
  }
}

function pauseTime() {
  clearTimeout(t);
}

/* RESTART BUTTON */
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const pagedown = anime({
      targets: ".loadpage",
      height: "100vh",
      duration: 1000,
      easing: "easeInOutSine",
    });

    pagedown.finished.then(() => {
      window.location.reload();
    });
  });
});

/* ON LOAD */
document.addEventListener("DOMContentLoaded", function () {
  anime({
    targets: ".loadtext",
    opacity: 1,
    duration: 500,
    delay: 500,
    easing: "easeInOutSine",
  });
});

/* PRESS R TO START GAME */
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 82 && game === false) {
    const removeText = anime({
      targets: ".loadtext",
      opacity: 0,
      duration: 300,
      easing: "easeInOutSine",
    });

    const pageUp = anime({
      targets: ".loadpage",
      height: "0vh",
      duration: 500,
      delay: 300,
      easing: "easeInOutSine",
    });

    removeText.finished.then(pageUp);
    pageUp.finished.then(countDown());

    game = true;
  }
});

/* PRESS Q TO PAUSE GAME */
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 81 && !pause) {
    moving.pause();
    pause = true;
    pauseTime();
  } else if (e.keyCode === 81 && pause) {
    moving.play();
    pause = false;
    countDown();
  }
});

/* PRESS ENTER TO START NEW GAME */
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    window.location.reload();
  }
});
