/*
====================================

ERFINDOMAT
UI
Version 0.2.1

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


        this.render(
            Core.draw()
        );


        this.renderHistory();


    },



    /*
    --------------------------------
    Ereignisse
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
            (card,index)=>{


                const button =
                    card.querySelector(
                        ".lock-button"
                    );


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


        this.cards.forEach(card=>{


            card.classList.remove(
                "drawing"
            );


            void card.offsetWidth;


            card.classList.add(
                "drawing"
            );


        });


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
    Sperren
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
    Ideenarchiv anzeigen
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


                const card =
                    document.createElement(
                        "li"
                    );


                card.className =
                    "idea-card";



                card.innerHTML = `

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
                    card
                );


            }
        );


    }


};