import { Button } from '@chakra-ui/react'
import { getClassNameByPokemonTypes } from '../utils/fnUtils'
import { ProjectEnv } from '../utils/readEnv'
import reporter from 'io-ts-reporters'
import {
  PokemonCardProp,
  PokemonsResponse,
  PokemonWiki,
  SomePokemonResponse,
} from '../utils/Types'
import {
  PokemonContainer,
  PokemonItems,
} from '../components/PokemonContainer/PokemonContainer'
import { FC, useEffect } from 'react'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useDebounce } from 'react-use'

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
          cardHeaderClasses: getClassNameByPokemonTypes(data.types),
          cardImage: data.sprites.other.dream_world.front_default,
        },
      }
    })
}

const Home: FC<PokemonContainer> = ({}) => {
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

  const [, infiniteScroll] = useDebounce(() => () => fetchNextPage(), 20, [
    fetchNextPage,
  ])

  /*useEffect(() => {
    document.addEventListener('scroll', () => fetchNextPage())
    return () => document.removeEventListener('scroll', () => fetchNextPage())
  }, [fetchNextPage])*/

  useEffect(() => {
    document.addEventListener('scroll', () => infiniteScroll)
    return () => document.removeEventListener('scroll', infiniteScroll)
  }, [infiniteScroll])

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {JSON.stringify(error)}</p>
  ) : (
    <div>
      <div>
        <h1>Pokemon Wiki</h1>
      </div>
      <PokemonContainer>
        {data?.pages.map((somePokemon, i) => (
          <PokemonItems
            key={`pokemonContainer${i}`}
            pokemons={somePokemon.allPokemons}
          />
        ))}
      </PokemonContainer>
      <div>
        <Button
          isLoading={isFetchingNextPage}
          loadingText="Loading more..."
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="start"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage ? 'Load More Pokemons' : 'Nothing more to load'}
        </Button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  )
}

export default Home
