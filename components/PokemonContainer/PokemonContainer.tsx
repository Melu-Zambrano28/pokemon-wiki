import { PropsWithChildren } from 'react'
import { PokemonCardProp } from '../../utils/Types'
import { PokemonCardBody } from '../PokemonCardBody/PokemonCardBody'
import { PokemonCardLink } from '../PokemonCardLink/PokemonCardLink'
import style from '../PokemonContainer/PokemonContainer.module.scss'

type PokemonContainer = {
  pokemons: PokemonCardProp[]
}

const PokemonContainer: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <div className={style['containerGrid']}>{children}</div>
}

const PokemonItems: React.FunctionComponent<PokemonContainer> = ({
  pokemons,
}) => {
  return (
    <>
      {pokemons.map((pokemon, pokeIndex) => {
        return (
          <PokemonCardLink
            key={`pokemonContainerGridITem${pokeIndex}`}
            href={{
              pathname: '/pokemon-wiki/[name]',
              query: { name: pokemon.pokemonData.pokemonName },
            }}
            pokemonData={pokemon.pokemonData}
            cardConfig={pokemon.cardConfig}
          >
            <PokemonCardBody pokemonData={pokemon.pokemonData} />
          </PokemonCardLink>
        )
      })}
    </>
  )
}

export { PokemonContainer, PokemonItems }
