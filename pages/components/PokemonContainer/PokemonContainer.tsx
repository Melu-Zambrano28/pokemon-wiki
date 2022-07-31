import { Box, Grid, GridItem } from '@chakra-ui/react'
import { Pokemon } from '../PokemonCard/PokemonCard'
import { PokemonCardLink } from '../PokemonCardLink/PokemonCardLink'

type PokemonContainer = {
  pokemons: Pokemon[]
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
                pokemonName={pokemon.pokemonName}
                pokemonSrc={pokemon.pokemonSrc}
                href={{
                  pathname: '/pokemon-wiki/[name]',
                  query: { name: pokemon.pokemonName },
                }}
              />
            </GridItem>
          )
        })}
      </Grid>
    </Box>
  )
}

export { PokemonContainer }
