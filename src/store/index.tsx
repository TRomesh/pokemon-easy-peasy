import { createStore, createTypedHooks } from "easy-peasy";
import { pokemonStore, PokemonModel } from "./model";

const store = createStore<PokemonModel>(pokemonStore, { devTools: true });

const typedHooks = createTypedHooks<PokemonModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
