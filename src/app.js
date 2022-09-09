const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movie/movieFunctions");
const { addUser, listUsers, updateUser, deleteUser } = require("./user/userFunction");

const app = async (yargsObj) => {
    try{
        await sequelize.sync()

/*-------------------------------MOVIES---------------- */

        // ADD A NEW MOVIE
        if(yargsObj.createMovie){
            await addMovie({title: yargsObj.title, actor: yargsObj.actor})
            console.table(await listMovies());
            // LIST ALL MOVIES: --readMovies
        } else if (yargsObj.readMovies) {
            console.table(await listMovies());
            // UPDATE A MOVIE: --updateMovie --title "Enter Title" --actor "Enter Actor" --newtitle "Enter New Title" --newActor "Enter New Actor" 
        }else if (yargsObj.updateMovie) {
            await updateMovie(yargsObj);
            console.log(await listMovies());

            // DELETE A MOVIE
        }else if (yargsObj.deleteMovie) {
            await deleteMovie({yargsObj})

/*-------------------------------USERS---------------- */

            // ADD A NEW USER : --createUser --name "Enter Name" --email "Enter Email"
        } else if(yargsObj.createUser){
            await addUser({name: yargsObj.name, email: yargsObj.email})
            console.log(await listUsers())

              // LIST ALL USERS: --readUser
        } else if (yargsObj.readUser) {
            console.log(await listUsers())

            // UPDATE USER: --updateUser --name "Enter Name" --email "Enter Email" --newName "Enter New Name" --newEmail "Enter New Email" 
        }else if (yargsObj.updateUser) {
            await updateUser(yargsObj)
            console.log(await listUsers());

            //DELETE A USER USING SEQUELIZE QUERY: --deleteUser --name "Enter Name"  --email "Enter Email"
        }else if (yargsObj.deleteUser) {
            const deleteUser = async () => {
                await sequelize.query(
                    `DELETE FROM Users WHERE name = '${yargsObj.name}' AND email = '${yargsObj.email}'`)
            } 
            deleteUser()

/*------------------------JOIN TABLES---------------------------------*/
            //: --join
        } else if (yargsObj.join){
            const join = async () => {
                const [results] = await sequelize.query(
                    "SELECT * FROM Movies JOIN Users ON Movies.userId = Users.id"
                )
                console.table(results.map(value => value))
            } 
            join()

        } else {
            console.log("incorrect command")
        }
        sequelize.close()
    } catch(error) {
        console.log(error)
    }
}
app(yargs.argv)