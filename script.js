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
  _isDone = false;

  done() {
    output.innerHTML = `${time.min}:${time.sek}`;
  }

  display() {
    const time = this.time();
    const output = document.querySelector(`.${this.classname}`);
    const audio = new Audio('sound.mp3');

    const timeLine = document.querySelector('.time-line-in');
    
    timeLine.style.backgroundColor = this.procent() > 80? 'red': 'white';
    timeLine.style.width = `${this.procent()}%`;





    if ((time.min + time.sek) < 1) {

      this._isDone = true;

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
    if (!this._started && !this._isDone) {
      this._myinterval = setInterval(() => {
        this.display();
        this._timeElapsed++;
      }, this._interval);
    }
    this._started = true;
  }

  pause() {
    if (this._started && !this._isDone) {
      clearInterval(this._myinterval);
    }
    this._started = false;
  }

  reset() {
    this._isDone = false;
    this.pause();
    this._timeElapsed = 0;
    this.display();
  }

  procent() {
    return Math.round(this._timeElapsed / this.duration * 100)
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


const pandaTimer = new Timer({duration: 30});

// init the display
pandaTimer.display();
// control buttons
const controls = document.querySelectorAll('button');
const clearControls = ()=>{
  controls.forEach(btn => btn.classList.remove('active')); 
} 
// Start, Stopp and Reset Timer
controls.forEach((button) => {
  button.addEventListener("click", () => { 
    clearControls();
    button.classList.add('active');
    pandaTimer[button.dataset.btn]();
  });
});

// Edit Timer
const editBTN = document.querySelector('.add-btn');
const editArea = document.querySelector('.edit-timer');
editBTN.addEventListener('click', editTimer);

let timerName = document.querySelector(".timer-name");

function editTimer() {
  editArea.classList.toggle('no-display');
  this.classList.toggle('open');


  timerName.value = pandaTimer.name;

  // Stop und Restart


  if (this.classList.contains('open')) {
    this.innerHTML = `<i class="fas fa-plus"></i>`;
  } else {
    this.innerHTML = `<i class="fas fa-cog"></i>`;
  }

}

// Set new data to Timer
const setNewTime = document.querySelector('.set-time');
setNewTime.addEventListener('click', newTimerInfo);

function newTimerInfo() {
  const min = parseInt(minLabel.innerHTML);
  const sec = parseInt(secLabel.innerHTML);
  const duration = (min * 60) + sec;
  // Set New Time

  pandaTimer.name = timerName.value.length > 2 ? timerName.value : pandaTimer.name;
  pandaTimer.duration = duration;
  pandaTimer.reset();
  pandaTimer.display();
  clearControls();
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


// Optimale Höhe des element 
// Problem mit Safari Mobile
optiHeight();
window.addEventListener('resize',optiHeight);


function optiHeight(){
  let vh = window.innerHeight *0.01;
  document.documentElement.style.setProperty('--vh',`${vh}px`);
}
