import type { GetStaticProps, NextPage } from 'next'
import { getBGColorByPokemonTypes } from '../utils/fnUtils'
import { ProjectEnv } from '../utils/readEnv'
import reporter from 'io-ts-reporters'
import {
  PokemonCardProp,
  PokemonSideProp,
  PokemonWiki,
  SomePokemonResponse,
} from '../utils/Types'
import { PokemonContainer } from '../components/PokemonContainer/PokemonContainer'

const Home: NextPage<PokemonContainer> = ({ pokemons }) => {
  return (
    <div>
      <div>
        <h1>Pokemon Wiki</h1>
      </div>
      <PokemonContainer pokemons={pokemons} />
    </div>
  )
}

const getSomePokemon = async (
  limit: number,
  offset: number,
): Promise<SomePokemonResponse> =>
  fetch(`${ProjectEnv.pokemonAPI}?limit=${limit}&offset=${offset}`).then(
    (response) => response.json(),
  )

const getPokemonCards = async (
  pokemonName: string,
  url: string,
): Promise<PokemonCardProp> => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!PokemonWiki.is(data)) {
        console.log(reporter.report(PokemonWiki.decode(data)))
        throw new Error('error')
      }

      return {
        pokemonData: {
          pokemonId: data.id,
          pokemonName: pokemonName,
          pokemonType: data.types ?? [],
        },
        cardConfig: {
          cardAltImage: pokemonName,
          cardColor: getBGColorByPokemonTypes(data.types),
          cardImage: data.sprites.other.dream_world.front_default,
        },
      }
    })
}

export const getServerSideProps: GetStaticProps<PokemonSideProp> = async () => {
  const somePokemons = await getSomePokemon(20, 0)
  const pokemons = somePokemons.results.map((pokemon) =>
    getPokemonCards(pokemon.name, pokemon.url),
  )
  const pokemonCards = await Promise.all(pokemons)

  return {
    props: {
      pokemons: pokemonCards,
    },
  }
}

export default Home
