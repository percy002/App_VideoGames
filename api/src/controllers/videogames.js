const axios = require('axios')
require('dotenv').config();
const KEY = process.env.API_KEY;
const {Videogame} = require('../db')

const getVideogames = async(req,res) => {
    let {name} = req.query
    if (name) {//si tenemos la query name haremos la busqueda en la api
        try {
            const response = await axios.get(`https://api.rawg.io/api/games?search={${name}}`,{
                params:{
                    key: KEY,
                    page_size: 15
                }
            })
            if (response.data.results.length === 0) {
                return res.status(200).json({mensaje: 'No se encontro ningun videojuego con ese nombre'})
            }
            let videogames = response.data.results.map(videogame => {
                return {
                    id:videogame.id,
                    nombre:videogame.name,
                    imagen:videogame.background_image,
                    genero : videogame.genres,
                }
            })
            return res.status(200).json(videogames)
        } catch (error) {
            
        }
    }


    try {
        const response = await axios.get('https://api.rawg.io/api/games',{
            params: {
              key: KEY, //api key
              page_size: 10, // especificar el número de elementos que deseas recibir en cada página de resultados
            }
        })
        let videogames = response.data.results.map(videogame =>{//retorna un arreglo de objetos xon los atributos elegidos
            return {
                id:videogame.id,
                nombre:videogame.name,
                imagen:videogame.background_image,
                // plataformas: videogame.platforms,
                // lanzamiento: videogame.released,
                // rating : videogame.rating,
                genero : videogame.genres,
                // ratings: videogame.ratings,
            }
        })
        return res.status(200).json(videogames)
    } catch (error) {
        return res.status(400).json({errors:error.message})
    }
}

const getVideoGameDetail = async(req,res) => {
    let id = req.params.idVideogame
    console.log(id);
    try {
        const response = await axios.get('https://api.rawg.io/api/games/'+id,{
            params: {
                key: KEY
              }
        })
        const detailVideoGame = {
            id:response.data.id,
            nombre:response.data.name,
            imagen:response.data.background_image,
            plataformas: response.data.platforms,
            descripcion: response.data.description,
            lanzamiento: response.data.released,
            rating : response.data.rating,
            genero : response.data.genres,
        }
        return res.status(200).json(detailVideoGame)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const postVideogame = async(req,res) => {
    const videoGameReq = req.body

    console.log(Videogame);
    //validaciones
    try {
        const newVideoGame = await Videogame.create(videoGameReq)

        await newVideoGame.addGenre(videoGameReq.genero)
        res.status(200).json({mensaje:'videojuego creado con exito'})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }


}
module.exports={
    getVideogames,
    getVideoGameDetail,
    postVideogame
}