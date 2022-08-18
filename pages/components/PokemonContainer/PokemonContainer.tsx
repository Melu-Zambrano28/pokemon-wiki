import { Box, Grid, GridItem } from '@chakra-ui/react'
import { PokemonCardProp } from '../../../utils/Types'
import { PokemonCardLink } from '../PokemonCardLink/PokemonCardLink'

type PokemonContainer = {
  pokemons: PokemonCardProp[]
}

const PokemonContainer: React.FunctionComponent<PokemonContainer> = ({
  pokemons,
}) => {
  return (
    <Box>
      <Grid templateColumns="repeat(3, 25rem)" justifyContent="center" gap={5}>
        {pokemons.map((pokemon, pokeIndex) => {
          return (
            <GridItem key={pokeIndex}>
              <PokemonCardLink
                href={{
                  pathname: '/pokemon-wiki/[name]',
                  query: { name: pokemon.pokemonData.pokemonName },
                }}
                pokemonData={pokemon.pokemonData}
                cardConfig={pokemon.cardConfig}
              />
            </GridItem>
          )
        })}
      </Grid>
    </Box>
  )
}

export { PokemonContainer }
