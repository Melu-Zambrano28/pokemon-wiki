import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getBGColorByPokemonType } from '../../utils/fnUtils'
import { PokemonCard } from '../components/PokemonCard/PokemonCard'
import { PokemonWiki, PokemonWikiQuery } from '../../utils/Types'

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
    props: pokemon,
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
          {`Pokemon Wiki`}
        </GridItem>
        <GridItem pl="2" area={'nav'}>
          <PokemonCard
            pokemonData={pokemonData}
            cardConfig={{
              cardImage: sprites.front_default,
              cardAltImage: name,
              cardColor: color,
            }}
          />

          <SimpleGrid columns={2} spacing={10}>
            {sprites.front_female && (
              <Box>
                <PokemonCard
                  pokemonData={pokemonData}
                  cardConfig={{
                    cardImage: sprites.front_female,
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
