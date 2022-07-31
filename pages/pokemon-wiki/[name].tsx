import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
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
}

type PokemonWikiQuery = {
  name: string
}

const getPokemon = async (pokemonName: string): Promise<PokemonWiki> => {
  return fetch(`${process.env['NEXT_PUBLIC_POKE_API_URL']}/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => ({
      name: data.name,
      abilities: data.abilities,
      location_area_encounters: data.location_area_encounters,
      sprites: data.sprites,
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
    },
  }
}

const PokemonWiki: NextPage<PokemonWiki> = ({ name, sprites }) => {
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
            name={name}
            src={sprites.other.dream_world.front_default}
          />

          <SimpleGrid columns={2} spacing={10}>
            {sprites.other.dream_world.front_female && (
              <Box>
                <PokemonCard
                  name={`${name} Female`}
                  src={sprites.other.dream_world.front_female}
                />
              </Box>
            )}

            {sprites.front_shiny && (
              <Box>
                <PokemonCard
                  name={`${name} Front Shiny`}
                  src={sprites.front_shiny}
                />
              </Box>
            )}

            {sprites.back_shiny && (
              <Box>
                <PokemonCard
                  name={`${name} Back Shiny`}
                  src={sprites.back_shiny}
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
