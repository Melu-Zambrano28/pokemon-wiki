import { Box } from '@chakra-ui/layout'
import { Center, Heading } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import { getBGColorByPokemonType } from '../utils/fnUtils'
import { ProjectEnv } from '../utils/readEnv'
import { Pokemon } from './components/PokemonCard/PokemonCard'
import { PokemonContainer } from './components/PokemonContainer/PokemonContainer'

type SomePokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

type PokemonSideProp = {
  pokemons: Pokemon[]
}

const Home: NextPage<PokemonContainer> = ({ pokemons }) => {
  return (
    <Box>
      <Center>
        <Heading
          fontSize={'2xl'}
          fontFamily={'body'}
          textTransform="capitalize"
        >
          Pokemon Wiki
        </Heading>
      </Center>
      <PokemonContainer pokemons={pokemons} />
    </Box>
  )
}

const getSomePokemon = async (
  limit: number,
  offset: number,
): Promise<SomePokemonResponse> =>
  fetch(`${ProjectEnv.pokemonAPI}?limit=${limit}&offset=${offset}`).then(
    (response) => response.json(),
  )

const getPokemonsImage = async (
  pokemonName: string,
  url: string,
): Promise<Pokemon> => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => ({
      pokemonName: pokemonName,
      pokemonImage: data.sprites.other.dream_world.front_default,
      cardColor: getBGColorByPokemonType(data.types),
    }))
}

export const getServerSideProps: GetStaticProps<PokemonSideProp> = async () => {
  const somePokemons = await getSomePokemon(20, 0)
  const promiseOfPokemonsDetails = somePokemons.results.map((pokemon) =>
    getPokemonsImage(pokemon.name, pokemon.url),
  )
  const pokemonsDetail = await Promise.all(promiseOfPokemonsDetails)

  return {
    props: {
      pokemons: pokemonsDetail,
    },
  }
}

export default Home
