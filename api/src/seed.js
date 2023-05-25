const Genre = require('./models/Genre')
const axios = require('axios')
require('dotenv').config();

const KEY = process.env.API_KEY;

const createGenreData = async () => {
    
    try {
        const response = await axios.get('https://api.rawg.io/api/genres',{
        params:{
            key:KEY
        }
        })
        const genres = response.data.results.map(genre => {
            return {
            id: genre.id,
            name:genre.name
            }
        })

        await Genre.bulkCreate(genres)
        console.log('generos creados exitosamente');
        return
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createGenreData
}