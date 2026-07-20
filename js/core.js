/*
====================================

ERFINDOMAT
Core
Version 0.1.0

Die Engine des Erfindomaten.

Zuständig für:
- Ziehlogik
- Datenverwaltung
- Spielzustand

Kennt keine Oberfläche.

====================================
*/

const Core = {


    state: {

        currentDraw: [],

        lockedCards: [false, false, false]

    },


    settings: {

        cardCount: 3

    },


    /*
    --------------------------------
    Startet eine neue Ziehung
    --------------------------------
    */

    draw() {

        const available = [...VerbData];


        const result = [];


        while (
            result.length < this.settings.cardCount
            &&
            available.length > 0
        ) {

            const index = Math.floor(
                Math.random() * available.length
            );


            const item = available.splice(index, 1)[0];


            result.push(item);

        }


        this.state.currentDraw = result;


        return result;

    },


    /*
    --------------------------------
    Liefert die aktuelle Ziehung
    --------------------------------
    */

    getCurrentDraw() {

        return this.state.currentDraw;

    },


    /*
    --------------------------------
    Sperren vorbereiten
    --------------------------------
    */

    lockCard(index) {

        this.state.lockedCards[index] = true;

    },


    unlockCard(index) {

        this.state.lockedCards[index] = false;

    },


    unlockAll() {

        this.state.lockedCards = [
            false,
            false,
            false
        ];

    },


    isLocked(index) {

        return this.state.lockedCards[index];

    },


    /*
    --------------------------------
    Prüft, ob ein neues Wort
    bereits gezogen wurde
    --------------------------------
    */

    contains(id, list) {

        return list.some(item => {

            return item.id === id;

        });

    },


    /*
    --------------------------------
    Testfunktion
    --------------------------------
    */

    info() {

        console.log(
            "Erfindomat Core läuft.",
            this.state
        );

    }


};