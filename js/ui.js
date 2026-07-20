/*
====================================

ERFINDOMAT
UI
Version 0.1.0

Verbindet Core und Oberfläche.

====================================
*/


const UI = {


    cards: [],

    drawButton: null,

    unlockButton: null,


    /*
    --------------------------------
    Initialisierung
    --------------------------------
    */

    init() {


        this.cards = document.querySelectorAll(
            ".card"
        );


        this.drawButton =
            document.getElementById(
                "drawButton"
            );


        this.unlockButton =
            document.getElementById(
                "unlockButton"
            );


        this.setupEvents();


        this.render(
            Core.draw()
        );


    },


    /*
    --------------------------------
    Buttons aktivieren
    --------------------------------
    */

    setupEvents() {


        this.drawButton.addEventListener(
            "click",
            () => {

                this.newDraw();

            }
        );


        this.unlockButton.addEventListener(
            "click",
            () => {

                Core.unlockAll();

                this.updateLocks();

            }
        );


        this.cards.forEach(
            (card, index) => {


                const button =
                    card.querySelector(
                        ".lock-button"
                    );


                button.addEventListener(
                    "click",
                    () => {

                        this.toggleLock(index);

                    }
                );


            }
        );


    },


    /*
    --------------------------------
    Neue Ziehung
    --------------------------------
    */

    newDraw() {


        const result =
            Core.draw();


        this.render(result);


    },


    /*
    --------------------------------
    Daten in Karten schreiben
    --------------------------------
    */

    render(items) {


        this.cards.forEach(
            (card, index) => {


                const word =
                    card.querySelector(
                        ".card-word"
                    );


                if(items[index]) {


                    word.textContent =
                        items[index].text;


                }
                else {


                    word.textContent =
                        "—";


                }


            }
        );


        this.updateLocks();


    },


    /*
    --------------------------------
    Sperr-Symbole aktualisieren
    --------------------------------
    */

    updateLocks() {


        this.cards.forEach(
            (card, index) => {


                const button =
                    card.querySelector(
                        ".lock-button"
                    );


                if(Core.isLocked(index)) {


                    button.textContent =
                        "🔒";


                }
                else {


                    button.textContent =
                        "🔓";


                }


            }
        );


    },


    /*
    --------------------------------
    Karte sperren / entsperren
    --------------------------------
    --------------------------------
    */

    toggleLock(index) {


        if(Core.isLocked(index)) {


            Core.unlockCard(index);


        }
        else {


            Core.lockCard(index);


        }


        this.updateLocks();


    }


};