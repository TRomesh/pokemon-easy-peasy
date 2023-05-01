import { Pokemon } from "./store/model";

export const updateItem = (array: Pokemon[], data: Pokemon) => {
  const pokemon = array.find((pokemon) => pokemon.id === data.id);
  const updatedPokemon = { ...pokemon, ...data };
  let pokemonIndex = array.findIndex((pokemon) => pokemon.id === data.id);

  return [
    ...array.slice(0, pokemonIndex),
    updatedPokemon,
    ...array.slice(++pokemonIndex),
  ];
};

export const deleteItem = (array: Pokemon[], id: string) => {
  return array.filter((pokemon) => pokemon.id !== id);
};
