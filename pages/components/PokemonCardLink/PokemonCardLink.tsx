import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'
import { PokemonCard, PokemonCardProp } from '../PokemonCard/PokemonCard'

type PokemonCardLinkComponent = PokemonCardProp & LinkProps

const PokemonCardLink: React.FunctionComponent<PokemonCardLinkComponent> = ({
  pokemonData,
  cardConfig,
  href,
}) => {
  return (
    <LinkBox>
      <PokemonCard pokemonData={pokemonData} cardConfig={cardConfig} />
      <Link href={href}>
        <LinkOverlay />
      </Link>
    </LinkBox>
  )
}

export { PokemonCardLink }
