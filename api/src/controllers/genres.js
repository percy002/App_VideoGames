require('dotenv').config();
const axios = require('axios')
const {Genre} = require('../db')
const KEY = process.env.API_KEY;

const getGenres = async (req,res) => {
    // const response = await axios.get('https://api.rawg.io/api/genres',{
    //     params:{
    //         key:KEY
    //     }
    // })

    // const genres = response.data.results.map(genre => {
    //     return {
    //     id: genre.id,
    //     name:genre.name
    //     }
    // })
    const genres = await Genre.findAll()
    return res.status(200).json(genres)

    // return res.status(200).json(genres)
    // console.log(response.data);
}

module.exports ={
    getGenres
}