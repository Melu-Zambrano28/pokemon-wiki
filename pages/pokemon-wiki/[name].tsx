import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getBGColorByPokemonType } from '../../utils/fnUtils'
import { PokemonCard } from '../components/PokemonCard/PokemonCard'
import * as t from 'io-ts'

const pokemonWikiQuery = t.readonly(
  t.type({
    name: t.string,
  }),
  'pokemonWikiQuery',
)
export type PokemonWikiQuery = t.TypeOf<typeof pokemonWikiQuery>

const PokemonTypeLiteral = t.keyof({
  normal: null,
  fire: null,
  water: null,
  grass: null,
  electric: null,
  ice: null,
  fighting: null,
  poison: null,
  ground: null,
  flying: null,
  psychic: null,
  bug: null,
  rock: null,
  ghost: null,
  dark: null,
  dragon: null,
  steel: null,
  fairy: null,
})

export type PokemonTypeLiteral = t.TypeOf<typeof PokemonTypeLiteral>

//codec
const PokemonType = t.readonly(
  t.type({
    slot: t.number,
    type: t.readonly(
      t.type({
        name: PokemonTypeLiteral,
        url: t.string,
      }),
    ),
  }),
  'PokemonType',
)

export type PokemonType = t.TypeOf<typeof PokemonType>

const PokemonWiki = t.readonly(
  t.type({
    name: t.string,
    location_area_encounters: t.string,
    sprites: t.readonly(
      t.type({
        back_default: t.string,
        back_female: t.string,
        back_shiny: t.string,
        back_shiny_female: t.string,
        front_default: t.string,
        front_female: t.string,
        front_shiny: t.string,
        front_shiny_female: t.string,
        other: t.readonly(
          t.type({
            dream_world: t.readonly(
              t.type({
                front_default: t.string,
                front_female: t.string,
              }),
            ),
          }),
        ),
      }),
    ),
    types: t.readonlyArray(PokemonType),
  }),
  'PokemonWiki',
)

export type PokemonWiki = t.TypeOf<typeof PokemonWiki>

const getPokemon = async (pokemonName: string): Promise<PokemonWiki> => {
  return fetch(`${process.env['NEXT_PUBLIC_POKE_API_URL']}/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => ({
      name: data.name,
      abilities: data.abilities,
      location_area_encounters: data.location_area_encounters,
      sprites: data.sprites,
      types: data.types,
    }))
}

export const getServerSideProps: GetServerSideProps<
  PokemonWiki,
  PokemonWikiQuery
> = async (context) => {
  const params = context.params
  const name = params?.name ? params.name : ''
  const pokemon = await getPokemon(name)
  console.log(`getServerSideProps `, pokemon)
  return {
    props: {
      name: pokemon.name,
      location_area_encounters: pokemon.location_area_encounters,
      sprites: pokemon.sprites,
      types: pokemon.types,
    },
  }
}

const PokemonWikiPage: NextPage<PokemonWiki> = ({ name, sprites, types }) => {
  const color = getBGColorByPokemonType(types)

  const pokemonData = {
    pokemonName: name,
    pokemonDescription: '',
    pokemonType: [],
  }

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'auto 1fr auto'}
        gridTemplateColumns={'445px 1fr'}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
        maxH="100vh"
      >
        <GridItem pl="2" bg="" area={'header'}>
          {name}
        </GridItem>
        <GridItem pl="2" area={'nav'}>
          <PokemonCard
            pokemonData={pokemonData}
            cardConfig={{
              cardImage: sprites.other.dream_world.front_default,
              cardAltImage: name,
              cardColor: color,
            }}
          />

          <SimpleGrid columns={2} spacing={10}>
            {sprites.other.dream_world.front_female && (
              <Box>
                <PokemonCard
                  pokemonData={pokemonData}
                  cardConfig={{
                    cardImage: sprites.other.dream_world.front_female,
                    cardAltImage: `${name} Female`,
                    cardColor: color,
                  }}
                />
              </Box>
            )}

            {sprites.front_shiny && (
              <Box>
                <PokemonCard
                  pokemonData={pokemonData}
                  cardConfig={{
                    cardImage: sprites.front_shiny,
                    cardAltImage: `${name} Front Shiny`,
                    cardColor: color,
                  }}
                />
              </Box>
            )}

            {sprites.back_shiny && (
              <Box>
                <PokemonCard
                  pokemonData={pokemonData}
                  cardConfig={{
                    cardImage: sprites.back_shiny,
                    cardAltImage: `${name} Back Shiny`,
                    cardColor: color,
                  }}
                />
              </Box>
            )}
          </SimpleGrid>
        </GridItem>
        <GridItem pl="2" area={'main'}>
          Main
        </GridItem>
        <GridItem pl="2" area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </>
  )
}

export default PokemonWikiPage
