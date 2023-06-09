/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent, useEffect } from "react";
import { nanoid } from "nanoid";
import { useStoreActions, useStoreState } from "./store";
import { Pokemon } from "./store/model";
import PokemonLogo from "./assets/pokémon_logo.svg";
import PokemonCard from "./components/PokemonCard";

const initState: Pokemon = {
  id: "",
  name: "",
  height: 0,
  weight: 0,
  description: "",
  power: "",
};

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>(initState);
  const [isEditing, setEditing] = useState<boolean>(false);
  const pokemons = useStoreState((state) => state.pokemons);
  const pokemonCount = useStoreState((state) => state.pokemonCount);
  const getPokemons = useStoreActions((actions) => actions.getPokemons);
  const addPokemon = useStoreActions((actions) => actions.addPokemon);
  const deletePokemon = useStoreActions((actions) => actions.deletePokemon);
  const updatePokemon = useStoreActions((actions) => actions.updatePokemon);

  useEffect(() => {
    getPokemons();
  }, []);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      updatePokemon(pokemon);
      setEditing(false);
    } else {
      addPokemon({ ...pokemon, id: nanoid() });
    }
    setPokemon(initState);
  };

  const handleDelete = (id: string) => {
    deletePokemon(id);
  };

  const handleEdit = (pokemon: Pokemon) => {
    setEditing(true);
    setPokemon(pokemon);
  };

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto mt-8">
        <img src={PokemonLogo} className="mx-auto" />
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={pokemon.name}
              onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              htmlFor="weight"
              className="block text-gray-700 font-bold mb-2"
            >
              Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={pokemon.weight}
              onChange={(e) =>
                setPokemon({ ...pokemon, weight: e.target.valueAsNumber })
              }
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              htmlFor="height"
              className="block text-gray-700 font-bold mb-2"
            >
              Height
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={pokemon.height}
              onChange={(e) =>
                setPokemon({ ...pokemon, height: e.target.valueAsNumber })
              }
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Power
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={pokemon.power}
              onChange={(e) =>
                setPokemon({ ...pokemon, power: e.target.value })
              }
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={pokemon.description}
              onChange={(e) =>
                setPokemon({ ...pokemon, description: e.target.value })
              }
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        {pokemons.length === 0 ? (
          <p>No pokemons yet</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Pokemon count : {pokemonCount}
            </h1>
            <ul className="list-disc">
              {pokemons.map(
                ({ id, name, weight, height, power, description }) => (
                  <PokemonCard
                    key={id}
                    id={id}
                    name={name}
                    weight={weight}
                    height={height}
                    power={power}
                    description={description}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                )
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
