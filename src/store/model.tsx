import axios from "axios";
import { action, Action, computed, Computed, thunk, Thunk } from "easy-peasy";
import { updateItem } from "../util";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  power: string;
  description: string;
}

export interface PokemonCardType extends Pokemon {
  onDelete: (id: string) => void;
  onEdit?: (pokemon: Pokemon) => void;
}

export interface PokemonModel {
  pokemon: Pokemon | null;
  pokemons: Pokemon[];
  getPokemons: Thunk<PokemonModel>;
  addPokemon: Action<PokemonModel, Pokemon>;
  deletePokemon: Action<PokemonModel, string>;
  initPokemon: Action<PokemonModel, Pokemon[]>;
  pokemonCount: Computed<PokemonModel, number>;
  updatePokemon: Action<PokemonModel, Pokemon>;
}

export const pokemonStore: PokemonModel = {
  pokemon: null,
  pokemons: [],
  initPokemon: action((state, payload) => {
    state.pokemons = payload;
  }),
  pokemonCount: computed((state) => state.pokemons.length), // computes the length of the pokemon array
  addPokemon: action((state, payload) => {
    state.pokemons.unshift(payload);
  }),
  deletePokemon: action((state, id) => {
    state.pokemons = state.pokemons.filter(
      (pokemon: Pokemon) => pokemon.id !== id
    );
  }),
  updatePokemon: action((state, payload) => {
    state.pokemons = updateItem(state.pokemons, payload);
  }),
  getPokemons: thunk(async (action) => {
    // thunk is used to encapsulate side effects and it allows dispatching other actions
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/pokemon`);
    const pokemons = results.map((data: { name: string; url: string }) => {
      return {
        id: data.url.split("/")?.[data.url.split("/").length - 2], // extract the id from the url
        name: data.name,
      };
    }) as Pokemon[];
    action.initPokemon(pokemons); // dispatch another action (initPokemon action)
  }),
};
