// more sound effects at https://www.myinstants.com/en/search/?name=FNAF

let matchCount = 0; // Counts how many pairs matched
let seconds = 20; // Timer starts at 20 seconds
let timerInterval; // Will store setInterval for timer
let click = 0; // Counts how many cards are flipped
let flippedCards = []; // Stores the currently flipped cards
let lockBoard = false; // Prevent clicking during animations
let tickingStarted = false; // To start ticking sound only once
const emptyImg = "images/empty.png"; // Blank image for reset

// ----------------------
// CARD ELEMENTS
// ----------------------

j1 = document.getElementById("joker1");
j2 = document.getElementById("joker2");
c1 = document.getElementById("clover1");
c2 = document.getElementById("clover2");
spdr1 = document.getElementById("spider1");
spdr2 = document.getElementById("spider2");
h1 = document.getElementById("heart1");
h2 = document.getElementById("heart2");
d1 = document.getElementById("diamond1");
d2 = document.getElementById("diamond2");
s1 = document.getElementById("spade1");
s2 = document.getElementById("spade2");
crw1 = document.getElementById("crow1");
crw2 = document.getElementById("crow2");

// ----------------------
// Background music
// ----------------------

document.addEventListener("click", function startMusicOnce() {
  const bgMusic = document.getElementById("background");

  bgMusic.volume = 0.65;
  bgMusic.loop = true;

  bgMusic.play().catch((err) => console.log("Autoplay blocked:", err));

  document.removeEventListener("click", startMusicOnce);
});

// ----------------------
// MUSIC FUNCTIONS: FADES OUT
// ----------------------

function stopBackgroundMusic() {
  const bgMusic = document.getElementById("background");
  if (!bgMusic) return;

  let fadeOutInterval = setInterval(() => {
    if (bgMusic.volume > 0.1) {
      bgMusic.volume -= 0.08; // bigger steps
      if (bgMusic.volume < 0) bgMusic.volume = 0;
    } else {
      bgMusic.volume = 0;
      bgMusic.pause(); // stop completely
      bgMusic.currentTime = 0;
      clearInterval(fadeOutInterval);
    }
  }, 230); // faster interval = more noticeable fade
}

// ----------------------
// MUSIC FUNCTIONS: LOOPS/AFTER RESTART BUTTON
// ----------------------

function startBackgroundMusic() {
  const bgMusic = document.getElementById("background");
  if (!bgMusic) return;

  bgMusic.volume = 0.3; // reset volume
  bgMusic.loop = true; // keep looping
  bgMusic.play().catch((err) => console.log("Background audio failed:", err)); // Avoid Broswer blocking
}

// ----------------------
// ADD SYMBOLS
// ----------------------

function addSymbol(symbolImage, baseId) {
  // main layout
  const slot = document.getElementById(baseId);
  slot.src = symbolImage;
  slot.dataset.filled = "true";

  // modal layout
  const modalSlot = document.getElementById(baseId + "_modal");
  modalSlot.src = symbolImage;
  modalSlot.dataset.filled = "true";
}

function showModal() {
  document.getElementById("myModal").style.display = "flex";
}

function showModal2() {
  document.getElementById("myModal2").style.display = "flex";
}

function hideModal2() {
  document.getElementById("myModal2").style.display = "none";
}

function showModal3() {
  document.getElementById("myModal3").style.display = "flex";
}

function showTimeModal() {
  document.getElementById("timeUpModal").style.display = "flex";
}

function hideModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("myModal2").style.display = "none";
  document.getElementById("myModal3").style.display = "none";
}

function hideTimeModal() {
  document.getElementById("timeUpModal").style.display = "none";
}

// ----------------------
// RESET GAME FUNCTION
// ----------------------

function resetGame() {
  hideTimeModal();
  hideModal2();
  startTimer(); //resarts timer
  startBackgroundMusic();

  flippedCards = []; //emtpies
  click = 0; //resets
  matchCount = 0; //resets
  lockBoard = false; //to click new cards

  // Reset ALL cards back to COVER within the .box1 (that the cards are in)
  const allCards = document.querySelectorAll(".box1 img");
  allCards.forEach((card) => {
    card.src = "cards/COVER.jpg"; // flip back
    card.classList.remove("translucent"); // undo match styling
    card.classList.remove("non_clickable"); // re-enable clicks
    card.classList.add("clickable"); // restore clickable class
  });

  // Clear symbol images/modal
  document.getElementById("symbol1").src = emptyImg;
  document.getElementById("symbol2").src = emptyImg;
  document.getElementById("symbol3").src = emptyImg;
  document.getElementById("symbol4").src = emptyImg;

  document.getElementById("symbol1_modal").src = emptyImg;
  document.getElementById("symbol2_modal").src = emptyImg;
  document.getElementById("symbol3_modal").src = emptyImg;
  document.getElementById("symbol4_modal").src = emptyImg;

  document.getElementById("symbol1").dataset.filled = "false";
  document.getElementById("symbol2").dataset.filled = "false";
  document.getElementById("symbol3").dataset.filled = "false";
  document.getElementById("symbol4").dataset.filled = "false";

  document.getElementById("symbol1_modal").dataset.filled = "false";
  document.getElementById("symbol2_modal").dataset.filled = "false";
  document.getElementById("symbol3_modal").dataset.filled = "false";
  document.getElementById("symbol4_modal").dataset.filled = "false";
}

// ----------------------
// ALERT PAGE: CORRECT/INCORRECT ANSWER
// ----------------------

const submitButton = document.getElementById("unlockBtn");
const userInput = document.getElementById("lockAnswer");

submitButton.addEventListener("click", () => {
  const answer = userInput.value.trim().toUpperCase(); // normalize input
  if (answer === "ARTS") {
    alert(
      "That is correct. Continue to the next game if you wish to save Eric..."
    );
    window.location.href = "https://l92fjc.csb.app/"; // redirect to next sandbox
  } else {
    alert("Incorrect! Try again or it's bye-bye Eric.");
  }
});

// ----------------------
// START TIMER: Calculations of time
// ----------------------

function startTimer() {
  seconds = 142;
  tickingStarted = false;
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    seconds--;

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let displaySeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    // ----------------------
    // TIMER TEXT: DISPLAY
    // ----------------------

    document.getElementById(
      "timerText"
    ).textContent = `Time: ${minutes}:${displaySeconds}`; //changes the time of seconds to minutes (calculations)

    // ----------------------
    // Fades Out background music at 12 sec
    // ----------------------

    if (seconds === 12) {
      stopBackgroundMusic(); // music starts fading b/c of function
    }

    // ----------------------
    // Timer starts ticking at 12 sec
    // ----------------------

    if (seconds === 12 && !tickingStarted) {
      const tickAudio = document.getElementById("timer");
      tickAudio.currentTime = 0;
      tickAudio.loop = true;
      tickAudio.play().catch((err) => console.log("Tick audio error:", err));
      tickingStarted = true; //tick continues
    }

    // ----------------------
    // Time-out logic
    // ----------------------

    if (seconds <= 0) {
      clearInterval(timerInterval);
      tickingStarted = false; //tick stops

      const tickAudio = document.getElementById("timer");
      tickAudio.pause();
      tickAudio.currentTime = 0;

      document.getElementById("timerText").textContent = "Time's up!";
      document.getElementById("timeUpModal").style.display = "flex";
      showTimeModal();

      // play game-over sounds
      const jokerAudio = document.getElementById("vroom");
      jokerAudio.currentTime = 0;
      jokerAudio.play();

      const darkAudio = document.getElementById("dark");
      darkAudio.currentTime = 0;
      darkAudio.play();
    }
  }, 1000);
}
startTimer();

function reduceTime(amount) {
  const prevSeconds = seconds; // store previous value
  seconds = Math.max(seconds - amount, 0);

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let displaySeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  document.getElementById(
    "timerText"
  ).textContent = `Time: ${minutes}:${displaySeconds}`;

  // ⭐ Start ticking if we crossed 12 seconds
  if (prevSeconds > 12 && seconds <= 12 && !tickingStarted) {
    const tickAudio = document.getElementById("timer");
    tickAudio.currentTime = 0;
    tickAudio.loop = true;
    tickAudio.play().catch((err) => console.log("Tick audio error:", err));

    tickingStarted = true;
    stopBackgroundMusic(); // fade out background music
  }

  // ⭐ Handle time-up if we crossed 0
  if (seconds <= 0 && prevSeconds > 0) {
    clearInterval(timerInterval);
    tickingStarted = false;

    // Stop ticking audio
    const tickAudio = document.getElementById("timer");
    tickAudio.pause();
    tickAudio.currentTime = 0;

    document.getElementById("timerText").textContent = "Time's up!";
    document.getElementById("timeUpModal").style.display = "flex";

    stopBackgroundMusic();

    // Play game-over sounds
    setTimeout(() => {
      const jokerAudio = document.getElementById("vroom");
      jokerAudio.currentTime = 0;
      jokerAudio.play();

      const darkAudio = document.getElementById("dark");
      darkAudio.currentTime = 0;
      darkAudio.play();
    }, 300);
  }
}

// ----------------------
// Match functions
// ----------------------

function checkMatchJoker() {
  if (lockBoard) return; //lock cards from multiple clicks
  if (
    click == 2 &&
    j1.src.match("cards/Joker.jpg") &&
    j2.src.match("cards/Joker.jpg")
  ) {
    document.getElementById("joker1").classList.add("translucent");
    document.getElementById("joker1").classList.remove("clickable:hover");
    document.getElementById("joker1").classList.add("non_clickable");
    document.getElementById("joker2").classList.add("translucent");
    document.getElementById("joker2").classList.remove("clickable:hover");
    document.getElementById("joker2").classList.add("non_clickable");
    flippedCards = [];
    click = 0; //clicks returns to 0
  } else if (click == 2) {
    lockBoard = true; //if cards don't match, turn back to COVER art and flipped cards = 0 to click 2 seperate cards(loop)
    setTimeout(function () {
      flippedCards[0].src = "cards/COVER.jpg";
      flippedCards[1].src = "cards/COVER.jpg";

      flippedCards[0].classList.remove("non_clickable");
      flippedCards[1].classList.remove("non_clickable");

      flippedCards = [];

      click = 0;
      lockBoard = false;
    }, 1000); //how fast cards flip over
  }
}

function checkMatch1() {
  if (lockBoard) return;
  if (
    click == 2 &&
    c1.src.match("cards/clover.jpg") &&
    c2.src.match("cards/clover.jpg")
  ) {
    document.getElementById("clover1").classList.add("translucent");
    document.getElementById("clover1").classList.add("non_clickable");
    document.getElementById("clover2").classList.add("translucent");
    document.getElementById("clover2").classList.add("non_clickable");

    const jokerAudio = document.getElementById("ding");
    jokerAudio.currentTime = 0;
    jokerAudio.play();

    flippedCards = [];
    click = 0;
  } else if (click == 2) {
    lockBoard = true;
    setTimeout(function () {
      //gives players 1 second to SEE the wrong cards before they flip back.
      flippedCards[0].src = "cards/COVER.jpg";
      flippedCards[1].src = "cards/COVER.jpg";

      flippedCards[0].classList.remove("non_clickable");
      flippedCards[1].classList.remove("non_clickable");

      flippedCards = [];
      click = 0;
      lockBoard = false;
    }, 1000);
  }
}

function checkMatch2() {
  if (lockBoard) return;
  if (
    click == 2 &&
    spdr1.src.match("cards/spider.jpg") &&
    spdr2.src.match("cards/spider.jpg")
  ) {
    console.log("Match!");
    document.getElementById("spider1").classList.add("translucent");
    document.getElementById("spider1").classList.add("non_clickable");
    document.getElementById("spider2").classList.add("translucent");
    document.getElementById("spider2").classList.add("non_clickable");

    const jokerAudio = document.getElementById("ding");
    jokerAudio.currentTime = 0;
    jokerAudio.play();

    flippedCards = [];
    click = 0;
  } else if (click == 2) {
    lockBoard = true;
    setTimeout(function () {
      flippedCards[0].src = "cards/COVER.jpg";
      flippedCards[1].src = "cards/COVER.jpg";

      flippedCards[0].classList.remove("non_clickable");
      flippedCards[1].classList.remove("non_clickable");

      flippedCards = [];
      click = 0;
      lockBoard = false;
    }, 1000);
  }
}

function checkMatch3() {
  if (lockBoard) return;
  if (
    click == 2 &&
    h1.src.match("cards/hearts.jpg") &&
    h2.src.match("cards/hearts.jpg")
  ) {
    console.log("Match!");
    document.getElementById("heart1").classList.add("translucent");
    document.getElementById("heart1").classList.add("non_clickable");
    document.getElementById("heart2").classList.add("translucent");
    document.getElementById("heart2").classList.add("non_clickable");

    const jokerAudio = document.getElementById("ding");
    jokerAudio.currentTime = 0;
    jokerAudio.play();

    addSymbol("images/heart key.jpg", "symbol1");
    checkWin();
    flippedCards = [];
    click = 0;
  } else if (click == 2) {
    lockBoard = true;
    setTimeout(function () {
      flippedCards[0].src = "cards/COVER.jpg";
      flippedCards[1].src = "cards/COVER.jpg";
      // Re-enable flipping
      flippedCards[0].classList.remove("non_clickable");
      flippedCards[1].classList.remove("non_clickable");

      flippedCards = [];
      click = 0;
      lockBoard = false;
    }, 1000);
  }
}

function checkMatch4() {
  if (lockBoard) return;
  if (
    click == 2 &&
    d1.src.match("cards/Diamond.jpg") &&
    d2.src.match("cards/Diamond.jpg")
  ) {
    document.getElementById("diamond1").classList.add("translucent");
    document.getElementById("diamond1").classList.add("non_clickable");
    document.getElementById("diamond2").classList.add("translucent");
    document.getElementById("diamond2").classList.add("non_clickable");

    const jokerAudio = document.getElementById("ding");
    jokerAudio.currentTime = 0;
    jokerAudio.play();

    addSymbol("images/Diamond key.png", "symbol4");
    checkWin();
    flippedCards = [];
    click = 0;
  } else if (click == 2) {
    lockBoard = true;
    setTimeout(function () {
      flippedCards[0].src = "cards/COVER.jpg";
      flippedCards[1].src = "cards/COVER.jpg";

      flippedCards[0].classList.remove("non_clickable");
      flippedCards[1].classList.remove("non_clickable");

      flippedCards = [];
      click = 0;
      lockBoard = false;
    }, 1000);
  }
}

function checkMatch5() {
  if (lockBoard) return;
  if (
    click == 2 &&
    s1.src.match("cards/spade.jpg") &&
    s2.src.match("cards/spade.jpg")
  ) {
    console.log("Match!");
    document.getElementById("spade1").classList.add("translucent");
    document.getElementById("spade1").classList.add("non_clickable");
    document.getElementById("spade2").classList.add("translucent");
    document.getElementById("spade2").classList.add("non_clickable");

    const jokerAudio = document.getElementById("ding");
    jokerAudio.currentTime = 0;
    jokerAudio.play();

    addSymbol("images/spade key.png", "symbol3");
    checkWin();
    flippedCards = [];
    click = 0;
  } else if (click == 2) {
    lockBoard = true;
    setTimeout(function () {
      console.log("This message appears after 1 seconds.");
      flippedCards[0].src = "cards/COVER.jpg";
      flippedCards[1].src = "cards/COVER.jpg";

      flippedCards[0].classList.remove("non_clickable");
      flippedCards[1].classList.remove("non_clickable");

      flippedCards = [];
      click = 0;
      lockBoard = false;
    }, 1000);
  }
}

function checkMatch6() {
  if (lockBoard) return;
  if (
    click == 2 &&
    crw1.src.match("cards/crow.jpg") &&
    crw2.src.match("cards/crow.jpg")
  ) {
    document.getElementById("crow1").classList.add("translucent");
    document.getElementById("crow1").classList.add("non_clickable");
    document.getElementById("crow2").classList.add("translucent");
    document.getElementById("crow2").classList.add("non_clickable");

    const jokerAudio = document.getElementById("ding");
    jokerAudio.currentTime = 0;
    jokerAudio.play();

    addSymbol("images/X key.png", "symbol2");
    checkWin();
    flippedCards = [];
    click = 0;
  } else if (click == 2) {
    lockBoard = true;
    setTimeout(function () {
      flippedCards[0].src = "cards/COVER.jpg";
      flippedCards[1].src = "cards/COVER.jpg";

      flippedCards[0].classList.remove("non_clickable");
      flippedCards[1].classList.remove("non_clickable");

      flippedCards = [];
      click = 0;
      lockBoard = false;
    }, 1000);
  }
}

// ----------------------
// Flip Card Functions
// ----------------------

function flipcard1A() {
  if (lockBoard) return; //lockboard resets after previous two cards were flipped
  click++; //one clicks
  flippedCards.push(j1); //Pushes the cards into the flipCards function [Up to 2]
  j1.src = "cards/Joker.jpg";
  j1.classList.add("non_clickable"); // <--- prevents clicking again!

  // Play the laugh
  const jokerAudio = document.getElementById("haha");
  jokerAudio.currentTime = 0;
  jokerAudio.play().catch((err) => console.log("Audio failed:", err));

  reduceTime(20); // Subtract 15 seconds here
  checkMatchJoker();
}

function flipcard2A() {
  if (lockBoard) return;
  click++;
  flippedCards.push(j2);
  j2.src = "cards/Joker.jpg";
  j2.classList.add("non_clickable");

  // Play the laugh
  const jokerAudio = document.getElementById("haha");
  jokerAudio.currentTime = 0;
  jokerAudio.play();

  reduceTime(20); // Subtract 15 seconds here
  checkMatchJoker();
}

function flipcard1C() {
  if (lockBoard) return;
  click++;
  flippedCards.push(c1);
  c1.classList.add("non_clickable");

  c1.src = "cards/clover.jpg";
  checkMatch1();
}

function flipcard2D() {
  if (lockBoard) return;
  click++;
  flippedCards.push(c2);
  c2.classList.add("non_clickable");

  c2.src = "cards/clover.jpg";
  checkMatch1();
}

function flipcard1E() {
  if (lockBoard) return;
  click++;
  flippedCards.push(spdr1);
  spdr1.classList.add("non_clickable");

  spdr1.src = "cards/spider.jpg";
  checkMatch2();
}

function flipcard1F() {
  if (lockBoard) return;
  click++;
  flippedCards.push(spdr2);
  spdr2.classList.add("non_clickable");

  spdr2.src = "cards/spider.jpg";
  checkMatch2();
}

function flipcard1G() {
  if (lockBoard) return;
  click++;
  flippedCards.push(h1);
  h1.classList.add("non_clickable");

  h1.src = "cards/hearts.jpg";
  checkMatch3();
}

function flipcard1I() {
  if (lockBoard) return;
  click++;
  flippedCards.push(h2);
  h2.classList.add("non_clickable");

  h2.src = "cards/hearts.jpg";
  checkMatch3();
}

function flipcard1J() {
  if (lockBoard) return;
  click++;
  flippedCards.push(d1);
  d1.classList.add("non_clickable");

  d1.src = "cards/Diamond.jpg";
  checkMatch4();
}

function flipcard1K() {
  if (lockBoard) return;
  click++;
  flippedCards.push(d2);
  d2.classList.add("non_clickable");

  d2.src = "cards/Diamond.jpg";
  checkMatch4();
}

function flipcard1L() {
  if (lockBoard) return;
  click++;
  flippedCards.push(s1);
  s1.classList.add("non_clickable");

  s1.src = "cards/spade.jpg";
  checkMatch5();
}

function flipcard1M() {
  if (lockBoard) return;
  click++;
  flippedCards.push(s2);
  s2.classList.add("non_clickable");

  s2.src = "cards/spade.jpg";
  checkMatch5();
}

function flipcard1O() {
  if (lockBoard) return;
  click++;
  flippedCards.push(crw1);
  crw1.classList.add("non_clickable");

  crw1.src = "cards/crow.jpg";
  checkMatch6();
}

function flipcard1P() {
  if (lockBoard) return;
  click++;
  flippedCards.push(crw2);
  crw2.classList.add("non_clickable");

  crw2.src = "cards/crow.jpg";
  checkMatch6();
}

// ----------------------
// Checks if symbols match and if they do, open Modal2
// ----------------------

function checkWin() {
  const s1 = document.getElementById("symbol1").dataset.filled === "true";
  const s2 = document.getElementById("symbol2").dataset.filled === "true";
  const s3 = document.getElementById("symbol3").dataset.filled === "true";
  const s4 = document.getElementById("symbol4").dataset.filled === "true";

  if (s1 && s2 && s3 && s4) {
    document.getElementById("myModal2").style.display = "flex";
  }
}
