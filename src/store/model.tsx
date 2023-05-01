import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
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
  pokemons: Pokemon[];
  initPokemon: Action<PokemonModel, Pokemon[]>;
  addPokemon: Action<PokemonModel, Pokemon>;
  deletePokemon: Action<PokemonModel, string>;
  updatePokemon: Action<PokemonModel, Pokemon>;
  getPokemons: Thunk<PokemonModel>;
}

export const pokemonStore: PokemonModel = {
  pokemons: [],
  initPokemon: action((state, payload) => {
    state.pokemons = payload;
  }),
  addPokemon: action((state, payload) => {
    state.pokemons.push(payload);
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
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}/pokemon`);
    const pokemons = results.map((data: { name: string; url: string }) => {
      return {
        id: data.url.split("/")?.[data.url.split("/").length - 2],
        name: data.name,
      };
    }) as Pokemon[];
    action.initPokemon(pokemons);
  }),
};
