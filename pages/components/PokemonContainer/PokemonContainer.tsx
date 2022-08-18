import { Badge, Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import { getTypesColorbyPokemonType } from '../../../utils/fnUtils'

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
              >
                <Box>
                  <Heading size="xs">{pokemon.pokemonData.pokemonId}</Heading>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                  >
                    <Box>{pokemon.pokemonData.pokemonName}</Box>
                    <Box>
                      <Flex gap={1}>
                        {pokemon.pokemonData.pokemonType?.map((pokemonType) => {
                          const colorBadge = getTypesColorbyPokemonType(
                            pokemonType.type.name,
                          )
                          return (
                            <Badge bg={colorBadge} color="white">
                              {pokemonType.type.name}
                            </Badge>
                          )
                        })}
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </PokemonCardLink>
            </GridItem>
          )
        })}
      </Grid>
    </Box>
  )
}

export { PokemonContainer }
