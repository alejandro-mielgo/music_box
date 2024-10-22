import './style.css'
import { createInstrumentBars , applyBeatCSS } from './elements.js'

//selectores
const bpmDownBtn = document.querySelector('#bpm-down-btn');
const bpmUpBtn = document.querySelector('#bpm-up-btn');
const playBtn = document.querySelector('#play-btn');
const bpmLabel = document.querySelector('#bpm-label');
const rythmBox = document.querySelector('#rythm-box');
const instruments = Array(9).fill("");
const quartersDownBtn = document.querySelector("#quarters-down-btn");
const quartersUpBtn = document.querySelector("#quarters-up-btn");
const subdivisionsDownBtn = document.querySelector("#subdivisions-down-btn");
const subdivisionsUpBtn = document.querySelector("#subdivisions-up-btn");



//Variables globales
let bpm = 70;
let playing = false;
let beat = 0;
let numberOfQuarters = 4;
let quarterDivision = 4;
let beatInterval = null;

//Event listeners
bpmDownBtn.addEventListener('click',(event) =>{
  console.log('click bmp up')
  bpm = bpm -1;
  bpmLabel.textContent = `${bpm} bpm`;
} );
bpmUpBtn.addEventListener('click', (event) =>{
  bpm = bpm +1;
  bpmLabel.textContent = `${bpm} bpm`;
} );

quartersDownBtn.addEventListener('click', (event) => {
  numberOfQuarters -=1;
  updateMachine();
});
quartersUpBtn.addEventListener('click', (event) => {
  numberOfQuarters +=1;
  updateMachine();
});

subdivisionsDownBtn.addEventListener('click', (event) => {
  quarterDivision -=1;
  updateMachine();
});
subdivisionsUpBtn.addEventListener('click', (event) => {
  quarterDivision +=1;
  updateMachine();
});

const updateMachine = () => {
  rythmBox.innerHTML="";
  clearInterval(beatInterval);
  beat=0;
  for (let cell of cellsArray){
    cell.classList.remove('active')
  }
  rythmBox.appendChild(createInstrumentBars(instruments, numberOfQuarters, quarterDivision));
  cells = document.querySelectorAll('.cell')
  cellsArray = Array.from(cells);
  if(playing){
    beatInterval = startBeat(60000/bpm/numberOfQuarters);
  }
}



playBtn.addEventListener('click', (event) =>{
  
  if (playing===false) {
    beatInterval = startBeat(60000/bpm/numberOfQuarters);
    playBtn.textContent="stop";
  } else {
    clearInterval(beatInterval);
    playBtn.textContent="play";

  }
  playing=!playing
})

rythmBox.addEventListener('click', (event) =>{
  console.log(event.target.getAttribute('active'));
  if(event.target.getAttribute('active')==="false") {
    event.target.setAttribute('active',true);
    event.target.classList.add('active')
  } else {
    event.target.setAttribute('active',false);
    event.target.classList.remove('active')
  }
})



//llamadas para crear las barras
rythmBox.appendChild(createInstrumentBars(instruments, numberOfQuarters, quarterDivision));
let cells = document.querySelectorAll('.cell')
let cellsArray = Array.from(cells);





//Funcion que maneja el beat
function startBeat(time) {

  const interval = setInterval (() => {
    applyBeatCSS(cellsArray,"cell-beat",instruments.length, beat, time, quarterDivision * numberOfQuarters)
    beat = (beat+1) % ( quarterDivision * numberOfQuarters );
  },time);
  return interval;
}







