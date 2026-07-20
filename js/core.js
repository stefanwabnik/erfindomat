/*
====================================

ERFINDOMAT
Core
Version 0.1.1

Die Engine des Erfindomaten.

Neu:
- gesperrte Karten bleiben erhalten

====================================
*/


const Core = {


    state: {

        currentDraw: [],

        lockedCards: [
            false,
            false,
            false
        ]

    },


    settings: {

        cardCount: 3

    },


    /*
    --------------------------------
    Neue Ziehung erzeugen
    --------------------------------
    */

    draw() {


        const result = [];


        const available = [
            ...VerbData
        ];



        for(
            let i = 0;
            i < this.settings.cardCount;
            i++
        ){


            /*
            Gesperrte Karte behalten
            */

            if(
                this.state.lockedCards[i]
                &&
                this.state.currentDraw[i]
            ){

                result[i] =
                    this.state.currentDraw[i];

                continue;

            }



            let item;


            do {

                const index =
                    Math.floor(
                        Math.random()
                        *
                        available.length
                    );


                item =
                    available.splice(
                        index,
                        1
                    )[0];


            }
            while(
                this.contains(
                    item.id,
                    result
                )
            );



            result[i] = item;


        }



        this.state.currentDraw =
            result;


        return result;


    },



    /*
    --------------------------------
    Aktuelle Ziehung
    --------------------------------
    */

    getCurrentDraw(){

        return this.state.currentDraw;

    },



    /*
    --------------------------------
    Sperren
    --------------------------------
    */

    lockCard(index){

        this.state.lockedCards[index]
            = true;

    },


    unlockCard(index){

        this.state.lockedCards[index]
            = false;

    },


    unlockAll(){

        this.state.lockedCards =
        [
            false,
            false,
            false
        ];

    },


    isLocked(index){

        return this.state.lockedCards[index];

    },



    /*
    --------------------------------
    Dopplungen verhindern
    --------------------------------
    */

    contains(id,list){

        return list.some(
            item =>
                item.id === id
        );

    },



    /*
    --------------------------------
    Debug
    --------------------------------
    */

    info(){

        console.log(
            "Erfindomat Core",
            this.state
        );

    }


};