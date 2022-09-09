const { sequelize } = require("../db/connection")
const Movie = require("./movieTable")


//ADD MOVIE FUNCTION
exports.addMovie = async (movieObj) => {
    try {
        await Movie.create(movieObj)
    } catch (error) {
        console.log(error)
 
    }
}

// LIST MOVIE FUNCTION
exports.listMovies = async () => {
    try {
        return await Movie.findAll()
    } catch (error) {
        console.log(error)

    }
}

// UPDATE MOVIE FUNCTION
exports.updateMovie = async (movieObj) => {
    try {
        await Movie.update({title: movieObj.newTitle, actor: movieObj.newActor}, {
            where: {
                title: movieObj.title,
                actor: movieObj.actor
            },
        });
    } catch (error) {
        console.log(error)
 
    }
}

//DELETE MOVIE FUNCTION
exports.deleteMovie = async (movieObj) => {
    try {
        return await Movie.destroy({
            where: {
                title: movieObj.title,
                actor: movieObj.actor
            },
        })
    } catch (error) {
        console.log(error)

    }
}




