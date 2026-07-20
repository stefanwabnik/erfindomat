/*
====================================

ERFINDOMAT
Core
Version 0.3.0

Intelligenter Funktionsgenerator.

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
    Neue Idee erzeugen
    --------------------------------
    */


    draw() {


    const result = [];



    /*
    Karte 1
    */

    if(
        this.state.lockedCards[0]
        &&
        this.state.currentDraw[0]
    ){

        result[0] =
            this.state.currentDraw[0];

    }
    else {


        const first =
            this.randomItem(
                VerbData
            );


        result[0] =
            first;

    }



    /*
    Karte 2
    */

    if(
        this.state.lockedCards[1]
        &&
        this.state.currentDraw[1]
    ){

        result[1] =
            this.state.currentDraw[1];

    }
    else {


        const partner =
            this.findPartner(
                result[0],
                result
            );


        result[1] =
            partner;

    }



    /*
    Karte 3
    */

    if(
        this.state.lockedCards[2]
        &&
        this.state.currentDraw[2]
    ){

        result[2] =
            this.state.currentDraw[2];

    }
    else {


        const surprise =
            this.findSurprise(
                result
            );


        result[2] =
            surprise;

    }



    this.state.currentDraw =
        result;


    return result;

},

    /*
    --------------------------------
    Zufall aus Liste
    --------------------------------
    */

    randomItem(list) {


        const index =
            Math.floor(
                Math.random()
                *
                list.length
            );


        return list[index];

    },



    /*
    --------------------------------
    Passende Funktion suchen
    --------------------------------
    */

    findPartner(base,list) {


        const possible =
            VerbData.filter(
                item => {


                    return (

                        base.partners &&
                        base.partners.includes(
                            item.text
                        )

                        &&

                        !this.contains(
                            item.id,
                            list
                        )

                    );


                }
            );



        if(possible.length > 0){


            return this.randomItem(
                possible
            );


        }


return this.randomItem(
    VerbData.filter(
        item =>
        item.id !== base.id
        &&
        !this.contains(
            item.id,
            list
        )
    )
);


        return this.randomItem(
            VerbData.filter(
                item =>
                !this.contains(
                    item.id,
                    list
                )
            )
        );


    },



    /*
    --------------------------------
    Überraschende Ergänzung
    --------------------------------
    */

   findSurprise(list) {


    const possible =
        VerbData.filter(
            item => {


                return (

                    item.surprise >= 7

                    &&

                    !this.contains(
                        item.id,
                        list
                    )

                );


            }
        );



    if(possible.length > 0){


        return this.randomItem(
            possible
        );


    }



    return this.randomItem(
        VerbData.filter(
            item =>
            !this.contains(
                item.id,
                list
            )
        )
    );


},



    /*
    --------------------------------
    Aktuelle Idee
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
            =
            true;


    },


    unlockCard(index){


        this.state.lockedCards[index]
            =
            false;


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
    Dopplungen
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
            "Erfindomat Core 0.3.0",
            this.state
        );


    }


};