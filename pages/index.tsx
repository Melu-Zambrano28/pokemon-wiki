import { Box } from '@chakra-ui/layout'
import { Center, Heading } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import { getBGColorByPokemonTypes } from '../utils/fnUtils'
import { ProjectEnv } from '../utils/readEnv'
import reporter from 'io-ts-reporters'
import {
  PokemonCardProp,
  PokemonSideProp,
  PokemonsResponse,
  PokemonWiki,
  SomePokemonResponse,
} from '../utils/Types'
import { PokemonContainer } from '../components/PokemonContainer/PokemonContainer'
import { FC } from 'react'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

const getSomePokemon =
  (limit: number) =>
  ({ pageParam = 0 }: { pageParam?: number }): Promise<SomePokemonResponse> =>
    fetch(`${ProjectEnv.pokemonAPI}?limit=${limit}&offset=${pageParam}`).then(
      (response) => response.json(),
    )
const getNextNPageFromResponse = (lastPage: SomePokemonResponse): number => {
  const getQueryParams = lastPage.next ? lastPage.next.split('?')[1] : undefined
  const instanceQp = getQueryParams
    ? new URLSearchParams(getQueryParams).get('offset')
    : null
  return instanceQp != null ? parseInt(instanceQp) : 0
}

const getPokemons =
  (limit: number) =>
  async ({
    pageParam = 0,
  }: {
    pageParam?: number
  }): Promise<PokemonsResponse> => {
    const somePokemonsResponse = await fetch(
      `${ProjectEnv.pokemonAPI}?limit=${limit}&offset=${pageParam}`,
    )
    const somePokemonsResponseJson: SomePokemonResponse =
      await somePokemonsResponse.json()

    const numNextPage = getNextNPageFromResponse(somePokemonsResponseJson)

    const promisePokemonCards = somePokemonsResponseJson.results.map(
      (pokemon) => getPokemonCards(pokemon.name, pokemon.url),
    )
    const pokemonCards = await Promise.all(promisePokemonCards)

    return {
      numNextPokemonPage: numNextPage,
      allPokemons: pokemonCards,
    }
  }

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

const Home: FC<PokemonContainer> = ({ pokemons }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['pokemons'], getPokemons(6), {
    getNextPageParam: (lastPage, pages) => lastPage.numNextPokemonPage,
  })

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {JSON.stringify(error)}</p>
  ) : (
    <>
      {data?.pages.map((somePokemon, i) => (
        <React.Fragment key={i}>
          <PokemonContainer pokemons={somePokemon.allPokemons} />
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}

export default Home
