/*
====================================

ERFINDOMAT
Storage
Version 0.2.1

Speichert Ideen lokal im Browser.

====================================
*/


const Storage = {


    key: "erfindomat_ideas",



    saveIdea(items) {


        const ideas =
            this.getIdeas();



        const idea = {


            id: Date.now(),


            date:
                new Date()
                .toLocaleString(
                    "de-DE"
                ),


            functions:
                items.map(
                    item => item.text
                )


        };



        ideas.unshift(
            idea
        );



        localStorage.setItem(
            this.key,
            JSON.stringify(ideas)
        );


        return idea;

    },



    getIdeas() {


        const data =
            localStorage.getItem(
                this.key
            );



        if(!data){

            return [];

        }



        return JSON.parse(
            data
        );


    },



    clearIdeas(){


        localStorage.removeItem(
            this.key
        );


    }


};