/*
====================================

ERFINDOMAT
App
Version 0.1.0

Startet die Anwendung.

====================================
*/


const App = {


    init() {

        console.log(
            "Erfindomat startet..."
        );


        UI.init();


        console.log(
            "Erfindomat bereit."
        );

    }


};



/*
------------------------------------
Warten bis HTML geladen ist
------------------------------------
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.init();

    }
);