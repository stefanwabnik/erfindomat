const Generator = {

    draw(amount = 3) {

        const pool = [...VerbData];

        const result = [];

        while (result.length < amount && pool.length > 0) {

            const index = Math.floor(Math.random() * pool.length);

            result.push(pool.splice(index, 1)[0]);

        }

        return result;

    }

};