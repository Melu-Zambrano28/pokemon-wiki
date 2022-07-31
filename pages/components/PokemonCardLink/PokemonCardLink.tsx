import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'
import { Pokemon, PokemonCard } from '../PokemonCard/PokemonCard'

type PokemonCardLinkComponent = Pokemon & LinkProps

const PokemonCardLink: React.FunctionComponent<PokemonCardLinkComponent> = ({
  pokemonName,
  pokemonSrc,
  href,
}) => {
  return (
    <LinkBox>
      <PokemonCard pokemonName={pokemonName} pokemonSrc={pokemonSrc} />
      <Link href={href}>
        <LinkOverlay />
      </Link>
    </LinkBox>
  )
}

export { PokemonCardLink }
