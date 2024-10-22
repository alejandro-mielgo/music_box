export function createInstrumentBars( instruments, nQuarters, quarterDivision ) {
    
    const rows =  document.createElement('div')

    for (let instrument of instruments){
        const instrumentBar = document.createElement('div');
        const barTitle = document.createElement('label');
        barTitle.textContent = instrument;
        instrumentBar.appendChild(barTitle);  
        for ( let index=0 ; index < nQuarters * quarterDivision ; index++ ) {
            if(index % quarterDivision===0 && index!==0){
                const separator = document.createElement('label');
                separator.textContent = '|';
                instrumentBar.appendChild(separator);
            }
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.setAttribute("id",`${instrument}-${index}`);
            cell.setAttribute('row', instrument);
            cell.setAttribute('col', index);
            cell.setAttribute('active', false);
            instrumentBar.appendChild(cell);
        }
        rows.appendChild(instrumentBar)
    }
    return rows
}

const urlList = [
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",

]
const audioElements = urlList.map(url => new Audio(url))

export function applyBeatCSS(cellsArray, className, nRows, beat, time, cellsPerRow ) {

    for ( let row=0; row<nRows; row++ ) {
        if (cellsArray[beat+row*cellsPerRow].getAttribute('active')=="true") {
            audioElements[row].pause();
            audioElements[row].play();
        }
        
        cellsArray[ beat + row*cellsPerRow ].classList.add(className);
        setTimeout( () => {
            cellsArray [beat + row*cellsPerRow ].classList.remove(className);
        },time*0.9)
    }
}

