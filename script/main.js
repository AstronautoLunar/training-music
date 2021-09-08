// const areaOptions = window.document.querySelector('ul#options');
// const buttonStart = window.document.querySelector('button#button-play');

let start = false;

const controlsSound = {
    areaOptions: window.document.querySelector('ul#options'),
    buttonStart: window.document.querySelector('button#button-play'),
    areaInitial: window.document.querySelector('div#area-initial'),

    sounds: [
        {
            id: 1,
            name: "C",
            src: "./assets/audios/C-dó.mp3",
            selected: false
        },
        {
            id: 2,
            name: "D",
            src: "./assets/audios/D-ré.mp3",
            selected: false
        },
        {
            id: 3,
            name: "E",
            src: "./assets/audios/E-mí.mp3",
            selected: false
        },
        {
            id: 4,
            name: "F",
            src: "./assets/audios/F-fá.mp3",
            selected: false
        },
        {
            id: 5,
            name: "G",
            src: "./assets/audios/F-fá.mp3",
            selected: false
        },
        {
            id: 6,
            name: "A",
            src: "./assets/audios/A-lá.mp3",
            selected: false
        },
        {
            id: 7,
            name: "B",
            src: "./assets/audios/B-sí.mp3",
            selected: false
        },
    ],

    drawControlsInitial() {
        for(let i of this.sounds) {
            this.areaOptions.innerHTML += `<li class="button-note">${i.name}</li>`
        }
    },

    loadButtonNote() {
        const buttonsNote = window.document.querySelectorAll("li.button-note");

        for(let i = 0; i <= buttonsNote.length; i++) {

            if(buttonsNote[i] !== undefined) {
                buttonsNote[i].onclick = ({ target }) => {
                    target.classList.toggle('selected');
                    this.sounds[i].selected = !this.sounds[i].selected;
                }
            }
        }
    },
    
    start() {

        this.buttonStart.onclick = ({ target }) => {
            target.classList.add("selected-start-button");

            setTimeout(() => {
                target.classList.remove("selected-start-button");
                
                this.areaInitial.style.opacity = "0";
                this.areaInitial.style.visibility = "hidden";
            }, 300)

            start = true;
        }
    },

    loadInterface() {
        const divAudio = window.document.createElement('div');
        divAudio.setAttribute('id', 'area-audio');
    }
}