import { v4 as uuidv4 } from 'uuid';
import { defaultData } from './defaultData.js'

let pokemons = []
pokemons = defaultData

export const getPokemonFunction = (request, respond) => {
  console.log(pokemons);
  //respond.send('Hello'); 
  respond.send(pokemons);
}

export const createPokemonFunction = (request, respond) => {
  //console.log('POST ROUTE REACHED');
  // respond.send('POST ROUTE REACHED');
  console.log(request.body);
  const { name, heightInMeter, weightInKG } = request.body;


  const newPokemon = request.body;
  const newPokemonID = uuidv4();
  const newPokemonImg = "https://img.pokemondb.net/artwork/large/" + name.toLowerCase() + ".jpg"
  const newPokemonURL = "https://pokemondb.net/pokedex/" + name.toLowerCase()


  const newPokemonWithID = {
    ...newPokemon,
    id: newPokemonID,
    img: newPokemonImg,
    url: newPokemonURL
  };
  pokemons.push(newPokemonWithID);

  respond.send(`Pokemon ${newPokemon.name} has been captured to the databse.`)
}

export const getSinglePokemonFunction = (request, respond) => {
  //respond.send('the getID route');
  console.log(request.params);

  const { id } = request.params;
  const foundPokemon = pokemons.find((pokemon) => pokemon.id === id);


  //respond.send(request.params);
  respond.send(foundPokemon);
}

export const deletePokemonFunction = (request, respond) => {
  const { id } = request.params;
  console.log(id);
  const idToDelete = id;

  const pokemonTobeDelete = pokemons.find((pokemon) => pokemon.id === idToDelete);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== idToDelete);

  respond.send(`pokemon with
  \n id: ${idToDelete} 
  \n name: ${pokemonTobeDelete.name} 
  \n heightInMeter: ${pokemonTobeDelete.heightInMeter} 
  \n weightInKG: ${pokemonTobeDelete.weightInKG} 
  \n has been deleted from the database.`)
}

export const updatePokemonFunction = (request, respond) => {
  const { id } = request.params;
  const { name, heightInMeter, weightInKG } = request.body;

  console.log(request.body);

  const idToBeUpdated = id;
  const newName = name;
  const newHeightInMeter = heightInMeter;
  const newWeightInKG = weightInKG;


  const pokemonToBeUpdated = pokemons.find((pokemon) => pokemon.id === idToBeUpdated);


  if (newName) {
    pokemonToBeUpdated.name = newName;

    respond.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
    it now has a updated name ${pokemonToBeUpdated.name}`);
  };

  if (newHeightInMeter) {
    pokemonToBeUpdated.heightInMeter = newHeightInMeter;

    respond.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
    it now has a updated last name ${pokemonToBeUpdated.heightInMeter}`);
  };

  if (newWeightInKG) {
    pokemonToBeUpdated.weightInKG = newWeightInKG;

    respond.send(`Pokemon with the id ${idToBeUpdated} has been updated.\n
    it now has a updated age ${pokemonToBeUpdated.weightInKG}`);
  };




}



