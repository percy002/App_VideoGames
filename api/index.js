//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn,Genre } = require('./src/db.js');
const axios = require('axios')
require('dotenv').config();

const KEY = process.env.API_KEY;

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {  
  const response = await axios.get('https://api.rawg.io/api/genres',{
    params:{
        key:KEY,
        // page_size: 2
    }
    })
    const genres = response.data.results.map(genre => {
        return {
          nombre: genre.name
        }
    })
    // console.log(genres);
    await Genre.bulkCreate(genres)

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).catch(error=>{
  console.log(error);
});
