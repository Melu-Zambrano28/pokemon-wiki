import { CardProp } from '../../utils/Types'
import { CardBody } from '../CardBody/CardBody'
import { CardLink } from '../CardLink/CardLink'

export type CardLinkItemsProps = {
  pokemons: CardProp[]
}

const CardLinkItems: React.FunctionComponent<CardLinkItemsProps> = ({
  pokemons,
}) => {
  return (
    <>
      {pokemons.map((pokemon, pokeIndex) => {
        return (
          <CardLink
            key={`pokemonContainerGridITem${pokeIndex}`}
            href={{
              pathname: '/pokemon-wiki/[name]',
              query: { name: pokemon.pokemonData.pokemonName },
            }}
            pokemonData={pokemon.pokemonData}
            cardConfig={pokemon.cardConfig}
          >
            <CardBody pokemonData={pokemon.pokemonData} />
          </CardLink>
        )
      })}
    </>
  )
}

export { CardLinkItems }
