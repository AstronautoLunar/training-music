const controlsHeader = {
    buttonsNavBar: window.document.querySelectorAll('li.item'),
    areaAbout: window.document.querySelector('div#area-about'),
    main: window.document.querySelector('main#main'),

    loadMain() {
        const home = this.buttonsNavBar[0];
        home.onclick = () => {
            controlsSound.areaSound.style.display = "flex";
            
            this.areaAbout.style.display = "none";
        }
    },

    loadAbout() {
        const about = this.buttonsNavBar[1];
        about.onclick = () => {
            controlsSound.areaSound.style.display = "none";
            this.areaAbout.style.display = "flex";
        }
    }
}