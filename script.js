class Timer {

  constructor({ duration = 1200, classname = "time", name = "Panda Timer" }) {
    this.name = name;  // Number (Secounds)
    this.duration = duration;  // Number (Secounds)
    this.classname = classname;  // Number (Secounds)
  }

  _started = false; // bool
  _interval = 1000; // Number (Milisecounds)
  _timeElapsed = 0; // Number (Secounds)
  _myinterval;

  done() {
    output.innerHTML = `${time.min}:${time.sek}`;
  }

  display() {
    const time = this.time();
    const output = document.querySelector(`.${this.classname}`);
    const audio = new Audio('sound.mp3');

    if ((time.min + time.sek) < 1) {
      clearInterval(this._myinterval);

      audio.addEventListener('loadeddata', () => {
        audio.loop = true;
        audio.play();
        setTimeout(function () {
          audio.loop = false;
        }, 2500);
      });

      output.innerHTML = `Beendet`;
    } else {
      //console.log(output.previousSibling.previousSibling);
      output.previousSibling.previousSibling.innerHTML = this.name;
      output.innerHTML = `${time.min}:${time.sek}`;
    }

  }

  start() {
    if (!this._started) {
      this._myinterval = setInterval(() => {
        this.display();
        this._timeElapsed++;
      }, this._interval);
    }
    this._started = true;
  }

  pause() {
    if (this._started) {
      clearInterval(this._myinterval);
    }
    this._started = false;
  }

  reset() {
    this.pause();
    this._timeElapsed = 0;
    this.display();
  }

  time() {
    const now = this.duration - this._timeElapsed;
    let sek = now % 60;
    let min = (now - sek) / 60;

    sek = sek < 10 ? '0' + sek : sek;
    min = min < 10 ? '0' + min : min;
    return { min, sek };
  }
}


const pandaTimer = new Timer({});

// init the display
pandaTimer.display();

// control buttons
const controls = document.querySelectorAll('button');

// Start, Stopp and Reset Timer
controls.forEach((button) => {
  button.addEventListener("click", () => {
    pandaTimer[button.dataset.btn]();
  });
});

// Edit Timer
const editBTN = document.querySelector('.add-btn');
const editArea = document.querySelector('.edit-timer');
editBTN.addEventListener('click', editTimer);

function editTimer() {
  editArea.classList.toggle('no-display');
  this.classList.toggle('open');
  // Stop und Restart
  
  pandaTimer._started ? pandaTimer._started=false: pandaTimer._started=true;

  console.log(pandaTimer._started);
}

// Set new data to Timer
const setNewTime = document.querySelector('.set-time');
setNewTime.addEventListener('click', newTimerInfo);

function newTimerInfo() {
  const min = parseInt(minLabel.innerHTML);
  const sec = parseInt(secLabel.innerHTML);
  const duration = (min * 60) + sec;
  // Set New Time

  pandaTimer.duration = duration;
  pandaTimer.reset();
  pandaTimer.display();
  editBTN.click();

}

// Secounds 
const secUp = document.querySelector(".add-sec .up");
const secDown = document.querySelector(".add-sec .down");
const secLabel = document.querySelector(".add-sec .label");
secUp.addEventListener('click', () => countUpDown(secLabel, +1));
secDown.addEventListener('click', () => countUpDown(secLabel, -1));
// Minutes
const minUp = document.querySelector(".add-min .up");
const minDown = document.querySelector(".add-min .down");
const minLabel = document.querySelector(".add-min .label");
minUp.addEventListener('click', () => countUpDown(minLabel, +1));
minDown.addEventListener('click', () => countUpDown(minLabel, -1));

function countUpDown(label, count) {
  const oldInt = parseInt(label.innerHTML);
  const newInt = oldInt + count; // +1 | -1
  if (newInt < 60 && newInt >= 0) {
    label.innerHTML = newInt < 10 ? `0${newInt}` : newInt;
  }
}




// const addTimer = document.querySelectorAll(".add-btn");
// const secUp = document.querySelector(".add-sec .up");
// const secDown = document.querySelector(".add-sec .down");
// const secLabel = document.querySelector(".add-sec .label");

// secUp.addEventListener('click', () => {
//   const oldInt = parseInt(secLabel.innerHTML);
//   const newInt = oldInt + 1;
//   if (newInt < 60) {
//     secLabel.innerHTML = newInt < 10 ? `0${newInt}` : newInt;
//   }
// });

// secDown.addEventListener('click', () => {
//   const oldInt = parseInt(secLabel.innerHTML);
//   const newInt = oldInt - 1;
//   if (newInt >= 0) {
//     secLabel.innerHTML = newInt < 10 ? `0${newInt}` : newInt;
//   }
// });

// const minUp = document.querySelector(".add-min .up");
// const minDown = document.querySelector(".add-min .down");
// const minLabel = document.querySelector(".add-min .label");

// minUp.addEventListener('click', () => {
//   const oldInt = parseInt(minLabel.innerHTML);
//   const newInt = oldInt + 1;
//   if (newInt < 60) {
//     minLabel.innerHTML = newInt < 10 ? `0${newInt}` : newInt;
//   }
// });

// minDown.addEventListener('click', () => {
//   const oldInt = parseInt(minLabel.innerHTML);
//   const newInt = oldInt - 1;
//   if (newInt >= 0) {
//     minLabel.innerHTML = newInt < 10 ? `0${newInt}` : newInt;
//   }
// });

// const timerSettings = document.querySelector(".set-new-timer");
// const setTime = document.querySelector(".set-time");
// const addBtn = document.querySelector(".add-btn");
// // Headlines
// const timerName = document.querySelector(".timer-name");
// let timerNameH1 = document.querySelector(".timername");


// setTime.addEventListener('click', () => {
//   const min = parseInt(minLabel.innerHTML);
//   const sec = parseInt(secLabel.innerHTML);
//   const duration = min * 60 + sec;

//   timerSettings.classList.add('no-display');
//   addBtn.classList.toggle('open');
//   timerNameH1.innerHTML = timerName.value;

//   singleTimer.duration = duration;
// });



// // Contro
// function myTimer(duration = 99) {

//   singleTimer.display();
//   singleTimer.start = false;
//   const button = document.querySelectorAll("button");
//   button.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       singleTimer[btn.dataset.btn]();
//     });
//   });

// }

// // myTimer();

// addBtn.addEventListener('click', ()=>{

//   timerName.value = timerNameH1.innerHTML;

//   addBtn.classList.toggle('open');
//   timerSettings.classList.toggle('no-display');

// });
