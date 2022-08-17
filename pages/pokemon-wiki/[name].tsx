import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getBGColorByPokemonType } from '../../utils/fnUtils'
import { PokemonCard } from '../components/PokemonCard/PokemonCard'

type PokemonWiki = {
  name: string
  location_area_encounters: string
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: {
      dream_world: {
        front_default: string
        front_female: string
      }
    }
  }
  types: PokemonType[]
}

type PokemonWikiQuery = {
  name: string
}

export type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

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

const PokemonWiki: NextPage<PokemonWiki> = ({ name, sprites, types }) => {
  const color = getBGColorByPokemonType(types)
  console.log(`PokemonWiki `, color)

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
            pokemonName={name}
            pokemonImage={sprites.other.dream_world.front_default}
            cardColor={color}
          />

          <SimpleGrid columns={2} spacing={10}>
            {sprites.other.dream_world.front_female && (
              <Box>
                <PokemonCard
                  pokemonName={`Female`}
                  pokemonImage={sprites.other.dream_world.front_female}
                />
              </Box>
            )}

            {sprites.front_shiny && (
              <Box>
                <PokemonCard
                  pokemonName={`Front Shiny`}
                  pokemonImage={sprites.front_shiny}
                  cardColor={color}
                />
              </Box>
            )}

            {sprites.back_shiny && (
              <Box>
                <PokemonCard
                  pokemonName={`Back Shiny`}
                  pokemonImage={sprites.back_shiny}
                  cardColor={color}
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

export default PokemonWiki
