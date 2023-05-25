const { Router } = require('express');

const {getVideogames,getVideoGameDetail,postVideogame} = require('../controllers/videogames')
const {getGenres} = require('../controllers/genres')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames',getVideogames)
router.get('/videogames/:idVideogame',getVideoGameDetail)
router.post('/videogames',postVideogame)
router.get('/genres',getGenres)


module.exports = router;
