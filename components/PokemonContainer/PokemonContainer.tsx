import { Grid, GridItem } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { PokemonCardProp } from '../../utils/Types'
import { PokemonCardBody } from '../PokemonCardBody/PokemonCardBody'
import { PokemonCardLink } from '../PokemonCardLink/PokemonCardLink'

type PokemonContainer = {
  pokemons: PokemonCardProp[]
}

const PokemonContainer: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Grid templateColumns="repeat(3, 25rem)" justifyContent="center" gap={5}>
      {children}
    </Grid>
  )
}

const PokemonItems: React.FunctionComponent<PokemonContainer> = ({
  pokemons,
}) => {
  return (
    <>
      {pokemons.map((pokemon, pokeIndex) => {
        return (
          <div key={`pokemonContainerGridITem${pokeIndex}`}>
            <PokemonCardLink
              href={{
                pathname: '/pokemon-wiki/[name]',
                query: { name: pokemon.pokemonData.pokemonName },
              }}
              pokemonData={pokemon.pokemonData}
              cardConfig={pokemon.cardConfig}
            >
              <PokemonCardBody pokemonData={pokemon.pokemonData} />
            </PokemonCardLink>
          </div>
        )
      })}
    </>
  )
}

export { PokemonContainer, PokemonItems }
