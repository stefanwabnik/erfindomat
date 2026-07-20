/*
====================================

ERFINDOMAT
UI
Version 0.3.0

Verbindet Oberfläche,
Core und Speicher.

====================================
*/

const UI = {

    cards: [],

    drawButton: null,

    unlockButton: null,

    historyList: null,



    /*
    --------------------------------
    Initialisierung
    --------------------------------
    */

    init() {

        this.cards =
            document.querySelectorAll(
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


        this.historyList =
            document.getElementById(
                "historyList"
            );


        this.setupEvents();


        const result =
            Core.draw();


        this.render(
            result
        );


        this.renderChallenge(
            result
        );


        this.renderHistory();

    },



    /*
    --------------------------------
    Ereignisse
    --------------------------------
    */

    setupEvents() {

        if(this.drawButton){

            this.drawButton.addEventListener(
                "click",
                () => {

                    this.newDraw();

                }
            );

        }


        if(this.unlockButton){

            this.unlockButton.addEventListener(
                "click",
                () => {

                    Core.unlockAll();

                    this.updateLocks();

                }
            );

        }


        this.cards.forEach(
            (card,index)=>{

                const button =
                    card.querySelector(
                        ".lock-button"
                    );


                if(!button){

                    return;

                }


                button.addEventListener(
                    "click",
                    ()=>{

                        this.toggleLock(
                            index
                        );

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

        this.animateCards();


        setTimeout(()=>{

            const result =
                Core.draw();


            this.render(
                result
            );


            this.renderChallenge(
                result
            );


            Storage.saveIdea(
                result
            );


            this.renderHistory();

        },450);

    },



    /*
    --------------------------------
    Animation
    --------------------------------
    */

    animateCards() {

        this.cards.forEach(
            card=>{

                card.classList.remove(
                    "drawing"
                );


                void card.offsetWidth;


                card.classList.add(
                    "drawing"
                );

            }
        );

    },

        /*
    --------------------------------
    Karten anzeigen
    --------------------------------
    */

    render(items) {

        this.cards.forEach(
            (card,index)=>{

                const word =
                    card.querySelector(
                        ".card-word"
                    );


                if(items[index]){

                    word.textContent =
                        items[index].text;

                }
                else{

                    word.textContent =
                        "—";

                }

            }
        );


        this.updateLocks();

    },



    /*
    --------------------------------
    Schlossanzeige
    --------------------------------
    */

    updateLocks() {

        this.cards.forEach(
            (card,index)=>{

                const button =
                    card.querySelector(
                        ".lock-button"
                    );


                if(!button){

                    return;

                }


                button.textContent =
                    Core.isLocked(index)
                    ?
                    "🔒"
                    :
                    "🔓";

            }
        );

    },



    /*
    --------------------------------
    Karte sperren / entsperren
    --------------------------------
    */

    toggleLock(index){

        if(
            Core.isLocked(index)
        ){

            Core.unlockCard(
                index
            );

        }
        else{

            Core.lockCard(
                index
            );

        }


        this.updateLocks();

    },



    /*
    --------------------------------
    Aufgabe anzeigen
    --------------------------------
    */

    renderChallenge(items){

        const text =
            document.getElementById(
                "challengeText"
            );


        if(
            text
            &&
            typeof Challenge !==
            "undefined"
        ){

            text.textContent =
                Challenge.create(
                    items
                );

        }

    },



    /*
    --------------------------------
    Verlauf anzeigen
    --------------------------------
    */

    renderHistory(){

        if(!this.historyList){

            return;

        }


        const ideas =
            Storage.getIdeas();


        this.historyList.innerHTML =
            "";


        ideas.forEach(
            idea=>{

                const entry =
                    document.createElement(
                        "li"
                    );


                entry.className =
                    "idea-card";


                entry.innerHTML = `

                    <div class="idea-date">
                        ${idea.date}
                    </div>

                    <div class="idea-functions">
                        ${idea.functions.join(
                            " · "
                        )}
                    </div>

                `;


                this.historyList.appendChild(
                    entry
                );

            }
        );

    }

};