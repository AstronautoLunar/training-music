let start = false;

const controlsSound = {
    areaOptions: window.document.querySelector('ul#options'),
    buttonStart: window.document.querySelector('button#button-play'),
    areaInitial: window.document.querySelector('div#area-initial'),
    areaSound: window.document.querySelector("div#area-sound"),
    divAreaAudio: window.document.createElement('div'),
    divPlayMusic: window.document.createElement('div'),
    divButtonsSoundNote: window.document.createElement('div'),
    buttonNextNote: window.document.createElement('button'),
    
    soundChosenPlayIndex: null,
    noteHit: null,
    storageNoteChosen: null,
    audio: new Audio(),
    chosenSounds: [],
    imagePlay: new Image(),

    drawControlsInitial() {
        for (let i of sounds) {
            this.areaOptions.innerHTML += `<li class="button-note">${i.name}</li>`
        }
    },

    loadButtonNote() {
        const buttonsNote = window.document.querySelectorAll("li.button-note");

        for (let i = 0; i <= buttonsNote.length; i++) {

            if (buttonsNote[i] !== undefined) {
                buttonsNote[i].onclick = ({
                    target
                }) => {
                    target.classList.toggle('selected');
                    sounds[i].selected = !sounds[i].selected;
                }
            }
        }
    },

    start() {
        this.buttonStart.onclick = ({
            target
        }) => {
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

    loadChosenSounds() {
        const defaultChosenNotes = [
            {
                id: 0,
                name: "C",
                src: "./assets/audios/C-dó.mp3",
                selected: true
            },
            {
                id: 1,
                name: "D",
                src: "./assets/audios/D-ré.mp3",
                selected: true
            },
            {
                id: 2,
                name: "E",
                src: "./assets/audios/E-mí.mp3",
                selected: true
            }
        ]

        this.chosenSounds = sounds.filter(sound => sound.selected === true);
        
        if(this.chosenSounds.length === 0) {
            this.chosenSounds = defaultChosenNotes;
        }
    },

    randomNumber() {
        this.soundChosenPlayIndex = Math.floor(Math.random() * this.chosenSounds.length);;
    },

    renderAreaAudio() {
        this.divAreaAudio.setAttribute('id', 'area-audio');
        this.areaSound.appendChild(this.divAreaAudio);
    },

    renderDivPlayMusic() {
        this.divPlayMusic.setAttribute('id', 'play-sound');
        this.divAreaAudio.appendChild(this.divPlayMusic);
    },

    renderImagePlay() {
        this.imagePlay.src = "./assets/icons/icon-play.svg";
        this.imagePlay.setAttribute('alt', 'icon play sound')
        this.imagePlay.style.width = "35%";
        this.divPlayMusic.appendChild(this.imagePlay);
    },

    loadSourceAudio() {
        console.log(this.chosenSounds);

        this.audio.src = this.chosenSounds[this.soundChosenPlayIndex].src;

    },

    loadEventDivPlayMusic() {
        let timerDivPlayMusic;
        this.divPlayMusic.onclick = () => {
            this.divPlayMusic.classList.add('jump-out');

            clearTimeout(timerDivPlayMusic);
            timerDivPlayMusic = setTimeout(() => {
                this.divPlayMusic.classList.remove('jump-out');
            }, 200);

            this.audio.play();
        }
    },

    renderDivButtonsSoundNote() {
        this.divButtonsSoundNote.setAttribute('id', 'area-button-sound');
        this.divAreaAudio.appendChild(this.divButtonsSoundNote);
    },

    renderButtonSoundChosen() {
        const buttonsHTMLArray = this.chosenSounds.map(item => {
            const { 
                name, 
                id, 
                src 
            } = item;
            return ( 
                `
                    <div class="sound-chosen" data-key="${id}">
                        ${name}
                        <audio
                            src="${src}"
                        />
                    </div>
                `
            )
        });

        const buttonHTMLString = buttonsHTMLArray.join("");

        this.divButtonsSoundNote.innerHTML = buttonHTMLString;

        const soundChosenNote = window.document.querySelectorAll(".sound-chosen");

        soundChosenNote.forEach(item => {
            item.addEventListener("click", ({ target }) => {
                const { children } = target;
                const [ audio ] = children;
                audio.volume = 0.5
                
                audio.play();
            }, false);
        })
    },

    returnStyleDivPlay() {
        let timerReturnStyleDivPlay;
        clearTimeout(timerReturnStyleDivPlay);

        timerReturnStyleDivPlay = setTimeout(() => {
            this.divPlayMusic.style.backgroundColor = "var(--blue-aqua)";

            this.imagePlay.src = "./assets/icons/icon-play.svg";
        }, 1500);
    },

    styleButton({
        color,
        src
    }) {
        this.divPlayMusic.style.background = color;
        this.imagePlay.src = src;
    },

    setClassNoteWrongAnimation(element) {
        element.classList.add('note-wrong');

        setTimeout(() => {
            element.classList.remove('note-wrong');
        }, 300);
    },

    renderNoteFull() {
        const notes = window.document.querySelectorAll("div.sound-chosen");
        let selectedNote = null;
        let timerNotes;

        notes.forEach(note => {
            note.onclick = event => {
                note.classList.add('selected-note');

                clearTimeout(timerNotes);
                timerNotes = setTimeout(() => {
                    note.classList.remove('selected-note');
                }, 300)

                selectedNote = event.target.dataset.key;

                if (selectedNote == this.chosenSounds[this.soundChosenPlayIndex].id) {
                    this.styleButton({
                        color: "#7bfa7b",
                        src: "./assets/icons/icon-note-correct.svg"
                    });

                    this.noteHit = true;

                    this.returnStyleDivPlay();
                } else {
                    this.styleButton({
                        color: "#fa7b7b",
                        src: "./assets/icons/icon-note-wrong.svg"
                    });
                    
                    this.noteHit = false;

                    this.setClassNoteWrongAnimation(this.divPlayMusic);
                    this.returnStyleDivPlay();
                }
            }
        })
    },

    renderButtonNextNote() {
        this.buttonNextNote.setAttribute('id', 'button-next-note');
        this.buttonNextNote.innerText = "Próxima nota";
        this.divAreaAudio.appendChild(this.buttonNextNote);

        let oldSelectedNote = null;
        let timerButtonNextNote;

        this.buttonNextNote.onclick = () => {
            this.randomNumber();

            for (let i = 1; i <= 3; i++) {
                if (oldSelectedNote == this.soundChosenPlayIndex) {
                    this.randomNumber();
                } else {
                    break;
                }
            }

            oldSelectedNote = this.soundChosenPlayIndex;

            this.audio.src = this.chosenSounds[this.soundChosenPlayIndex].src;

            this.buttonNextNote.style.animation = "jump-out 200ms";

            clearTimeout(timerButtonNextNote);
            timerButtonNextNote = setTimeout(() => {
                this.buttonNextNote.style.animation = "";
            }, 300)
        };
    },



    loadInterface() {
        this.loadChosenSounds();
        this.randomNumber();
        this.renderAreaAudio();
        this.renderDivPlayMusic();
        this.renderImagePlay();
        this.loadSourceAudio();
        this.loadEventDivPlayMusic();
        this.renderDivButtonsSoundNote();
        this.renderButtonSoundChosen();
        this.renderNoteFull();
        this.renderButtonNextNote();
    },
}