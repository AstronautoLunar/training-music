let start = false;

const controlsSound = {
    areaOptions: window.document.querySelector('ul#options'),
    buttonStart: window.document.querySelector('button#button-play'),
    areaInitial: window.document.querySelector('div#area-initial'),
    areaSound: window.document.querySelector("div#area-sound"),
    divAreaAudio: window.document.createElement('div'),

    noteHit: null,

    storageNoteChosen: null,

    audio: new Audio(),

    sounds: [
        {
            id: 0,
            name: "C",
            src: "./assets/audios/C-dó.mp3",
            selected: false
        },
        {
            id: 1,
            name: "D",
            src: "./assets/audios/D-ré.mp3",
            selected: false
        },
        {
            id: 2,
            name: "E",
            src: "./assets/audios/E-mí.mp3",
            selected: false
        },
        {
            id: 3,
            name: "F",
            src: "./assets/audios/F-fá.mp3",
            selected: false
        },
        {
            id: 4,
            name: "G",
            src: "./assets/audios/G-sól.mp3",
            selected: false
        },
        {
            id: 5,
            name: "A",
            src: "./assets/audios/A-lá.mp3",
            selected: false
        },
        {
            id: 6,
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
                
                setTimeout(() => {
                    this.areaInitial.style.display = "none";
                }, 300)
            }, 300)

            start = true;

            setTimeout(() => {
                this.loadInterface();
            }, 800)
        }
    },
    
    loadInterface() {
        let chosenSounds = this.sounds.filter(sound => sound.selected === true);
        this.storageNoteChosen = chosenSounds;

        let selectedNote = null;

        function randomNumber() {
            soundChosenPlayIndex = Math.floor(Math.random() * chosenSounds.length);
        }
        randomNumber();
        
        this.divAreaAudio.setAttribute('id', 'area-audio');
        this.areaSound.appendChild(this.divAreaAudio);
        
        const divPlayMusic = window.document.createElement('div');
        divPlayMusic.setAttribute('id', 'play-sound');
        this.divAreaAudio.appendChild(divPlayMusic);

        const imagePlay = new Image();
        imagePlay.src = "./assets/icons/icon-play.svg";
        imagePlay.setAttribute('alt', 'icon play sound')
        imagePlay.style.width = "35%";
        divPlayMusic.appendChild(imagePlay);

        this.audio.src = chosenSounds[soundChosenPlayIndex].src;

        let timerDivPlayMusic;

        divPlayMusic.onclick = () => {
            divPlayMusic.classList.add('jump-out');

            clearTimeout(timerDivPlayMusic);
            timerDivPlayMusic = setTimeout(() => {
                divPlayMusic.classList.remove('jump-out');
            }, 200);

            this.audio.play();
        }
        
        const divButtonsSoundNote = window.document.createElement('div');
        divButtonsSoundNote.setAttribute('id', 'area-button-sound');
        this.divAreaAudio.appendChild(divButtonsSoundNote);

        for(let i in chosenSounds) {
            divButtonsSoundNote.innerHTML += `<div class="sound-chosen" data-key="${i}">${chosenSounds[i].name}</div>`
        }

        const notes = window.document.querySelectorAll("div.sound-chosen");

        let timerReturnStyleDivPlay;

        function returnStyleDivPlay() {
            clearTimeout(timerReturnStyleDivPlay);

            timerReturnStyleDivPlay = setTimeout(() => {
                divPlayMusic.style.backgroundColor = "var(--blue-aqua)";

                imagePlay.src = "./assets/icons/icon-play.svg";
            }, 1500);
        }

        let timerNotes;

        notes.forEach(note => {
            note.onclick = event => {
                note.classList.add('selected-note');
                
                clearTimeout(timerNotes);
                timerNotes = setTimeout(() => {
                    note.classList.remove('selected-note');
                }, 300)
                
                selectedNote = event.target.dataset.key;

                if(selectedNote == soundChosenPlayIndex) {
                    divPlayMusic.style.background = "#7bfa7b";
                    imagePlay.src = "./assets/icons/icon-note-correct.svg";
                    
                        this.noteHit = true;
                        
                        returnStyleDivPlay();
                    } else {
                        divPlayMusic.style.background = "#fa7b7b";
                        imagePlay.src = "./assets/icons/icon-note-wrong.svg";
                        divPlayMusic.classList.add('note-wrong');
                        
                        this.noteHit = false;

                        setTimeout(() => {
                            divPlayMusic.classList.remove('note-wrong');
                        }, 300);
                        
                        returnStyleDivPlay();
                }
            }
        })

        const buttonNextNote = window.document.createElement('button');
        buttonNextNote.setAttribute('id', 'button-next-note');
        buttonNextNote.innerText = "Próxima nota";
        this.divAreaAudio.appendChild(buttonNextNote);

        let oldSelectedNote = null;

        let timerButtonNextNote;

        buttonNextNote.onclick = () => {
            randomNumber();
            
            for(let i = 1; i <= 3; i++) {
                if(oldSelectedNote == soundChosenPlayIndex) {
                    randomNumber();
                } else {
                    break;
                }
            }
            
            oldSelectedNote = soundChosenPlayIndex;

            this.audio.src = chosenSounds[soundChosenPlayIndex].src;

            buttonNextNote.style.animation = "jump-out 200ms";

            clearTimeout(timerButtonNextNote);
            timerButtonNextNote = setTimeout(() => {
                buttonNextNote.style.animation = "";
            }, 300)
        };
    },
}

