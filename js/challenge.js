/*
====================================

ERFINDOMAT
Challenge Generator
Version 0.3.1

Erzeugt Aufgaben aus Funktionen.

====================================
*/


const Challenge = {


    create(items) {


        if(!items || items.length < 3){

            return "";

        }


        const first =
            items[0].description;


        const second =
            items[1].description;


        const third =
            items[2].description;



        return `
        Erfinde ein Objekt, das
        ${this.clean(first)}
        Dabei soll es außerdem
        ${this.clean(second)}
        und
        ${this.clean(third)}
        .
        `;


    },



    clean(text){

        return text
            .replace(
                /\.$/,
                ""
            );

    }


};