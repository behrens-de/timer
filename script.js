class Timer {


  constructor({duration=1200,classname="time"}) {
    this.duration = duration;  // Number (Secounds)
    this.classname = classname;  // Number (Secounds)
  }

  _started = false; // bool
  _interval = 1000; // Number (Milisecounds)
  _timeElapsed = 0; // Number (Secounds)
  _myinterval;


  display(){
    const time = this.time();
    const output = document.querySelector(`.${this.classname}`);
    output.innerHTML = `${time.min}:${time.sek}`;
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



const addTimer = document.querySelectorAll(".add-btn");


const secUp = document.querySelector(".add-sec .up");
const secDown = document.querySelector(".add-sec .down");
const secLabel = document.querySelector(".add-sec .label");

secUp.addEventListener('click',()=>{
  const oldInt = parseInt(secLabel.innerHTML);
  const newInt = oldInt+1;
  if(newInt<60){
    secLabel.innerHTML = newInt < 10 ? `0${newInt}`: newInt;
  }
});

secDown.addEventListener('click',()=>{
  const oldInt = parseInt(secLabel.innerHTML);
  const newInt = oldInt-1;
  if(newInt>=0){
    secLabel.innerHTML = newInt < 10 ? `0${newInt}`: newInt;
  }
});

const minUp = document.querySelector(".add-min .up");
const minDown = document.querySelector(".add-min .down");
const minLabel = document.querySelector(".add-min .label");

minUp.addEventListener('click',()=>{
  const oldInt = parseInt(minLabel.innerHTML);
  const newInt = oldInt+1;
  if(newInt<60){
    minLabel.innerHTML = newInt < 10 ? `0${newInt}`: newInt;
  }
});

minDown.addEventListener('click',()=>{
  const oldInt = parseInt(minLabel.innerHTML);
  const newInt = oldInt-1;
  if(newInt>=0){
    minLabel.innerHTML = newInt < 10 ? `0${newInt}`: newInt;
  }
});


const setTime = document.querySelector(".set-time");

setTime.addEventListener('click',()=>{

  const min = parseInt(minLabel.innerHTML);
  const sec = parseInt(secLabel.innerHTML);
  const duration = min*60+sec;

  myTimer(duration)
});



// Contro
function myTimer(duration = 99){
const timer = new Timer({duration:duration});
timer.display();
const button = document.querySelectorAll("button");
button.forEach((btn) => {
  btn.addEventListener("click", () => {
    timer[btn.dataset.btn]();
  });
});
}

myTimer();