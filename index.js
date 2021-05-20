import express from 'express';
import bodyParser from 'body-parser';

import pokemonsRoutes from './routes/pokemons.js';

const app = express();
const PORT = '5000';

app.use(bodyParser.json());

app.use('/pokemons', pokemonsRoutes); // all requests here starts with '/pokemons'

app.get('/', (request, respond) => {
  console.log('[TEST]!');
  //respond.send("hello from homepage.");
  respond.send(`Pokemons API Gateway ${request.params} 
  \n ...developed by Yaokun Lin`);

});

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));