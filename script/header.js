const controlsHeader = {
    buttonsNavBar: window.document.querySelectorAll('li.item'),
    areaAbout: window.document.querySelector('div#area-about'),
    main: window.document.querySelector('main#main'),

    loadMain() {
        this.buttonsNavBar[0].onclick = () => {
            controlsSound.areaSound.style.display = "flex";
            
            this.areaAbout.style.display = "none";
        }
    },

    loadAbout() {
        this.buttonsNavBar[1].onclick = () => {
            controlsSound.areaSound.style.display = "none";
            this.areaAbout.style.display = "flex";
        }
    }
}