import { Box } from "@chakra-ui/layout";
import { Center, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Pokemon } from "./components/PokemonCard/PokemonCard";
import { PokemonContainer } from "./components/PokemonContainer/PokemonContainer";

const POKE_API_URL = `${process.env.NEXT_PUBLIC_POKE_API_URL}`;

console.log(`Api url pokemon: `, POKE_API_URL);

type SomePokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

const Home: NextPage<PokemonContainer> = ({ pokemons }) => {
  return (
    <Box>
      <Center>
        <Heading
          fontSize={"2xl"}
          fontFamily={"body"}
          textTransform="capitalize"
        >
          Pokemon Wiki
        </Heading>
      </Center>
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
      src: data.sprites.other.dream_world.front_default,
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
