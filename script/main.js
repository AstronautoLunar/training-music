// const areaOptions = window.document.querySelector('ul#options');
// const buttonStart = window.document.querySelector('button#button-play');

let start = false;

const controlsSound = {
    areaOptions: window.document.querySelector('ul#options'),
    buttonStart: window.document.querySelector('button#button-play'),
    areaInitial: window.document.querySelector('div#area-initial'),
    areaSound: window.document.querySelector("div#area-sound"),

    sounds: [
        {
            id: 0,
            name: "C",
            src: "../assets/audios/C-dó.mp3",
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
            src: "./assets/audios/F-fá.mp3",
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
        let chosenSoundsSrc = [];
        let selectedNote = null;
        let noteCorrect = null;
        
        chosenSounds.forEach(sound => {
            chosenSoundsSrc.push(sound.src);
        })
        
        let soundChosenPlaySrc = Math.round(Math.random() * (chosenSoundsSrc.length - 1));

        if(chosenSoundsSrc.length === 1) {
            soundChosenPlaySrc = 0;
        }

        const divAreaAudio = window.document.createElement('div');
        divAreaAudio.setAttribute('id', 'area-audio');
        this.areaSound.appendChild(divAreaAudio);
        
        const divPlayMusic = window.document.createElement('div');
        divPlayMusic.setAttribute('id', 'play-sound');
        divAreaAudio.appendChild(divPlayMusic);

        divPlayMusic.onclick = () => {
            divPlayMusic.classList.add('jump-out');

            setTimeout(() => {
                divPlayMusic.classList.remove('jump-out');
            }, 200);


            const audio = new Audio();
            audio.src = chosenSoundsSrc[soundChosenPlaySrc];
            audio.play();

            console.log(chosenSoundsSrc[soundChosenPlaySrc])

            console.log(audio);
            console.log(soundChosenPlaySrc);
        }
        
        const divButtonsSoundNote = window.document.createElement('div');
        divButtonsSoundNote.setAttribute('id', 'area-button-sound');
        divAreaAudio.appendChild(divButtonsSoundNote);

        const imagePlay = new Image();
        imagePlay.src = "../assets/icons/icon-play.svg";
        imagePlay.setAttribute('alt', 'icon play sound')
        imagePlay.style.width = "35%";
        divPlayMusic.appendChild(imagePlay);


        for(let i of chosenSounds) {
            divButtonsSoundNote.innerHTML += `<div class="sound-chosen" data-key="${i.id}">${i.name}</div>`
        }

        const notes = window.document.querySelectorAll("div.sound-chosen");

        
        notes.forEach(note => {
            note.onclick = event => {
                note.classList.add('selected-note');
                
                setTimeout(() => {
                    note.classList.remove('selected-note');
                }, 300)
                
                selectedNote = event.target.dataset.key;
                
                console.log(`nota gerada: ${soundChosenPlaySrc}`);
                console.log(`nota escolhida: ${selectedNote}`);
                
                if(selectedNote == soundChosenPlaySrc) {
                    noteCorrect = true;
                } else {
                    
                    noteCorrect = false;
                }
                
                console.log(noteCorrect);
            }
        })
    }
}