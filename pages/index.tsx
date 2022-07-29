import { Box } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { Pokemon } from "./components/PokemonCard/PokemonCard";
import { PokemonContainer } from "./components/PokemonContainer/PokemonContainer";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon";

type SomePokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

const Home: NextPage<PokemonContainer> = ({ pokemons }) => {
  return (
    <Box>
      <PokemonContainer pokemons={pokemons} />
    </Box>
  );
};

const getSomePokemon = async (
  limit: number,
  offset: number
): Promise<SomePokemonResponse> => {
  return fetch(`${POKE_API_URL}?limit=${limit}&offset=${offset}`).then(
    (response) => response.json()
  );
};

const getPokemonsImage = async (
  pokemonName: string,
  url: string
): Promise<Pokemon> => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => ({
      name: pokemonName,
      url: data.sprites.other.dream_world.front_default,
    }));
};

export async function getServerSideProps() {
  const somePokemons = await getSomePokemon(20, 0);
  const promiseOfPokemonsDetails = somePokemons.results.map((pokemon) =>
    getPokemonsImage(pokemon.name, pokemon.url)
  );
  const pokemonsDetail = await Promise.all(promiseOfPokemonsDetails);

  return {
    props: {
      pokemons: pokemonsDetail,
    },
  };
}

export default Home;
